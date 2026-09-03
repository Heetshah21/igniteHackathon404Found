'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '@/types';

// Default demo profile representing the hackathon target persona
export const DEFAULT_DEMO_PROFILE: StudentProfile = {
  id: 'demo-student-1',
  email: 'rahul.sharma@example.com',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  location: 'Nashik',
  state: 'Maharashtra',
  gender: 'male',
  education_level: '12th',
  school_college: 'Shivaji Vidya Mandir Higher Secondary School',
  branch: 'science',
  percentage: 82,
  family_income: '1-2.5-lakh',
  category: 'OBC',
  rural_urban: 'rural',
  interests: ['Technology', 'Programming', 'Artificial Intelligence', 'Mathematics'],
  skills: ['Python basics', 'C++ fundamentals', 'Logical Reasoning'],
  career_goal: 'Software Engineer',
  career_goal_id: 'software-engineer',
  onboarding_completed: true,
  created_at: new Date().toISOString(),
};

interface StudentContextType {
  profile: StudentProfile | null;
  isLoading: boolean;
  updateProfile: (data: Partial<StudentProfile>) => void;
  resetToDemo: () => void;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  language: 'English' | 'Hindi' | 'Marathi';
  setLanguage: (lang: 'English' | 'Hindi' | 'Marathi') => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = 'careermitra_student_profile';
const LANG_STORAGE_KEY = 'careermitra_language';
const AUTH_KEY = 'careermitra_is_auth';

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setLanguageState] = useState<'English' | 'Hindi' | 'Marathi'>('English');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const authStored = localStorage.getItem(AUTH_KEY);
      const langStored = localStorage.getItem(LANG_STORAGE_KEY);

      if (langStored === 'Hindi' || langStored === 'Marathi' || langStored === 'English') {
        setLanguageState(langStored);
      }

      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        // First-time visit: set default demo profile
        setProfile(DEFAULT_DEMO_PROFILE);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_PROFILE));
      }

      if (authStored !== null) {
        setIsAuthenticated(authStored === 'true');
      } else {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to load profile from local storage', e);
      setProfile(DEFAULT_DEMO_PROFILE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = (data: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const updated = prev ? { ...prev, ...data, updated_at: new Date().toISOString() } : ({ ...DEFAULT_DEMO_PROFILE, ...data } as StudentProfile);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save profile', e);
      }
      return updated;
    });
  };

  const resetToDemo = () => {
    setProfile(DEFAULT_DEMO_PROFILE);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_PROFILE));
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error('Failed to reset demo profile', e);
    }
  };

  const login = (email: string, name?: string) => {
    setIsAuthenticated(true);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {}

    updateProfile({
      email,
      name: name || email.split('@')[0] || 'Student',
      onboarding_completed: true,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem(AUTH_KEY, 'false');
    } catch (e) {}
  };

  const setLanguage = (lang: 'English' | 'Hindi' | 'Marathi') => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {}
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        isLoading,
        updateProfile,
        resetToDemo,
        isAuthenticated,
        login,
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
