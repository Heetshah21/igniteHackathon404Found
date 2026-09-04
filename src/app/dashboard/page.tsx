'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getCareers } from '@/lib/data/careers';
import { getRoadmaps } from '@/lib/data/roadmaps';
import { getResources } from '@/lib/data/resources';
import { getScholarships } from '@/lib/data/scholarships';
import { getOpportunities } from '@/lib/data/opportunities';
import { Career, Roadmap, Resource, Scholarship, Opportunity } from '@/types';
import { matchResources, matchScholarships, matchOpportunities } from '@/lib/recommendations/matcher';
import { translations } from '@/lib/translations';
import { HeroRoadmapVisual } from '@/components/home/HeroRoadmapVisual';
import { AudioButton } from '@/components/common/AudioButton';
import { getRoadmapSpeech } from '@/lib/speech/hindiContent';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Target,
  Award,
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, language } = useStudent();
  const t = translations[language];

  const [dbCareers, setDbCareers] = useState<Career[]>([]);
  const [dbRoadmaps, setDbRoadmaps] = useState<Roadmap[]>([]);
  const [dbResources, setDbResources] = useState<Resource[]>([]);
  const [dbScholarships, setDbScholarships] = useState<Scholarship[]>([]);
  const [dbOpportunities, setDbOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    getCareers().then(setDbCareers);
    getRoadmaps().then(setDbRoadmaps);
    getResources().then(setDbResources);
    getScholarships().then(setDbScholarships);
    getOpportunities().then(setDbOpportunities);
  }, []);

  // Current student career info
  const currentCareer = useMemo(() => {
    if (dbCareers.length === 0) return { id: 'general', title: 'Career Exploration', slug: 'general', description: '', branch: [], icon: '🎯' };
    return (
      (profile?.career_goal_id ? dbCareers.find((c) => c.id === profile.career_goal_id) : undefined) ||
      dbCareers[0]
    );
  }, [dbCareers, profile?.career_goal_id]);

  // Roadmaps for the student's career
  const careerRoadmaps = useMemo(() => {
    const list = dbRoadmaps.filter((r) => r.career_id === currentCareer.id);
    return list.length > 0 ? list : dbRoadmaps;
  }, [dbRoadmaps, currentCareer.id]);

  const primaryRoadmap = careerRoadmaps[0];

  // Personalized recommendations
  const recommendedResources = useMemo(() => {
    const matched = matchResources(dbResources, profile || {});
    return matched.slice(0, 4);
  }, [dbResources, profile]);

  const matchedScholarships = useMemo(() => {
    const matched = matchScholarships(dbScholarships, profile || {});
    return matched.slice(0, 3);
  }, [dbScholarships, profile]);

  const recommendedOpportunities = useMemo(() => {
    const matched = matchOpportunities(dbOpportunities, profile || {});
    return matched.slice(0, 3);
  }, [dbOpportunities, profile]);

  const roadmapSpeech = useMemo(() => {
    return getRoadmapSpeech(
      currentCareer.title,
      primaryRoadmap?.title || 'Career Pathway',
      primaryRoadmap?.steps || []
    );
  }, [currentCareer.title, primaryRoadmap]);

  return (
    <AppLayout>
      <div className="space-y-10 pb-12">
        {/* ============================================================ */}
        {/* 1. HERO SECTION (TWO COLUMNS)                                */}
        {/* ============================================================ */}
        <section className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{t.dashboard.heroBadge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-[#0F1B3D]">
                {t.dashboard.heroTitle1}<br />
                {t.dashboard.heroTitle2}<br />
                <span className="text-[#2563EB]">{t.dashboard.heroTitle3}</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                {t.dashboard.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition group"
                >
                  <span>{t.dashboard.exploreCareers}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50/50 text-[#2563EB] font-bold text-sm border border-[#2563EB] shadow-xs transition"
                >
                  <span>{t.dashboard.talkToAi}</span>
                  <Sparkles className="w-4 h-4 text-[#2563EB]" />
                </Link>
              </div>

              {/* Trust Statistics Row */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-[#0F1B3D] leading-none">
                        10K+
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {t.dashboard.studentsGuided}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-[#0F1B3D] leading-none">
                        100+
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {t.dashboard.careerPaths}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-[#0F1B3D] leading-none">
                        100%
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {t.dashboard.freeResources}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#0F1B3D] leading-none">
                        100%
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {t.dashboard.trustedByStudents}
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
        {/* 2. YOUR CAREER ROADMAP (Visual Pathway Preview)              */}
        {/* ============================================================ */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[var(--shadow-card)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧭</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#0F1B3D] tracking-tight">
                    {t.dashboard.roadmapPreview}: {currentCareer?.title || 'Your Career'}
                  </h2>
                </div>
                <AudioButton
                  id="dashboard-roadmap-speech"
                  text={roadmapSpeech}
                  label={t.common.listen}
                  variant="secondary"
                  size="xs"
                  ariaLabel={`Listen to ${currentCareer?.title || 'career'} educational roadmap`}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {primaryRoadmap?.title || 'Career Pathway'} • {primaryRoadmap?.description || 'Your personalized career roadmap'}
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3.5 py-2 rounded-xl transition self-start sm:self-auto border border-blue-200/60"
            >
              <span>{t.dashboard.viewAllPathways} ({(careerRoadmaps ?? []).length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Step-by-Step Pathway Cards */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {(primaryRoadmap?.steps ?? []).map((step, idx) => {
                const totalSteps = primaryRoadmap?.steps?.length ?? 0;
                const isFirst = idx === 0;
                const isLast = idx === totalSteps - 1;
                return (
                  <div
                    key={step?.id || idx}
                    className={`relative p-4 rounded-xl border transition flex flex-col justify-between ${isLast
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                      : isFirst
                        ? 'bg-blue-50/60 border-blue-200 text-slate-800'
                        : 'bg-slate-50/80 border-slate-200 text-slate-800'
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isLast
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-[#2563EB] border border-blue-100'
                            }`}
                        >
                          {t.dashboard.step} {idx + 1}
                        </span>
                        {step?.duration && (
                          <span
                            className={`text-[10px] font-semibold ${isLast ? 'text-blue-100' : 'text-slate-500'
                              }`}
                          >
                            ⏱️ {step.duration}
                          </span>
                        )}
                      </div>
                      <h4 className={`font-bold text-sm ${isLast ? 'text-white' : 'text-[#0F1B3D]'}`}>
                        {step?.title}
                      </h4>
                      <p
                        className={`text-xs mt-1.5 line-clamp-3 ${isLast ? 'text-blue-100' : 'text-slate-500'
                          }`}
                      >
                        {step?.description}
                      </p>
                    </div>

                    {step?.tips && step.tips.length > 0 && (
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
        {/* 3. TWO-COLUMN: COURSES & SCHOLARSHIPS                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RECOMMENDED COURSES & RESOURCES */}
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0F1B3D]">
                  {t.dashboard.recommendedCourses}
                </h2>
              </div>
              <Link
                href="/resources"
                className="text-xs font-bold text-[#2563EB] hover:text-blue-700"
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
                  className="block p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-200 transition group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {res.free ? t.common.free : 'Resource'}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {res.language}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500">
                          {res.provider}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0F1B3D] group-hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                        <span>{res.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB]" />
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {res.description}
                      </p>
                      {reasons.length > 0 && (
                        <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
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
          <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0F1B3D]">
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
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                        {sch.amount || t.dashboard.financialGrant}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0F1B3D] mt-1">
                        {sch.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {t.common.provider}: {sch.provider}
                      </p>
                    </div>
                  </div>

                  {/* Why you may qualify */}
                  <div className="p-2 bg-emerald-50/80 border border-emerald-100 rounded-xl space-y-1">
                    <div className="text-[10px] font-bold text-emerald-800">
                      {t.common.whyYouQualify}
                    </div>
                    {reasons.slice(0, 2).map((r, i) => (
                      <div key={i} className="text-[11px] text-emerald-700 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500">
                      📅 {t.common.deadline}: {sch.deadline || 'Active'}
                    </span>
                    <a
                      href={sch.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>{t.dashboard.apply}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ============================================================ */}
        {/* 4. OPPORTUNITIES & HACKATHONS                                */}
        {/* ============================================================ */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0F1B3D] tracking-tight">
                {t.dashboard.opportunitiesTitle}
              </h2>
            </div>
            <Link
              href="/opportunities"
              className="text-xs font-bold text-[#2563EB] hover:text-blue-700"
            >
              {t.common.viewAll} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedOpportunities.map(({ item: opp }) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 border border-orange-200">
                      {opp.type}
                    </span>
                    {opp.stipend && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        💰 {opp.stipend}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-[#0F1B3D]">
                    {opp.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.common.organizer}: {opp.organizer}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {opp.description}
                  </p>
                </div>

                <a
                  href={opp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between text-xs font-bold text-[#2563EB] hover:text-blue-700 pt-2 border-t border-slate-200"
                >
                  <span>{t.dashboard.exploreOpportunity}</span>
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

