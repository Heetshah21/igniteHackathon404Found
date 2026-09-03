'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import {
  GraduationCap,
  Lock,
  Mail,
  AlertCircle,
} from 'lucide-react';
import { getSafeRedirectUrl } from '@/lib/auth/safe-redirect';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');
  const errorParam = searchParams.get('error');

  const { signIn, authError, setAuthError, isAuthenticated, profile, isLoading: isAuthLoading } = useStudent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(
    errorParam === 'auth_callback_failed' ? 'Authentication callback failed. Please try signing in again.' : null
  );

  React.useEffect(() => {
    if (!isAuthLoading && isAuthenticated && profile) {
      if (!profile.onboarding_completed) {
        router.push('/onboarding');
      } else {
        const destination = getSafeRedirectUrl(nextParam);
        router.push(destination === '/onboarding' ? '/dashboard' : destination);
      }
    }
  }, [isAuthLoading, isAuthenticated, profile, nextParam, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);
    setAuthError(null);

    const res = await signIn(email, password);
    setIsLoading(false);

    if (res.success) {
      if (!res.onboardingCompleted) {
        router.push('/onboarding');
      } else {
        const destination = getSafeRedirectUrl(nextParam);
        router.push(destination === '/onboarding' ? '/dashboard' : destination);
      }
    } else {
      setLocalError(res.error || 'Email or password is incorrect.');
    }
  };

  const displayErr = localError || authError;

  return (
    <div className="min-h-screen bg-[#F7F9FE] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-[#101D35]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tight text-[#0F1B3D]">
            Career<span className="text-[#2563EB]">Mitra</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-[#101D35]">
          Welcome Back
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Personalized Career Navigation for Bharat’s Students
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 rounded-2xl sm:px-10 border border-slate-200 shadow-[var(--shadow-card)]">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E6EBF5]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold">Or sign in with email</span>
            </div>
          </div>

          {displayErr && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{displayErr}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-[#101D35] mb-1">
                Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#101D35]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#2563EB] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-[#101D35] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#1769FF] text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-[#2563EB] font-bold hover:underline">
              Create student profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)] flex items-center justify-center text-slate-500 text-sm">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
