'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  LogIn,
  UserPlus,
} from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');

  const isError = Boolean(errorParam);

  const getErrorMessage = () => {
    switch (errorParam) {
      case 'missing_token':
        return 'No confirmation token was found in the link. Please use the exact link sent to your email.';
      case 'server_error':
        return 'A server error occurred while verifying your email. Please try again shortly or sign in.';
      case 'verification_failed':
      default:
        return 'This confirmation link is invalid, expired, or has already been used. Please try signing in or create a new account.';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FE] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-[#101D35]">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tight text-[#0F1B3D]">
            Career<span className="text-[#2563EB]">Mitra</span>
          </span>
        </Link>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Personalized Career Navigation for Bharat’s Students
        </p>
      </div>

      {/* Confirmation Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 rounded-2xl sm:px-10 border border-slate-200 shadow-[var(--shadow-card)] text-center">
          {!isError ? (
            /* SUCCESS STATE */
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-sm animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-black text-[#101D35] tracking-tight">
                  Email Verified!
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your email address has been successfully confirmed. Your CareerMitra account is now active and ready.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/onboarding"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm group cursor-pointer"
                >
                  <span>Continue to CareerMitra</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Next step: Complete your 2-minute student profile to unlock customized career roadmaps & scholarships.
                </p>
              </div>
            </div>
          ) : (
            /* ERROR / EXPIRED STATE */
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200 shadow-sm">
                <AlertCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-black text-[#101D35] tracking-tight">
                  Email Verification Failed
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {getErrorMessage()}
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Account</span>
                </Link>

                <Link
                  href="/signup"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-slate-500" />
                  <span>Create a New Account</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EmailConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F9FE] flex items-center justify-center text-slate-500 text-sm font-medium">
          Loading verification details...
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
