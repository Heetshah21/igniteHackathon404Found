'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getCareers } from '@/lib/data/careers';
import { getRoadmaps } from '@/lib/data/roadmaps';
import { Career, Roadmap, RoadmapStep } from '@/types';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
import { getRoadmapSpeech } from '@/lib/speech/hindiContent';
import { RoadmapStageDrawer } from '@/components/roadmap/RoadmapStageDrawer';
import {
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function RoadmapPage() {
  const { profile, updateProfile, language } = useStudent();
  const t = translations[language];

  const [dbCareers, setDbCareers] = useState<Career[]>([]);
  const [dbRoadmaps, setDbRoadmaps] = useState<Roadmap[]>([]);

  // Stage drawer state
  const [selectedStep, setSelectedStep] = useState<RoadmapStep | null>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  useEffect(() => {
    getCareers().then(setDbCareers);
    getRoadmaps().then(setDbRoadmaps);
  }, []);

  // Selected career
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    profile?.career_goal_id || 'software-engineer'
  );

  useEffect(() => {
    if (profile?.career_goal_id) {
      setSelectedCareerId(profile.career_goal_id);
    }
  }, [profile?.career_goal_id]);

  const selectedCareer = useMemo(() => {
    if (dbCareers.length === 0) return { id: 'software-engineer', title: 'Software Engineer', slug: 'software-engineer', description: '', branch: [], icon: '💻' };
    return dbCareers.find((c) => c.id === selectedCareerId) || dbCareers[0];
  }, [dbCareers, selectedCareerId]);

  // Roadmaps for the selected career
  const careerRoadmaps = useMemo(() => {
    const list = dbRoadmaps.filter((r) => r.career_id === selectedCareer.id);
    return list.length > 0 ? list : dbRoadmaps;
  }, [dbRoadmaps, selectedCareer.id]);

  const [activePathwayIndex, setActivePathwayIndex] = useState(0);

  // Set as primary career goal
  const handleSetPrimary = () => {
    updateProfile({
      career_goal_id: selectedCareer.id,
      career_goal: selectedCareer.title,
    });
  };

  const activeRoadmap = careerRoadmaps[activePathwayIndex] || careerRoadmaps[0] || {
    id: 'default-roadmap',
    title: 'Career Pathway',
    description: 'Educational roadmap steps',
    steps: [],
  };

  const careerSpeechText = useMemo(() => {
    return {
      en: `${selectedCareer?.title || 'Career'}. ${selectedCareer?.description || ''}. Average salary package: ${selectedCareer?.avg_salary || 'Competitive'}. Job growth: ${selectedCareer?.growth || 'High'}. Difficulty level: ${selectedCareer?.difficulty || 'Moderate'}.`,
      hi: `${selectedCareer?.title || 'करियर'}। ${selectedCareer?.description || ''}। औसत पैकेज: ${selectedCareer?.avg_salary || 'उत्कृष्ट'}। विकास: ${selectedCareer?.growth || 'उच्च'}। कठिनाई स्तर: ${selectedCareer?.difficulty || 'मध्यम'}।`,
    };
  }, [selectedCareer]);

  const activeRoadmapSpeech = useMemo(() => {
    return getRoadmapSpeech(
      selectedCareer?.title || 'Career',
      activeRoadmap?.title || 'Pathway',
      activeRoadmap?.steps || []
    );
  }, [selectedCareer?.title, activeRoadmap]);

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 text-[#0F1B3D] shadow-[var(--shadow-card)] border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold">
                  <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{t.roadmap.badge}</span>
                </div>
                <AudioButton
                  id={`roadmap-career-speech-${selectedCareer?.id || 'goal'}`}
                  text={careerSpeechText}
                  label={t.roadmap.listenToCareer}
                  variant="badge"
                  size="xs"
                  className="bg-blue-50 hover:bg-blue-100 text-[#2563EB] border-blue-200"
                  ariaLabel={`Listen to ${selectedCareer?.title || 'career'} overview`}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F1B3D]">
                {t.roadmap.title}: {selectedCareer?.title || 'Career'}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
                {t.roadmap.subtitle}
              </p>
            </div>

            {profile?.career_goal_id !== selectedCareer.id && (
              <button
                onClick={handleSetPrimary}
                className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.roadmap.setPrimaryGoal}</span>
              </button>
            )}
          </div>
        </div>

        {/* Career Selector Horizontal Scroll */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.roadmap.selectCareerLabel}
          </label>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {dbCareers.map((career: Career) => {
              const isSelected = selectedCareerId === career.id;
              return (
                <button
                  key={career.id}
                  onClick={() => {
                    setSelectedCareerId(career.id);
                    setActivePathwayIndex(0);
                    setSelectedStep(null);
                  }}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border shrink-0 ${isSelected
                    ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-sm'
                    : 'bg-white text-slate-700 border-[#E6EBF5] hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  <span className="text-base">{career.icon}</span>
                  <span>{career.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Career Quick Overview Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
              {selectedCareer.icon}
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{selectedCareer.title}</h3>
              <p className="text-xs text-slate-500">{selectedCareer.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">{t.roadmap.avgPackage}</span>
              <span className="text-emerald-700 font-extrabold">{selectedCareer.avg_salary}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">{t.roadmap.jobGrowth}</span>
              <span className="text-indigo-700 font-extrabold">{selectedCareer.growth}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">{t.roadmap.difficulty}</span>
              <span className="text-amber-700 font-extrabold">{selectedCareer.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Pathway Tabs (e.g., B.Tech Path vs Diploma DSE vs BCA/MCA) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              {t.roadmap.availablePathways} ({(careerRoadmaps ?? []).length} {t.roadmap.options})
            </h2>
            <span className="text-xs text-slate-500">{t.roadmap.clickPathwayHint}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(careerRoadmaps ?? []).map((r, idx) => {
              const isActive = activePathwayIndex === idx;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setActivePathwayIndex(idx);
                    setSelectedStep(null);
                  }}
                  className={`p-4 rounded-2xl text-left border transition ${isActive
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      Pathway #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {r?.steps?.length || 0} {t.roadmap.steps}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{r?.title || 'Pathway'}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r?.description || ''}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pathway Detailed Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {activeRoadmap?.title || 'Career Pathway'}
                </h3>
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {activeRoadmap?.description || 'Detailed steps for your career roadmap'} • <span className="font-semibold text-[#1769FF]">{t.roadmap.clickStageHint}</span>
              </p>
            </div>

            <AudioButton
              id={`roadmap-pathway-speech-${activeRoadmap?.id || 'default'}`}
              text={activeRoadmapSpeech}
              label={t.roadmap.listenToRoadmap}
              variant="secondary"
              size="sm"
              ariaLabel={`Listen to full roadmap for ${activeRoadmap?.title || 'career pathway'}`}
            />
          </div>

          {/* Vertical Timeline with visual connectors */}
          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-400 before:to-indigo-600">
            {(activeRoadmap?.steps ?? []).map((step, idx) => {
              const stepsCount = activeRoadmap?.steps?.length || 0;
              const isLast = idx === stepsCount - 1;
              const isFirst = idx === 0;

              const stageSpeech = {
                en: `Stage ${idx + 1}: ${step?.title || ''}. ${step?.duration ? `Duration: ${step.duration}.` : ''} ${step?.description || ''}. ${step?.requirements?.length ? `Prerequisites: ${step.requirements.join(', ')}.` : ''} ${step?.tips?.length ? `Tip: ${step.tips[0]}` : ''}`,
                hi: `चरण ${idx + 1}: ${step?.title || ''}। ${step?.duration ? `समय: ${step.duration}।` : ''} ${step?.description || ''}। ${step?.requirements?.length ? `योग्यता: ${step.requirements.join(', ')}।` : ''} ${step?.tips?.length ? `सुझाव: ${step.tips[0]}` : ''}`,
              };

              return (
                <div key={step?.id || idx} className="relative group">
                  {/* Timeline bullet node */}
                  <div
                    className={`absolute -left-6 sm:-left-10 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 shadow-xs transition-transform group-hover:scale-110 ${isLast
                      ? 'bg-emerald-600 text-white border-white ring-4 ring-emerald-100'
                      : isFirst
                        ? 'bg-teal-500 text-white border-white ring-2 ring-teal-100'
                        : 'bg-white text-slate-700 border-slate-300'
                      }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Step Card Content (Clickable) */}
                  <div
                    onClick={() => {
                      setSelectedStep(step);
                      setSelectedStepIndex(idx);
                    }}
                    className={`p-5 rounded-2xl border transition cursor-pointer group/card hover:scale-[1.01] hover:shadow-md ${isLast
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-lg'
                      : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-[#1769FF] hover:ring-2 hover:ring-[#1769FF]/20 shadow-xs'
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${isLast ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                            }`}
                        >
                          {t.roadmap.stage} {idx + 1}
                        </span>
                        <h4
                          className={`font-extrabold text-base sm:text-lg ${isLast ? 'text-white' : 'text-slate-900 group-hover/card:text-[#1769FF] transition-colors'
                            }`}
                        >
                          {step?.title}
                        </h4>
                      </div>

                      <div
                        className="flex items-center gap-2 self-start sm:self-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {step?.duration && (
                          <div
                            className={`inline-flex items-center gap-1 text-xs font-semibold ${isLast ? 'text-emerald-100' : 'text-slate-500'
                              }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{step.duration}</span>
                          </div>
                        )}

                        <AudioButton
                          id={`roadmap-stage-${step?.id || idx}`}
                          text={stageSpeech}
                          label={t.common.listen}
                          variant={isLast ? 'badge' : 'ghost'}
                          size="xs"
                          className={
                            isLast
                              ? 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              : 'text-slate-600 hover:bg-slate-200/60'
                          }
                          ariaLabel={`Listen to Stage ${idx + 1}: ${step?.title || ''}`}
                        />
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLast ? 'text-emerald-50' : 'text-slate-600'
                        }`}
                    >
                      {step?.description}
                    </p>

                    {/* Requirements */}
                    {step?.requirements && step.requirements.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold ${isLast ? 'text-emerald-100' : 'text-slate-500'
                            }`}
                        >
                          {t.common.prerequisites}
                        </span>
                        {step.requirements.map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${isLast
                              ? 'bg-white/15 text-white'
                              : 'bg-slate-200 text-slate-800'
                              }`}
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pro Tips */}
                    {step?.tips && step.tips.length > 0 && (
                      <div
                        className={`mt-3 p-3 rounded-xl text-xs space-y-1 ${isLast
                          ? 'bg-black/15 text-emerald-100 border border-white/10'
                          : 'bg-emerald-50/70 text-emerald-900 border border-emerald-200/60'
                          }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <span>{t.common.proTipsForRural}</span>
                        </div>
                        {step.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="font-medium pl-2">
                            • {tip}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Click CTA Indicator */}
                    <div
                      className={`mt-3.5 pt-2.5 border-t flex items-center justify-between text-xs font-bold transition-all ${
                        isLast
                          ? 'border-white/20 text-white hover:text-emerald-100'
                          : 'border-slate-200/60 text-[#1769FF] group-hover/card:text-blue-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t.roadmap.clickToViewColleges}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stage Detail Drawer Modal */}
      <RoadmapStageDrawer
        isOpen={!!selectedStep}
        step={selectedStep}
        career={selectedCareer}
        pathway={activeRoadmap}
        stageIndex={selectedStepIndex}
        onClose={() => setSelectedStep(null)}
      />
    </AppLayout>
  );
}

