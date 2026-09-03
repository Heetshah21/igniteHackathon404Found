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

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* ============================================================ */}
        {/* 1. WELCOME BANNER                                            */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-emerald-700/30">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                <span>Personalized Career Navigation Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t.dashboard.welcome}, {profile?.name || 'Rahul'} 👋
              </h1>
              <p className="text-emerald-100/90 text-sm font-medium flex flex-wrap items-center gap-2">
                <span>📚 {profile?.education_level || '12th'} {profile?.branch ? `(${profile.branch.toUpperCase()})` : ''}</span>
                <span>•</span>
                <span>📍 {profile?.location || 'Maharashtra'}, {profile?.state || 'India'}</span>
                <span>•</span>
                <span className="bg-emerald-500/30 px-2 py-0.5 rounded text-emerald-200 font-bold">
                  🎯 Goal: {currentCareer.title}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/roadmap"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs shadow-md transition group"
              >
                <Compass className="w-4 h-4 text-emerald-600 group-hover:rotate-45 transition-transform" />
                <span>Explore Full Roadmap</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold text-xs border border-emerald-400/40 shadow-md transition"
              >
                <Bot className="w-4 h-4 text-pink-300" />
                <span>Ask AI Assistant</span>
              </Link>
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ============================================================ */}
        {/* 2. YOUR NEXT STEPS (Next Best Action Engine)                 */}
        {/* ============================================================ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {t.dashboard.nextSteps}
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Personalized Plan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nextSteps.slice(0, 6).map((step, idx) => (
              <div
                key={step.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between group hover:border-emerald-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {step.icon}
                    </span>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      Step #{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {step.description}
                  </p>
                </div>

                {step.action_url && (
                  <Link
                    href={step.action_url}
                    className="mt-4 inline-flex items-center justify-between w-full text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-3 border-t border-slate-100 group-hover:border-emerald-100"
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
        {/* 3. YOUR CAREER ROADMAP (Visual Pathway Preview)              */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🧭</span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {t.dashboard.roadmapPreview}: {currentCareer.title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {primaryRoadmap.title} • {primaryRoadmap.description}
              </p>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-2 rounded-xl transition self-start sm:self-auto"
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
                    className={`relative p-4 rounded-2xl border transition flex flex-col justify-between ${
                      isLast
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md'
                        : isFirst
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                        : 'bg-slate-50/80 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isLast
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          Step {idx + 1}
                        </span>
                        {step.duration && (
                          <span
                            className={`text-[10px] font-semibold ${
                              isLast ? 'text-emerald-100' : 'text-slate-500'
                            }`}
                          >
                            ⏱️ {step.duration}
                          </span>
                        )}
                      </div>
                      <h4 className={`font-bold text-sm ${isLast ? 'text-white' : 'text-slate-900'}`}>
                        {step.title}
                      </h4>
                      <p
                        className={`text-xs mt-1.5 line-clamp-3 ${
                          isLast ? 'text-emerald-100' : 'text-slate-500'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {step.tips && step.tips.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-slate-200/50 text-[10px] text-slate-600 font-medium">
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
        {/* 4. TWO-COLUMN: COURSES & SCHOLARSHIPS                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RECOMMENDED COURSES & RESOURCES */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {t.dashboard.recommendedCourses}
                </h2>
              </div>
              <Link
                href="/resources"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
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
                  className="block p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 transition group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          {res.free ? '100% FREE' : 'Resource'}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                          {res.language}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500">
                          {res.provider}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-1.5">
                        <span>{res.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {res.description}
                      </p>
                      {reasons.length > 0 && (
                        <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
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
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {t.dashboard.scholarshipsForYou}
                </h2>
              </div>
              <Link
                href="/scholarships"
                className="text-xs font-bold text-amber-600 hover:text-amber-800"
              >
                {t.common.viewAll} →
              </Link>
            </div>

            <div className="space-y-3">
              {matchedScholarships.map(({ item: sch, reasons }) => (
                <div
                  key={sch.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {sch.amount || 'Financial Grant'}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1">
                        {sch.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Provider: {sch.provider}
                      </p>
                    </div>
                  </div>

                  {/* Why you may qualify */}
                  <div className="p-2 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
                    <div className="text-[10px] font-bold text-emerald-800">
                      Why you may qualify:
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
        {/* 5. OPPORTUNITIES & HACKATHONS                                */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {t.dashboard.opportunitiesTitle}
              </h2>
            </div>
            <Link
              href="/opportunities"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              {t.common.viewAll} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedOpportunities.map(({ item: opp }) => (
              <div
                key={opp.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                      {opp.type}
                    </span>
                    {opp.stipend && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        💰 {opp.stipend}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">
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
                  className="inline-flex items-center justify-between text-xs font-bold text-orange-700 hover:text-orange-800 pt-2 border-t border-slate-200"
                >
                  <span>Explore Opportunity</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. QUICK ACTION CALLOUTS (Resume, Compare, AI Assistant)      */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/resume"
            className="p-5 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-md hover:shadow-lg transition group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-extrabold text-base">ATS Resume Builder</h3>
              <p className="text-xs text-teal-100 mt-1">
                Auto-generate a clean, ATS-compliant single-page resume ready to download/print.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform">
              <span>Create Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/compare"
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 text-white shadow-md hover:shadow-lg transition group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-extrabold text-base">Compare Streams & Careers</h3>
              <p className="text-xs text-purple-100 mt-1">
                AI/ML vs Data Science, B.Tech vs BCA, Engineering vs Medical + Smart Fit Quiz.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform">
              <span>Start Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/chat"
            className="p-5 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-800 text-white shadow-md hover:shadow-lg transition group flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-extrabold text-base">CAREERMitra AI Assistant</h3>
              <p className="text-xs text-pink-100 mt-1">
                Ask any question: &quot;What after 10th?&quot;, &quot;Software Engineer after Diploma?&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform">
              <span>Chat with AI</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
