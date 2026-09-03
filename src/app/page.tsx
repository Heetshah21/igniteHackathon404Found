'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import {
  Compass,
  GraduationCap,
  BookOpen,
  GitCompare,
  FileText,
  Trophy,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const featureCards = [
    {
      title: 'Career Roadmaps',
      desc: 'Multiple proven pathways from 10th/12th/Diploma to your dream role.',
      icon: Compass,
      color: 'from-emerald-500 to-teal-700',
      href: '/roadmap',
    },
    {
      title: 'Scholarship Finder',
      desc: 'Rule-based matching engine with transparent qualification reasons.',
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-700',
      href: '/scholarships',
    },
    {
      title: 'Free Resource Hub',
      desc: '100% free courses & playlists in English, Hindi, and Marathi.',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-700',
      href: '/resources',
    },
    {
      title: 'Stream Comparison',
      desc: 'Head-to-head metrics & fit quiz: AI/ML vs Data Science, B.Tech vs BCA.',
      icon: GitCompare,
      color: 'from-purple-500 to-pink-700',
      href: '/compare',
    },
    {
      title: 'ATS Resume Builder',
      desc: 'Single-page, ATS-compliant resume generator ready to print.',
      icon: FileText,
      color: 'from-teal-500 to-emerald-700',
      href: '/resume',
    },
    {
      title: 'AI Career Assistant',
      desc: 'Context-aware guidance for Indian education systems & DSE entry.',
      icon: Bot,
      color: 'from-pink-500 to-rose-700',
      href: '/chat',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-white overflow-hidden">
      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-black text-2xl tracking-tight">
            CAREER<span className="text-amber-400">Mitra</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        {/* Glow Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Built for Rural & Underserved Students in Bharat</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
          Turn{' '}
          <span className="text-slate-400 line-through decoration-rose-500/80">
            &quot;I don&apos;t know what to do next&quot;
          </span>{' '}
          into{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
            &quot;I know my exact path to success.&quot;
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          CAREERMitra is a personalized career navigation system providing Indian students with clear roadmaps, verified scholarships, free multilingual courses, ATS resumes, and AI guidance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 transition flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-950" />
            <span>Sign In to Student Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>Create New Student Profile</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-16 text-left">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Link
                key={idx}
                href={feat.href}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 pt-2 group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Rural Student Impact Checklist */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-left space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <span>Why CAREERMitra is Different</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-pathway roadmaps (including 10th → Diploma → DSE lateral entry)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free curated resources in English, Hindi, and Marathi</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Deterministic scholarship eligibility check (Income, State, Marks)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant ATS resume builder optimized for internships & entry jobs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <p>CAREERMitra — Hackathon MVP • Empowering Bharat’s Students</p>
      </footer>
    </div>
  );
}
