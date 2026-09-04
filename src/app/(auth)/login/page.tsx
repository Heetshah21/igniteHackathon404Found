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
  Sparkles,
  Compass,
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
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb w-80 h-80 top-0 left-1/4" style={{ background: '#A3E635', opacity: 0.08 }} />
        <div className="glow-orb w-72 h-72 bottom-0 right-1/4" style={{ background: '#60A5FA', opacity: 0.08, animationDelay: '5s' }} />
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{
              background: 'var(--lime-green)',
              boxShadow: '0 0 20px rgba(163,230,53,0.45)',
            }}
          >
            <Compass className="w-5 h-5 text-[#0A1F00]" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            Career<span style={{ color: 'var(--lime-green)' }}>Mitra</span>
          </span>
        </Link>

        <h2 className="text-2xl font-black tracking-tight text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-white/55">
          Personalized Career Navigation for Bharat's Students
        </p>
      </div>

      <div className="mt-8 relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Glass card */}
        <div
          className="py-8 px-6 rounded-2xl sm:px-10"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.22)',
          }}
        >
          {/* Divider label */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }} />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-3 text-white/40 font-semibold"
                style={{ background: 'transparent' }}>
                Sign in with email
              </span>
            </div>
          </div>

          {displayErr && (
            <div className="mb-4 p-3 rounded-xl flex items-center gap-2 text-xs"
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.30)',
                color: '#FCA5A5',
              }}>
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{displayErr}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1">
                Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-white placeholder-white/30 text-sm transition focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    caretColor: 'var(--lime-green)',
                  }}
                  onFocus={e => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(163,230,53,0.50)';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(163,230,53,0.12)';
                  }}
                  onBlur={e => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.14)';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-white/80">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium hover:opacity-80 transition"
                  style={{ color: 'var(--lime-green)' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-white placeholder-white/30 text-sm transition focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    caretColor: 'var(--lime-green)',
                  }}
                  onFocus={e => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(163,230,53,0.50)';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(163,230,53,0.12)';
                  }}
                  onBlur={e => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.14)';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer btn-lime"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-white/45">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold hover:opacity-80 transition"
              style={{ color: 'var(--lime-green)' }}>
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-white/50 text-sm">
        Loading...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
