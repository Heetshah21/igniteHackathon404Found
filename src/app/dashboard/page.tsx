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
  Zap,
} from 'lucide-react';

/* ── tiny helper: glassy section box ─────────────────────────── */
function GlassSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 space-y-6 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.13)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.18)',
      }}
    >
      {children}
    </div>
  );
}

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

  const currentCareer = useMemo(() => {
    if (dbCareers.length === 0) return { id: 'software-engineer', title: 'Software Engineer', slug: 'software-engineer', description: '', branch: [], icon: '💻' };
    return (
      dbCareers.find((c) => c.id === profile?.career_goal_id) ||
      dbCareers.find((c) => c.slug === 'software-engineer') ||
      dbCareers[0]
    );
  }, [dbCareers, profile?.career_goal_id]);

  const careerRoadmaps = useMemo(() => {
    const list = dbRoadmaps.filter((r) => r.career_id === currentCareer.id);
    return list.length > 0 ? list : dbRoadmaps;
  }, [dbRoadmaps, currentCareer.id]);

  const primaryRoadmap = careerRoadmaps[0];

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
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="glow-orb w-80 h-80 top-0 right-1/4" style={{ background: '#A3E635', opacity: 0.06 }} />
        <div className="glow-orb w-72 h-72 bottom-0 left-1/3" style={{ background: '#60A5FA', opacity: 0.08, animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 space-y-8 pb-12">

        {/* ============================================================ */}
        {/* 1. HERO SECTION (TWO COLUMNS)                                */}
        {/* ============================================================ */}
        <section className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-lime text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 sparkle-animate" style={{ color: 'var(--lime-green)' }} />
                <span style={{ color: 'var(--lime-green)' }}>{t.dashboard.heroBadge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-white">
                {t.dashboard.heroTitle1}<br />
                {t.dashboard.heroTitle2}<br />
                <span style={{ color: 'var(--lime-green)', textShadow: '0 0 40px rgba(163,230,53,0.35)' }}>
                  {t.dashboard.heroTitle3}
                </span>
              </h1>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                {t.dashboard.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition group btn-lime"
                >
                  <span>{t.dashboard.exploreCareers}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-bold text-sm text-white hover:bg-white/12 transition group"
                >
                  <span>{t.dashboard.talkToAi}</span>
                  <Sparkles className="w-4 h-4 sparkle-animate" style={{ color: 'var(--lime-green)' }} />
                </Link>
              </div>

              {/* Trust Statistics Row */}
              <div className="border-t border-white/10 pt-6 mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Target, value: '10K+', label: t.dashboard.studentsGuided },
                    { icon: GraduationCap, value: '100+', label: t.dashboard.careerPaths },
                    { icon: BookOpen, value: '100%', label: t.dashboard.freeResources },
                    { icon: Award, value: '100%', label: t.dashboard.trustedByStudents },
                  ].map(({ icon: Icon, value, label }, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl glass-light flex items-center justify-center">
                        <Icon className="w-4 h-4" style={{ color: 'var(--lime-green)' }} />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black text-white leading-none">{value}</div>
                        <div className="text-[11px] text-white/50 font-medium mt-0.5">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hero Column */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <HeroRoadmapVisual />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. YOUR CAREER ROADMAP                                       */}
        {/* ============================================================ */}
        <GlassSection className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧭</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
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
              <p className="text-xs text-white/45 mt-1">
                {primaryRoadmap?.title || 'Career Pathway'} • {primaryRoadmap?.description || 'Your personalized career roadmap'}
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition self-start sm:self-auto"
              style={{
                background: 'rgba(163,230,53,0.15)',
                color: 'var(--lime-green)',
                border: '1px solid rgba(163,230,53,0.30)',
              }}
            >
              <span>{t.dashboard.viewAllPathways} ({(careerRoadmaps ?? []).length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Step-by-Step Pathway Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {(primaryRoadmap?.steps ?? []).map((step, idx) => {
              const totalSteps = primaryRoadmap?.steps?.length ?? 0;
              const isLast = idx === totalSteps - 1;
              const isFirst = idx === 0;
              return (
                <div
                  key={step?.id || idx}
                  className="relative p-4 rounded-xl transition flex flex-col justify-between"
                  style={isLast ? {
                    background: 'rgba(163,230,53,0.18)',
                    border: '1px solid rgba(163,230,53,0.40)',
                    boxShadow: '0 4px 20px rgba(163,230,53,0.15)',
                  } : isFirst ? {
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.20)',
                  } : {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                        style={isLast ? {
                          background: 'rgba(255,255,255,0.20)',
                          color: 'var(--lime-green)',
                        } : {
                          background: 'rgba(163,230,53,0.15)',
                          color: 'var(--lime-green)',
                          border: '1px solid rgba(163,230,53,0.30)',
                        }}
                      >
                        {t.dashboard.step} {idx + 1}
                      </span>
                      {step?.duration && (
                        <span className="text-[10px] font-semibold text-white/45">
                          ⏱️ {step.duration}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-white">{step?.title}</h4>
                    <p className="text-xs mt-1.5 line-clamp-3 text-white/50">
                      {step?.description}
                    </p>
                  </div>

                  {step?.tips && step.tips.length > 0 && (
                    <div
                      className="mt-3 pt-2 border-t text-[10px] font-medium text-white/50"
                      style={{ borderColor: 'rgba(255,255,255,0.10)' }}
                    >
                      💡 {step.tips[0]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassSection>

        {/* ============================================================ */}
        {/* 3. TWO-COLUMN: COURSES & SCHOLARSHIPS                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* RECOMMENDED COURSES & RESOURCES */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  {t.dashboard.recommendedCourses}
                </h2>
              </div>
              <Link href="/resources" className="text-xs font-bold hover:opacity-80 transition"
                style={{ color: 'var(--lime-green)' }}>
                {t.common.viewAll} →
              </Link>
            </div>

            <div className="space-y-2.5">
              {recommendedResources.map(({ item: res, reasons }) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl transition group"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(163,230,53,0.30)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(163,230,53,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md"
                          style={{
                            background: 'rgba(163,230,53,0.15)',
                            color: 'var(--lime-green)',
                            border: '1px solid rgba(163,230,53,0.30)',
                          }}
                        >
                          {res.free ? t.common.free : 'Resource'}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/60">
                          {res.language}
                        </span>
                        <span className="text-[10px] font-medium text-white/45">
                          {res.provider}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#A3E635] transition-colors flex items-center gap-1.5">
                        <span>{res.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--lime-green)' }} />
                      </h4>
                      <p className="text-xs text-white/45 line-clamp-1">{res.description}</p>
                      {reasons.length > 0 && (
                        <div className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--lime-green)' }}>
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: 'var(--lime-green)' }} />
                          <span>{reasons[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* SCHOLARSHIPS YOU MAY QUALIFY FOR */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  {t.dashboard.scholarshipsForYou}
                </h2>
              </div>
              <Link href="/scholarships" className="text-xs font-bold text-amber-400 hover:text-amber-300 transition">
                {t.common.viewAll} →
              </Link>
            </div>

            <div className="space-y-2.5">
              {matchedScholarships.map(({ item: sch, reasons }) => (
                <div
                  key={sch.id}
                  className="p-3.5 rounded-xl space-y-2"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          background: 'rgba(252,211,77,0.15)',
                          color: '#FCD34D',
                          border: '1px solid rgba(252,211,77,0.30)',
                        }}
                      >
                        {sch.amount || t.dashboard.financialGrant}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-white mt-1">{sch.name}</h4>
                      <p className="text-[11px] text-white/45 font-medium">
                        {t.common.provider}: {sch.provider}
                      </p>
                    </div>
                  </div>

                  {/* Why you may qualify */}
                  <div
                    className="p-2 rounded-xl space-y-1"
                    style={{
                      background: 'rgba(163,230,53,0.08)',
                      border: '1px solid rgba(163,230,53,0.18)',
                    }}
                  >
                    <div className="text-[10px] font-bold" style={{ color: 'var(--lime-green)' }}>
                      {t.common.whyYouQualify}
                    </div>
                    {reasons.slice(0, 2).map((r, i) => (
                      <div key={i} className="text-[11px] flex items-center gap-1.5 font-medium text-white/70">
                        <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: 'var(--lime-green)' }} />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-white/40">
                      📅 {t.common.deadline}: {sch.deadline || 'Active'}
                    </span>
                    <a
                      href={sch.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold flex items-center gap-1 text-amber-400 hover:text-amber-300 transition"
                    >
                      <span>{t.dashboard.apply}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. OPPORTUNITIES & HACKATHONS                                */}
        {/* ============================================================ */}
        <div
          className="rounded-2xl p-6 sm:p-8 space-y-4"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {t.dashboard.opportunitiesTitle}
              </h2>
            </div>
            <Link href="/opportunities" className="text-xs font-bold hover:opacity-80 transition"
              style={{ color: 'var(--lime-green)' }}>
              {t.common.viewAll} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedOpportunities.map(({ item: opp }) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl flex flex-col justify-between space-y-3 transition hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.20)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md"
                      style={{
                        background: 'rgba(251,146,60,0.15)',
                        color: '#FB923C',
                        border: '1px solid rgba(251,146,60,0.30)',
                      }}
                    >
                      {opp.type}
                    </span>
                    {opp.stipend && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{
                          background: 'rgba(163,230,53,0.12)',
                          color: 'var(--lime-green)',
                          border: '1px solid rgba(163,230,53,0.25)',
                        }}
                      >
                        💰 {opp.stipend}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-white">{opp.title}</h4>
                  <p className="text-[11px] text-white/45 font-medium">
                    {t.common.organizer}: {opp.organizer}
                  </p>
                  <p className="text-xs text-white/55 mt-2 line-clamp-2">{opp.description}</p>
                </div>

                <a
                  href={opp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between text-xs font-bold pt-2 transition"
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--lime-green)',
                  }}
                >
                  <span>{t.dashboard.exploreOpportunity}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
