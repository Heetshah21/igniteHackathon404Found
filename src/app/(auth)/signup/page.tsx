'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import {
  GraduationCap,
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

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
    if (!isAuthLoading && isAuthenticated) {
      if (!profile || !profile.onboarding_completed) {
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

    // Form validations
    if (!name.trim()) {
      setLocalError('Full Name is required.');
      return;
    }

    if (password.length < 8) {
      setLocalError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

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
      setLocalError(
        res.error || 'Failed to create account. Please try again.'
      );
    }
  };

  const displayErr = localError || authError;

  return (
    <div className="min-h-screen bg-[#F7F9FE] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-[#101D35]">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>

          <span className="font-black text-2xl tracking-tight text-[#0F1B3D]">
            Career<span className="text-[#2563EB]">Mitra</span>
          </span>
        </Link>

        <h2 className="text-2xl font-black tracking-tight text-[#101D35]">
          Join CareerMitra
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Create your free student profile to unlock customized career
          navigation
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 rounded-2xl sm:px-10 border border-slate-200 shadow-[var(--shadow-card)]">
          {requiresVerification ? (
            /* Email Verification */
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-[#101D35]">
                Verify Your Email
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                We have sent a verification link to{' '}
                <strong className="text-emerald-600">{email}</strong>.
                Please check your inbox and click the link to verify your
                account.
              </p>

              <div className="pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-blue-700 transition shadow-sm"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* Signup Form */
            <form className="space-y-4" onSubmit={handleSignup}>
              {/* Error */}
              {displayErr && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{displayErr}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#101D35] mb-1">
                  Full Name
                </label>

                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#101D35] mb-1">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#101D35] mb-1">
                  Password
                </label>

                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-[#101D35] mb-1">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />

                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {isLoading
                    ? 'Creating Account...'
                    : 'Continue to Onboarding'}
                </span>

                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#2563EB] font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}