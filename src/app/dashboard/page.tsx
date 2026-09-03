'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { careers } from '@/data/careers';
import { roadmaps } from '@/data/roadmaps';
import { resources } from '@/data/resources';
import { scholarships } from '@/data/scholarships';
import { opportunities } from '@/data/opportunities';
import { generateNextSteps } from '@/lib/recommendations/nextSteps';
import { matchResources, matchScholarships, matchOpportunities } from '@/lib/recommendations/matcher';
import { translations } from '@/lib/translations';
import { HeroRoadmapVisual } from '@/components/home/HeroRoadmapVisual';
import { AudioButton } from '@/components/common/AudioButton';
import {
  getProfileSummarySpeech,
  getNextStepsSpeech,
  getRoadmapSpeech,
} from '@/lib/speech/hindiContent';
import {
  Compass,
  GraduationCap,
  BookOpen,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  GitCompare,
  Bot,
  ExternalLink,
  ChevronRight,
  Target,
  Award,
  Clock,
  Building,
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, language } = useStudent();
  const t = translations[language];

  // Current student career info
  const currentCareer = useMemo(() => {
    return (
      careers.find((c) => c.id === profile?.career_goal_id) ||
      careers.find((c) => c.slug === 'software-engineer') ||
      careers[0]
    );
  }, [profile?.career_goal_id]);

  // Roadmaps for the student's career
  const careerRoadmaps = useMemo(() => {
    const list = roadmaps.filter((r) => r.career_id === currentCareer.id);
    return list.length > 0 ? list : [roadmaps[0]];
  }, [currentCareer.id]);

  const primaryRoadmap = careerRoadmaps[0];

  // Next steps generated dynamically
  const nextSteps = useMemo(() => {
    return generateNextSteps(profile || {});
  }, [profile]);

  // Personalized recommendations
  const recommendedResources = useMemo(() => {
    const matched = matchResources(resources, profile || {});
    return matched.slice(0, 4);
  }, [profile]);

  const matchedScholarships = useMemo(() => {
    const matched = matchScholarships(scholarships, profile || {});
    return matched.slice(0, 3);
  }, [profile]);

  const recommendedOpportunities = useMemo(() => {
    const matched = matchOpportunities(opportunities, profile || {});
    return matched.slice(0, 3);
  }, [profile]);

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
  // TTS Speech texts
  const profileSummarySpeech = useMemo(() => {
    return getProfileSummarySpeech(profile || {});
  }, [profile]);

  const nextStepsSpeech = useMemo(() => {
    return getNextStepsSpeech(nextSteps);
  }, [nextSteps]);

  const roadmapSpeech = useMemo(() => {
    return getRoadmapSpeech(
      currentCareer.title,
      primaryRoadmap.title,
      primaryRoadmap.steps
    );
  }, [currentCareer.title, primaryRoadmap]);

  return (
    <AppLayout>
      <div className="space-y-12 sm:space-y-16 pb-12">
        {/* ============================================================ */}
        {/* 1. HERO SECTION (TWO COLUMNS)                                */}
        {/* ============================================================ */}
        <section className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#CCE0FF] text-[#1769FF] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#1769FF]" />
                <span>Built for Rural & Underserved Students in Bharat</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-[#101D35]">
                Your Career.<br />
                Your Roadmap.<br />
                <span className="text-[#1769FF]">Your Future.</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                CareerMitra helps students discover the right career path, compare streams,
                find scholarships, build resumes, and get AI-powered career guidance — all in one place.
              </p>

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
                      <Target className="w-4 h-4" />
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
                      <GraduationCap className="w-4 h-4" />
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
                      <BookOpen className="w-4 h-4" />
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
                      <Award className="w-4 h-4" />
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
            </div>

            {/* Right Hero Column: Student Illustration & Floating Career Roadmap */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <HeroRoadmapVisual />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. FEATURE SECTION                                           */}
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

        {/* ============================================================ */}
        {/* 3. STUDENT PERSONAL COMMAND CENTER                           */}
        {/* ============================================================ */}
        {/* 3. STUDENT PERSONAL COMMAND CENTER                           */}
        {/* ============================================================ */}
        <div className="pt-4 border-t border-[#E6EBF5]">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6EBF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] text-[#1769FF] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalized Student Command Center</span>
                </div>
                <AudioButton
                  id="dashboard-profile-speech"
                  text={profileSummarySpeech}
                  label="Listen to Summary"
                  variant="badge"
                  size="xs"
                  className="bg-blue-50 hover:bg-blue-100 text-[#1769FF] border-blue-200"
                  ariaLabel="Listen to student profile overview"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#101D35] tracking-tight">
                {t.dashboard.welcome}, {profile?.name || 'Rahul'} 👋
              </h2>
              <div className="text-slate-500 text-xs sm:text-sm font-medium flex flex-wrap items-center gap-2">
                <span>📚 {profile?.education_level || '12th'} {profile?.branch ? `(${profile.branch.toUpperCase()})` : ''}</span>
                <span>•</span>
                <span>📍 {profile?.location || 'Nashik'}, {profile?.state || 'Maharashtra'}</span>
                <span>•</span>
                <span className="bg-[#DDF7EA] text-[#0B7A48] px-2 py-0.5 rounded-md font-bold">
                  🎯 Active Goal: {currentCareer.title}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/roadmap"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1769FF] text-white hover:bg-blue-600 font-bold text-xs shadow-sm transition"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Full Roadmap</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1769FF] hover:bg-blue-50 font-bold text-xs border border-[#1769FF] shadow-2xs transition"
              >
                <Bot className="w-4 h-4 text-pink-500" />
                <span>Ask AI Assistant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. YOUR NEXT STEPS (Next Best Action Engine)                 */}
        {/* ============================================================ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <h2 className="text-lg sm:text-xl font-black text-[#101D35] tracking-tight">
                  {t.dashboard.nextSteps}
                </h2>
              </div>
              <AudioButton
                id="dashboard-next-steps-speech"
                text={nextStepsSpeech}
                label="Listen to Steps"
                variant="secondary"
                size="xs"
                className="bg-blue-50 hover:bg-blue-100 text-[#1769FF] border-blue-200"
                ariaLabel="Listen to your next best action steps"
              />
            </div>
            <span className="text-xs font-semibold text-[#0B7A48] bg-[#DDF7EA] px-2.5 py-1 rounded-full border border-emerald-200">
              Personalized Plan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nextSteps.slice(0, 6).map((step, idx) => (
              <div
                key={step.id}
                className="bg-white rounded-2xl p-4 border border-[#E6EBF5] shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-blue-200"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {step.icon}
                    </span>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-[#1769FF]">
                      Step #{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#101D35] text-sm group-hover:text-[#1769FF] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {step.description}
                  </p>
                </div>

                {step.action_url && (
                  <Link
                    href={step.action_url}
                    className="mt-4 inline-flex items-center justify-between w-full text-xs font-bold text-[#1769FF] hover:text-blue-700 pt-3 border-t border-slate-100 group-hover:border-blue-50"
                  >
                    <span>{step.action_label || 'Take Action'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>


            {/* ============================================================ */}
            {/* 5. YOUR CAREER ROADMAP (Visual Pathway Preview)              */}
            {/* ============================================================ */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EBF5] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🧭</span>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                        {t.dashboard.roadmapPreview}: {currentCareer.title}
                      </h2>
                    </div>
                    <AudioButton
                      id="dashboard-roadmap-speech"
                      text={roadmapSpeech}
                      label="Listen to Pathway"
                      variant="secondary"
                      size="xs"
                      ariaLabel={`Listen to ${currentCareer.title} educational roadmap`}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {primaryRoadmap.title} • {primaryRoadmap.description}
                  </p>
                </div>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769FF] hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3.5 py-2 rounded-xl transition self-start sm:self-auto"
                >
                  <span>View All Pathways ({careerRoadmaps.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>


              {/* Step-by-Step Pathway Cards */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {primaryRoadmap.steps.map((step, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === primaryRoadmap.steps.length - 1;
                    return (
                      <div
                        key={step.id}
                        className={`relative p-4 rounded-2xl border transition flex flex-col justify-between ${isLast
                            ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-sm shadow-blue-500/20'
                            : isFirst
                              ? 'bg-[#EAF2FF]/60 border-blue-200 text-slate-800'
                              : 'bg-slate-50/80 border-[#E6EBF5] text-slate-800'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isLast
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white text-[#1769FF] border border-blue-100'
                                }`}
                            >
                              Step {idx + 1}
                            </span>
                            {step.duration && (
                              <span
                                className={`text-[10px] font-semibold ${isLast ? 'text-blue-100' : 'text-slate-500'
                                  }`}
                              >
                                ⏱️ {step.duration}
                              </span>
                            )}
                          </div>
                          <h4 className={`font-bold text-sm ${isLast ? 'text-white' : 'text-[#101D35]'}`}>
                            {step.title}
                          </h4>
                          <p
                            className={`text-xs mt-1.5 line-clamp-3 ${isLast ? 'text-blue-100' : 'text-slate-500'
                              }`}
                          >
                            {step.description}
                          </p>
                        </div>

                        {step.tips && step.tips.length > 0 && (
                          <div className={`mt-3 pt-2 border-t text-[10px] font-medium ${isLast ? 'border-white/20 text-blue-100' : 'border-slate-200/50 text-slate-600'}`}>
                            💡 {step.tips[0]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* 6. TWO-COLUMN: COURSES & SCHOLARSHIPS                        */}
            {/* ============================================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* RECOMMENDED COURSES & RESOURCES */}
              <section className="bg-white rounded-3xl p-6 border border-[#E6EBF5] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📚</span>
                    <h2 className="text-base sm:text-lg font-extrabold text-[#101D35]">
                      {t.dashboard.recommendedCourses}
                    </h2>
                  </div>
                  <Link
                    href="/resources"
                    className="text-xs font-bold text-[#1769FF] hover:text-blue-700"
                  >
                    {t.common.viewAll} →
                  </Link>
                </div>

                <div className="space-y-3">
                  {recommendedResources.map(({ item: res, reasons }) => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-[#E6EBF5] hover:border-blue-200 transition group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#DDF7EA] text-[#0B7A48]">
                              {res.free ? '100% FREE' : 'Resource'}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                              {res.language}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500">
                              {res.provider}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#101D35] group-hover:text-[#1769FF] transition-colors flex items-center gap-1.5">
                            <span>{res.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#1769FF]" />
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {res.description}
                          </p>
                          {reasons.length > 0 && (
                            <div className="text-[10px] text-[#0B7A48] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-[#0B7A48]" />
                              <span>{reasons[0]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* SCHOLARSHIPS YOU MAY QUALIFY FOR */}
              <section className="bg-white rounded-3xl p-6 border border-[#E6EBF5] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎓</span>
                    <h2 className="text-base sm:text-lg font-extrabold text-[#101D35]">
                      {t.dashboard.scholarshipsForYou}
                    </h2>
                  </div>
                  <Link
                    href="/scholarships"
                    className="text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    {t.common.viewAll} →
                  </Link>
                </div>

                <div className="space-y-3">
                  {matchedScholarships.map(({ item: sch, reasons }) => (
                    <div
                      key={sch.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-[#E6EBF5] hover:border-amber-300 transition space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            {sch.amount || 'Financial Grant'}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-[#101D35] mt-1">
                            {sch.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Provider: {sch.provider}
                          </p>
                        </div>
                      </div>

                      {/* Why you may qualify */}
                      <div className="p-2 bg-[#DDF7EA]/60 border border-emerald-100 rounded-xl space-y-1">
                        <div className="text-[10px] font-bold text-[#0B7A48]">
                          Why you may qualify:
                        </div>
                        {reasons.slice(0, 2).map((r, i) => (
                          <div key={i} className="text-[11px] text-[#0B7A48] flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-[#0B7A48] shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500">
                          📅 Deadline: {sch.deadline || 'Active'}
                        </span>
                        <a
                          href={sch.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ============================================================ */}
            {/* 7. OPPORTUNITIES & HACKATHONS                                */}
            {/* ============================================================ */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6EBF5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#101D35] tracking-tight">
                    {t.dashboard.opportunitiesTitle}
                  </h2>
                </div>
                <Link
                  href="/opportunities"
                  className="text-xs font-bold text-[#1769FF] hover:text-blue-700"
                >
                  {t.common.viewAll} →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedOpportunities.map(({ item: opp }) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-[#E6EBF5] hover:border-blue-200 transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                          {opp.type}
                        </span>
                        {opp.stipend && (
                          <span className="text-[10px] font-bold text-[#0B7A48] bg-[#DDF7EA] px-2 py-0.5 rounded">
                            💰 {opp.stipend}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-[#101D35]">
                        {opp.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Organizer: {opp.organizer}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                        {opp.description}
                      </p>
                    </div>

                    <a
                      href={opp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-xs font-bold text-[#1769FF] hover:text-blue-700 pt-2 border-t border-slate-200"
                    >
                      <span>Explore Opportunity</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </AppLayout>
        );
}
