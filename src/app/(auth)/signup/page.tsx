'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import { GraduationCap, ArrowRight, Lock, Mail, User } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useStudent();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email || 'new.student@careermitra.org', name || 'New Student');
      router.push('/onboarding');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FE] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-[#101D35]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-11 h-11 rounded-2xl bg-[#1769FF] flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tight text-[#101D35]">
            Career<span className="text-[#1769FF]">Mitra</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-[#101D35]">
          Join CareerMitra
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Create your free student profile to unlock customized career navigation
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xs rounded-3xl sm:px-10 border border-[#E6EBF5]">
          <form className="space-y-4" onSubmit={handleSignup}>
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
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-[#101D35] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#1769FF] text-sm transition"
                />
              </div>
            </div>

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
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-[#101D35] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#1769FF] text-sm transition"
                />
              </div>
            </div>

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
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-[#101D35] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#1769FF] text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition shadow-sm cursor-pointer mt-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Continue to Onboarding'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1769FF] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
