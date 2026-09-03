'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { StudentProfile } from '@/types';
import { getStudentProfileByUserId, updateStudentProfile } from '@/lib/data/students';

interface StudentContextType {
  user: User | null;
  session: Session | null;
  profile: StudentProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authError: string | null;
  setAuthError: (err: string | null) => void;
  updateProfile: (data: Partial<StudentProfile>) => Promise<void>;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; onboardingCompleted?: boolean; error?: string }>;
  signUp: (email: string, password?: string, fullName?: string) => Promise<{ success: boolean; requiresVerification?: boolean; onboardingCompleted?: boolean; error?: string }>;
  logout: () => Promise<void>;
  language: 'English' | 'Hindi' | 'Marathi';
  setLanguage: (lang: 'English' | 'Hindi' | 'Marathi') => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'careermitra_language';

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [language, setLanguageState] = useState<'English' | 'Hindi' | 'Marathi'>('English');

  // Load language preference
  useEffect(() => {
    try {
      const langStored = localStorage.getItem(LANG_STORAGE_KEY);
      if (langStored === 'Hindi' || langStored === 'Marathi' || langStored === 'English') {
        setLanguageState(langStored);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = langStored === 'Hindi' ? 'hi' : langStored === 'Marathi' ? 'mr' : 'en';
        }
      }
    } catch {}
  }, []);

  // Update html lang when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'Hindi' ? 'hi' : language === 'Marathi' ? 'mr' : 'en';
    }
  }, [language]);

  // Initialize Supabase Auth Session
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      setSession(initSession);
      setUser(initSession?.user ?? null);
      setIsAuthenticated(!!initSession);

      if (initSession?.user) {
        loadProfileForUser(initSession.user.id, initSession.user.email, initSession.user.user_metadata?.full_name);
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (currentSession?.user) {
          await loadProfileForUser(currentSession.user.id, currentSession.user.email, currentSession.user.user_metadata?.full_name);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadingProfileUserIdRef = React.useRef<string | null>(null);

  const loadProfileForUser = async (userId: string, email?: string, name?: string): Promise<StudentProfile | null> => {
    if (loadingProfileUserIdRef.current === userId && profile) {
      return profile;
    }
    loadingProfileUserIdRef.current = userId;
    setIsLoading(true);
    let loaded: StudentProfile | null = null;
    try {
      const dbProfile = await getStudentProfileByUserId(userId);
      if (dbProfile) {
        setProfile(dbProfile);
        loaded = dbProfile;
      } else {
        // Set in-memory initial profile state without premature database writes
        loaded = {
          id: userId,
          user_id: userId,
          email: email || '',
          name: name || email?.split('@')[0] || 'Student',
          interests: [],
          skills: [],
          onboarding_completed: false,
        };
        setProfile(loaded);
      }
    } catch (e) {
      console.error('Failed loading profile for user from Supabase:', e);
    } finally {
      loadingProfileUserIdRef.current = null;
      setIsLoading(false);
    }
    return loaded;
  };

  const updateProfile = async (data: Partial<StudentProfile>) => {
    if (user && isSupabaseConfigured()) {
      const updated = await updateStudentProfile(user.id, data);
      if (updated) {
        setProfile(updated);
        return;
      }
    }

    setProfile((prev) => {
      if (!prev) return null;
      return { ...prev, ...data, updated_at: new Date().toISOString() };
    });
  };

  const signIn = async (email: string, password?: string): Promise<{ success: boolean; onboardingCompleted?: boolean; error?: string }> => {
    setAuthError(null);

    if (!isSupabaseConfigured() || !password) {
      return { success: false, error: 'Supabase credentials missing or password required.' };
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const errMsg = error.message.includes('Invalid login credentials')
          ? 'Email or password is incorrect.'
          : error.message.includes('Email not confirmed')
          ? 'Please verify your email address before logging in.'
          : error.message;
        setAuthError(errMsg);
        return { success: false, error: errMsg };
      }

      setSession(data.session);
      setUser(data.user);
      setIsAuthenticated(true);

      let onboardingCompleted = false;
      if (data.user) {
        const loaded = await loadProfileForUser(data.user.id, data.user.email, data.user.user_metadata?.full_name);
        onboardingCompleted = !!loaded?.onboarding_completed;
      }

      return { success: true, onboardingCompleted };
    } catch (err: any) {
      const errMsg = err?.message || 'Something went wrong. Please try again.';
      setAuthError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const signUp = async (
    email: string,
    password?: string,
    fullName?: string
  ): Promise<{ success: boolean; requiresVerification?: boolean; onboardingCompleted?: boolean; error?: string }> => {
    setAuthError(null);

    if (!isSupabaseConfigured() || !password) {
      return { success: false, error: 'Supabase credentials missing or password required.' };
    }

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
          },
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        const errMsg = error.message.includes('User already registered')
          ? 'An account with this email already exists.'
          : error.message;
        setAuthError(errMsg);
        return { success: false, error: errMsg };
      }

      if (data.user && !data.session) {
        // Email confirmation is enabled in Supabase
        return { success: true, requiresVerification: true, onboardingCompleted: false };
      }

      setSession(data.session);
      setUser(data.user);
      setIsAuthenticated(true);

      let onboardingCompleted = false;
      if (data.user) {
        const loaded = await loadProfileForUser(data.user.id, data.user.email, fullName);
        onboardingCompleted = !!loaded?.onboarding_completed;
      }

      return { success: true, requiresVerification: false, onboardingCompleted };
    } catch (err: any) {
      const errMsg = err?.message || 'Something went wrong. Please try again.';
      setAuthError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Logout error:', e);
      }
    }

    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
    setProfile(null);
  };

  const setLanguage = (lang: 'English' | 'Hindi' | 'Marathi') => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {}
  };

  return (
    <StudentContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isAuthenticated,
        authError,
        setAuthError,
        updateProfile,
        signIn,
        signUp,
        logout,
        language,
        setLanguage,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
