'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Compass,
  Zap,
} from 'lucide-react';

/* ── shared input style helper ─────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.14)',
  caretColor: 'var(--lime-green)',
};
const inputFocusIn = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(163,230,53,0.50)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(163,230,53,0.12)';
};
const inputFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
  e.currentTarget.style.boxShadow = 'none';
};

export default function SignupPage() {
  const router = useRouter();
  const { signUp, authError, setAuthError, isAuthenticated, profile, isLoading: isAuthLoading } = useStudent();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [requiresVerification, setRequiresVerification] = useState(false);

  React.useEffect(() => {
    if (!isAuthLoading && isAuthenticated && profile) {
      if (!profile.onboarding_completed) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthLoading, isAuthenticated, profile, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setAuthError(null);

    if (!name.trim()) { setLocalError('Full Name is required.'); return; }
    if (password.length < 8) { setLocalError('Password must contain at least 8 characters.'); return; }
    if (password !== confirmPassword) { setLocalError('Passwords do not match.'); return; }

    setIsLoading(true);
    const res = await signUp(email, password, name);
    setIsLoading(false);

    if (res.success) {
      if (res.requiresVerification) {
        setRequiresVerification(true);
      } else {
        router.push('/onboarding');
      }
    } else {
      setLocalError(res.error || 'Failed to create account. Please try again.');
    }
  };

  const displayErr = localError || authError;

  const glassCardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 16px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.22)',
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb w-80 h-80 top-0 right-1/4" style={{ background: '#A3E635', opacity: 0.08 }} />
        <div className="glow-orb w-72 h-72 bottom-0 left-1/4" style={{ background: '#A78BFA', opacity: 0.08, animationDelay: '5s' }} />
      </div>

      {/* Header */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{ background: 'var(--lime-green)', boxShadow: '0 0 20px rgba(163,230,53,0.45)' }}
          >
            <Compass className="w-5 h-5 text-[#0A1F00]" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            Career<span style={{ color: 'var(--lime-green)' }}>Mitra</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-white">Join CareerMitra</h2>
        <p className="text-sm text-white/55">
          Create your free student profile to unlock customized career navigation
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 relative sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-6 rounded-2xl sm:px-10" style={glassCardStyle}>
          {requiresVerification ? (
            /* ── Email Verification State ── */
            <div className="text-center space-y-4 py-4">
              <div
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center"
                style={{
                  background: 'rgba(163,230,53,0.18)',
                  border: '1px solid rgba(163,230,53,0.40)',
                  boxShadow: '0 0 20px rgba(163,230,53,0.20)',
                }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--lime-green)' }} />
              </div>
              <h3 className="text-xl font-bold text-white">Verify Your Email</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                We have sent a verification link to{' '}
                <strong style={{ color: 'var(--lime-green)' }}>{email}</strong>.
                Please check your inbox and click the link to verify your account.
              </p>
              <div className="pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm btn-lime"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* ── Signup Form ── */
            <form className="space-y-4" onSubmit={handleSignup}>
              {displayErr && (
                <div
                  className="p-3 rounded-xl flex items-center gap-2 text-xs"
                  style={{
                    background: 'rgba(239,68,68,0.12)',
                    border: '1px solid rgba(239,68,68,0.30)',
                    color: '#FCA5A5',
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{displayErr}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-white placeholder-white/30 text-sm transition focus:outline-none"
                    style={inputStyle}
                    onFocus={inputFocusIn}
                    onBlur={inputFocusOut}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-white placeholder-white/30 text-sm transition focus:outline-none"
                    style={inputStyle}
                    onFocus={inputFocusIn}
                    onBlur={inputFocusOut}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-white placeholder-white/30 text-sm transition focus:outline-none"
                    style={inputStyle}
                    onFocus={inputFocusIn}
                    onBlur={inputFocusOut}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-white placeholder-white/30 text-sm transition focus:outline-none"
                    style={inputStyle}
                    onFocus={inputFocusIn}
                    onBlur={inputFocusOut}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed btn-lime"
              >
                <Zap className="w-4 h-4" />
                <span>{isLoading ? 'Creating Account...' : 'Continue to Onboarding'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-white/45">
            Already have an account?{' '}
            <Link href="/login" className="font-bold hover:opacity-80 transition"
              style={{ color: 'var(--lime-green)' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}