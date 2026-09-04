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
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const featureCards = [
    {
      title: 'Career Roadmaps',
      desc: 'Multiple proven pathways from 10th/12th/Diploma to your dream career role.',
      icon: Compass,
      accentColor: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.30)',
      href: '/roadmap',
    },
    {
      title: 'Scholarship Finder',
      desc: 'Rule-based matching engine with transparent qualification reasons.',
      icon: GraduationCap,
      accentColor: '#FCD34D',
      accentGlow: 'rgba(252, 211, 77, 0.30)',
      href: '/scholarships',
    },
    {
      title: 'Free Resource Hub',
      desc: '100% free courses & playlists in English, Hindi, and Marathi.',
      icon: BookOpen,
      accentColor: '#60A5FA',
      accentGlow: 'rgba(96, 165, 250, 0.30)',
      href: '/resources',
    },
    {
      title: 'Stream Comparison',
      desc: 'Head-to-head metrics & fit quiz: AI/ML vs Data Science, B.Tech vs BCA.',
      icon: GitCompare,
      accentColor: '#A78BFA',
      accentGlow: 'rgba(167, 139, 250, 0.30)',
      href: '/compare',
    },
    {
      title: 'ATS Resume Builder',
      desc: 'Single-page, ATS-compliant resume generator ready to print.',
      icon: FileText,
      accentColor: '#2DD4BF',
      accentGlow: 'rgba(45, 212, 191, 0.30)',
      href: '/resume',
    },
    {
      title: 'AI Career Assistant',
      desc: 'Context-aware guidance for Indian education systems & DSE entry.',
      icon: Bot,
      accentColor: '#F472B6',
      accentGlow: 'rgba(244, 114, 182, 0.30)',
      href: '/chat',
    },
  ];

  return (
    <AppLayout requireAuth={false}>
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="glow-orb w-96 h-96 top-0 left-1/4" style={{ background: '#A3E635', opacity: 0.08 }} />
        <div className="glow-orb w-80 h-80 bottom-1/4 right-1/4" style={{ background: '#60A5FA', opacity: 0.10, animationDelay: '4s' }} />
        <div className="glow-orb w-64 h-64 top-1/2 left-10" style={{ background: '#A78BFA', opacity: 0.07, animationDelay: '8s' }} />
      </div>

      <div className="relative z-10 space-y-12 sm:space-y-16 pb-12">

        {/* ============================================================ */}
        {/* HERO SECTION                                                 */}
        {/* ============================================================ */}
        <section className="pt-2 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-6 text-left">

              {/* Bharat Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-lime text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 sparkle-animate" style={{ color: 'var(--lime-green)' }} />
                <span style={{ color: 'var(--lime-green)' }}>Built for Rural & Underserved Students in Bharat</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1] text-white">
                Your Career.
                <br />
                Your Roadmap.
                <br />
                <span className="sparkle-animate inline-block" style={{ color: 'var(--lime-green)', textShadow: '0 0 40px rgba(163,230,53,0.40)' }}>
                  Your Future.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                CareerMitra helps students discover the right career path, compare streams,
                find scholarships, build resumes, and get AI-powered career guidance — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition group btn-lime"
                >
                  <span>Explore Careers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-bold text-sm text-white hover:bg-white/12 transition group"
                >
                  <span>Talk to AI Mentor</span>
                  <Sparkles className="w-4 h-4 sparkle-animate" style={{ color: 'var(--lime-green)' }} />
                </Link>
              </div>

              {/* Trust Statistics Row */}
              <div className="border-t border-white/10 pt-6 mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl glass-light flex items-center justify-center">
                      <Smile className="w-5 h-5" style={{ color: 'var(--lime-green)' }} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-white leading-none">10K+</div>
                      <div className="text-[11px] text-white/50 font-medium mt-0.5">Students Guided</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl glass-light flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" style={{ color: 'var(--lime-green)' }} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-white leading-none">100+</div>
                      <div className="text-[11px] text-white/50 font-medium mt-0.5">Career Paths</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl glass-light flex items-center justify-center">
                      <BookOpen className="w-5 h-5" style={{ color: 'var(--lime-green)' }} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-white leading-none">100%</div>
                      <div className="text-[11px] text-white/50 font-medium mt-0.5">Free Resources</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl glass-light flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" style={{ color: 'var(--lime-green)' }} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white leading-none">Trusted by</div>
                      <div className="text-[11px] text-white/50 font-medium mt-0.5">Students</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Auth CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-100 transition flex items-center justify-center gap-2 group btn-lime"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Sign In to Student Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl glass font-bold text-sm text-white hover:bg-white/12 transition flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" style={{ color: 'var(--lime-green)' }} />
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

          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-lime text-[11px] font-bold mb-1">
              <Zap className="w-3 h-3" style={{ color: 'var(--lime-green)' }} />
              <span style={{ color: 'var(--lime-green)' }}>Powerful Tools</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Everything You Need to Plan Your Career
            </h2>
            <p className="text-white/55 text-sm sm:text-base font-normal">
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
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    {/* Icon with glow */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      style={{
                        background: `${feat.accentColor}22`,
                        border: `1px solid ${feat.accentColor}44`,
                        boxShadow: `0 4px 16px ${feat.accentGlow}`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feat.accentColor }} />
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-[#A3E635] transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold pt-2 group-hover:gap-2.5 transition-all"
                    style={{ color: 'var(--lime-green)' }}>
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