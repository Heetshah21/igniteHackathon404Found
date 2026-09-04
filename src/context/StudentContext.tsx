'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

  // Request & active user guards to completely prevent race conditions
  const activeUserIdRef = useRef<string | null>(null);
  const loadProfileSeqRef = useRef<number>(0);

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

  /**
   * Loads the profile strictly for the given user ID.
   * Discards stale responses if the active user changed while the request was in flight.
   */
  const loadProfileForUser = async (userId: string, email?: string, name?: string): Promise<StudentProfile | null> => {
    if (!userId) {
      activeUserIdRef.current = null;
      setProfile(null);
      setIsLoading(false);
      return null;
    }

    const currentSeq = ++loadProfileSeqRef.current;
    activeUserIdRef.current = userId;

    // Immediately clear profile if it belongs to a previous user to prevent stale data visibility
    setProfile((prev) => (prev && prev.user_id === userId ? prev : null));
    setIsLoading(true);

    let loaded: StudentProfile | null = null;
    try {
      const dbProfile = await getStudentProfileByUserId(userId);

      // Race condition guard: discard if active user changed or a newer load request began
      if (activeUserIdRef.current !== userId || loadProfileSeqRef.current !== currentSeq) {
        return null;
      }

      if (dbProfile) {
        setProfile(dbProfile);
        loaded = dbProfile;
      } else {
        // Safe in-memory fallback strictly for the authenticated user without premature DB writes
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
      if (activeUserIdRef.current === userId && loadProfileSeqRef.current === currentSeq) {
        setProfile(null);
      }
    } finally {
      if (activeUserIdRef.current === userId && loadProfileSeqRef.current === currentSeq) {
        setIsLoading(false);
      }
    }
    return loaded;
  };

  // Initialize Supabase Auth Session
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    // Fetch initial session and validate with getUser()
    supabase.auth.getUser().then(({ data: { user: initUser } }) => {
      if (initUser) {
        supabase.auth.getSession().then(({ data: { session: initSession } }) => {
          setSession(initSession);
          setUser(initUser);
          setIsAuthenticated(true);
          loadProfileForUser(initUser.id, initUser.email, initUser.user_metadata?.full_name);
        });
      } else {
        activeUserIdRef.current = null;
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
        setProfile(null);
        setIsLoading(false);
      }
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      const currentUser = currentSession?.user ?? null;
      setSession(currentSession);
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);

      if (event === 'SIGNED_OUT' || !currentUser) {
        activeUserIdRef.current = null;
        loadProfileSeqRef.current++;
        setProfile(null);
        setUser(null);
        setSession(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (activeUserIdRef.current !== currentUser.id) {
          // Immediately clear old profile when switching users
          setProfile(null);
        }
        await loadProfileForUser(currentUser.id, currentUser.email, currentUser.user_metadata?.full_name);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateProfile = async (data: Partial<StudentProfile>) => {
    if (!user) {
      console.warn('Cannot update profile: No authenticated user.');
      return;
    }

    if (isSupabaseConfigured()) {
      const updated = await updateStudentProfile(user.id, data);
      if (updated) {
        setProfile(updated);
        return;
      }
    }

    // In-memory update strictly scoped to current user
    setProfile((prev) => {
      if (!prev || prev.user_id !== user.id) return null;
      return { ...prev, ...data, user_id: user.id, updated_at: new Date().toISOString() };
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

      // Immediately clear stale profile before establishing new user state
      setProfile(null);
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
      const origin = typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || 'https://ignite-hackathon404-found.vercel.app';

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
          },
          emailRedirectTo: `${origin}/auth/confirm`,
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

      // Immediately clear stale profile before establishing new user state
      setProfile(null);
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
    // Reset guards and state immediately to prevent stale profile exposure
    activeUserIdRef.current = null;
    loadProfileSeqRef.current++;
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
    setProfile(null);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Logout error:', e);
      }
    }
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
