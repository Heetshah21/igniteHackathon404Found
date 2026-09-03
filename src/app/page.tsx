'use client';

import React from 'react';
import Link from 'next/link';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { HeroRoadmapVisual } from '@/components/home/HeroRoadmapVisual';
import {
  Compass,
  GraduationCap,
  BookOpen,
  GitCompare,
  FileText,
  Bot,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smile,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const featureCards = [
    {
      title: 'Career Roadmaps',
      desc: 'Multiple proven pathways from 10th/12th/Diploma to your dream career role.',
      icon: Compass,
      accentBg: 'bg-emerald-500',
      href: '/roadmap',
    },
    {
      title: 'Scholarship Finder',
      desc: 'Rule-based matching engine with transparent qualification reasons.',
      icon: GraduationCap,
      accentBg: 'bg-amber-500',
      href: '/scholarships',
    },
    {
      title: 'Free Resource Hub',
      desc: '100% free courses & playlists in English, Hindi, and Marathi.',
      icon: BookOpen,
      accentBg: 'bg-[#1769FF]',
      href: '/resources',
    },
    {
      title: 'Stream Comparison',
      desc: 'Head-to-head metrics & fit quiz: AI/ML vs Data Science, B.Tech vs BCA.',
      icon: GitCompare,
      accentBg: 'bg-purple-600',
      href: '/compare',
    },
    {
      title: 'ATS Resume Builder',
      desc: 'Single-page, ATS-compliant resume generator ready to print.',
      icon: FileText,
      accentBg: 'bg-teal-500',
      href: '/resume',
    },
    {
      title: 'AI Career Assistant',
      desc: 'Context-aware guidance for Indian education systems & DSE entry.',
      icon: Bot,
      accentBg: 'bg-pink-500',
      href: '/chat',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-12 sm:space-y-16 pb-12">

        {/* ============================================================ */}
        {/* HERO SECTION                                                 */}
        {/* ============================================================ */}

        <section className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-5 text-left">

              {/* Bharat Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#CCE0FF] text-[#1769FF] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#1769FF]" />
                <span>Built for Rural & Underserved Students in Bharat</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-[#101D35]">
                Your Career.
                <br />
                Your Roadmap.
                <br />
                <span className="text-[#1769FF]">Your Future.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                CareerMitra helps students discover the right career path, compare streams,
                find scholarships, build resumes, and get AI-powered career guidance — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1769FF] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition group"
                >
                  <span>Explore Careers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50/50 text-[#1769FF] font-bold text-sm border border-[#1769FF] shadow-xs transition"
                >
                  <span>Talk to AI Mentor</span>
                  <Sparkles className="w-4 h-4 text-[#1769FF]" />
                </Link>
              </div>

              {/* Trust Statistics Row */}
              <div className="border-t border-[#E6EBF5] pt-6 mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769FF] flex items-center justify-center">
                      <Smile className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-[#101D35] leading-none">
                        10K+
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Students Guided
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769FF] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-[#101D35] leading-none">
                        100+
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Career Paths
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769FF] flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-[#101D35] leading-none">
                        100%
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Free Resources
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769FF] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#101D35] leading-none">
                        Trusted by
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Students
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Auth CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 transition flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>Sign In to Student Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#EAF2FF] hover:bg-blue-100 text-[#1769FF] font-bold text-sm border border-blue-100 transition flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Create New Student Profile</span>
                </Link>
              </div>

            </div>

            {/* Right Hero Column */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <HeroRoadmapVisual />
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* FEATURE SECTION                                              */}
        {/* ============================================================ */}

        <section className="space-y-8 pt-4">

          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#101D35] tracking-tight">
              Everything You Need to Plan Your Career
            </h2>

            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Powerful tools and resources to help you explore, plan and achieve your career goals.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;

              return (
                <Link
                  key={idx}
                  href={feat.href}
                  className="p-6 rounded-2xl bg-white border border-[#E6EBF5] hover:border-blue-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${feat.accentBg} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-[#101D35] group-hover:text-[#1769FF] transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1769FF] pt-2 group-hover:gap-2 transition-all">
                    <span>Explore Feature</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>

        </section>

      </div>
    </AppLayout>
  );
}