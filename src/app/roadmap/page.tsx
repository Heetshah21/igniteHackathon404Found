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

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.13)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
  };

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-2xl p-6 sm:p-8" style={glassCard}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(163,230,53,0.15)', border: '1px solid rgba(163,230,53,0.35)', color: 'var(--lime-green)' }}
                >
                  <Compass className="w-3.5 h-3.5" style={{ color: 'var(--lime-green)' }} />
                  <span>{t.roadmap.badge}</span>
                </div>
                <AudioButton
                  id={`roadmap-career-speech-${selectedCareer?.id || 'goal'}`}
                  text={careerSpeechText}
                  label={t.roadmap.listenToCareer}
                  variant="badge"
                  size="xs"
                  className="bg-white/10 hover:bg-white/15 text-white/80 border-white/20"
                  ariaLabel={`Listen to ${selectedCareer?.title || 'career'} overview`}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.roadmap.title}: {selectedCareer?.title || 'Career'}
              </h1>
              <p className="text-white/55 text-xs sm:text-sm max-w-2xl">
                {t.roadmap.subtitle}
              </p>
            </div>

            {profile?.career_goal_id !== selectedCareer.id && (
              <button
                onClick={handleSetPrimary}
                className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer btn-lime"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.roadmap.setPrimaryGoal}</span>
              </button>
            )}
          </div>
        </div>

        {/* Career Selector Horizontal Scroll */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-white/40">
            {t.roadmap.selectCareerLabel}
          </label>
          <div className="flex gap-2.5 overflow-x-auto pb-2">
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
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 shrink-0"
                  style={isSelected ? {
                    background: 'rgba(163,230,53,0.20)',
                    border: '1px solid rgba(163,230,53,0.45)',
                    color: 'var(--lime-green)',
                    boxShadow: '0 0 12px rgba(163,230,53,0.15)',
                  } : {
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.13)',
                    color: 'rgba(255,255,255,0.70)',
                  }}
                >
                  <span className="text-base">{career.icon}</span>
                  <span>{career.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Career Quick Overview Card */}
        <div className="rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4" style={glassCard}>
          <div className="flex items-center gap-3">
            <span
              className="text-3xl p-2.5 rounded-2xl"
              style={{ background: 'rgba(163,230,53,0.12)', border: '1px solid rgba(163,230,53,0.25)' }}
            >
              {selectedCareer.icon}
            </span>
            <div>
              <h3 className="font-extrabold text-white text-base">{selectedCareer.title}</h3>
              <p className="text-xs text-white/50">{selectedCareer.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div
              className="p-2 rounded-xl text-center"
              style={{ background: 'rgba(163,230,53,0.10)', border: '1px solid rgba(163,230,53,0.20)' }}
            >
              <span className="text-[10px] text-white/40 uppercase block font-bold">{t.roadmap.avgPackage}</span>
              <span className="font-extrabold" style={{ color: 'var(--lime-green)' }}>{selectedCareer.avg_salary}</span>
            </div>
            <div
              className="p-2 rounded-xl text-center"
              style={{ background: 'rgba(129,140,248,0.10)', border: '1px solid rgba(129,140,248,0.20)' }}
            >
              <span className="text-[10px] text-white/40 uppercase block font-bold">{t.roadmap.jobGrowth}</span>
              <span className="font-extrabold text-violet-400">{selectedCareer.growth}</span>
            </div>
            <div
              className="p-2 rounded-xl text-center"
              style={{ background: 'rgba(252,211,77,0.10)', border: '1px solid rgba(252,211,77,0.20)' }}
            >
              <span className="text-[10px] text-white/40 uppercase block font-bold">{t.roadmap.difficulty}</span>
              <span className="font-extrabold text-amber-400">{selectedCareer.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Pathway Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-white">
              {t.roadmap.availablePathways} ({(careerRoadmaps ?? []).length} {t.roadmap.options})
            </h2>
            <span className="text-xs text-white/40">{t.roadmap.clickPathwayHint}</span>
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
                  className="p-4 rounded-2xl text-left transition"
                  style={isActive ? {
                    background: 'rgba(163,230,53,0.15)',
                    border: '1px solid rgba(163,230,53,0.40)',
                    boxShadow: '0 4px 20px rgba(163,230,53,0.12)',
                  } : {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.11)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md"
                      style={isActive ? {
                        background: 'rgba(163,230,53,0.25)',
                        color: 'var(--lime-green)',
                      } : {
                        background: 'rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.55)',
                      }}
                    >
                      Pathway #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-white/40">
                      {r?.steps?.length || 0} {t.roadmap.steps}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white mt-1">{r?.title || 'Pathway'}</h4>
                  <p className="text-xs text-white/45 mt-1 line-clamp-2">{r?.description || ''}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pathway Detailed Timeline */}
        <div className="rounded-3xl p-6 sm:p-8 space-y-8" style={glassCard}>
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <h3 className="text-lg font-extrabold text-white">
                  {activeRoadmap?.title || 'Career Pathway'}
                </h3>
              </div>
              <p className="text-xs text-white/45 mt-1">
                {activeRoadmap?.description || 'Detailed steps for your career roadmap'} •{' '}
                <span className="font-semibold" style={{ color: 'var(--lime-green)' }}>{t.roadmap.clickStageHint}</span>
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

          {/* Vertical Timeline */}
          <div
            className="relative pl-6 sm:pl-10 space-y-8"
            style={{ '--tw-gradient-from': '#A3E635' } as React.CSSProperties}
          >
            <div
              className="absolute left-3 sm:left-5 top-3 bottom-3 w-0.5"
              style={{ background: 'linear-gradient(to bottom, #A3E635, #06B6D4, #818CF8)' }}
            />
            {(activeRoadmap?.steps ?? []).map((step, idx) => {
              const stepsCount = activeRoadmap?.steps?.length || 0;
              const isLast = idx === stepsCount - 1;
              const isFirst = idx === 0;

              const stageSpeech = {
                en: `Stage ${idx + 1}: ${step?.title || ''}. ${step?.duration ? `Duration: ${step.duration}.` : ''} ${step?.description || ''}. ${step?.requirements?.length ? `Prerequisites: ${step.requirements.join(', ')}.` : ''} ${step?.tips?.length ? `Tip: ${step.tips[0]}` : ''}`,
                hi: `चरण ${idx + 1}: ${step?.title || ''}। ${step?.duration ? `समय: ${step.duration}।` : ''} ${step?.description || ''}। ${step?.requirements?.length ? `योग्यता: ${step.requirements.join(', ')}।` : ''} ${step?.tips?.length ? `सुझाव: ${step.tips[0]}` : ''}`,
              };

              const cardStyle: React.CSSProperties = isLast ? {
                background: 'rgba(163,230,53,0.15)',
                border: '1px solid rgba(163,230,53,0.40)',
                boxShadow: '0 8px 32px rgba(163,230,53,0.12)',
              } : {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.11)',
              };

              return (
                <div key={step?.id || idx} className="relative group">
                  {/* Timeline bullet node */}
                  <div
                    className="absolute -left-6 sm:-left-10 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-110"
                    style={isLast ? {
                      background: 'var(--lime-green)',
                      color: '#0A1F00',
                      boxShadow: '0 0 14px rgba(163,230,53,0.50)',
                      border: '2px solid rgba(255,255,255,0.30)',
                    } : {
                      background: 'rgba(255,255,255,0.12)',
                      color: 'white',
                      border: '2px solid rgba(255,255,255,0.20)',
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Step Card Content (Clickable) */}
                  <div
                    onClick={() => {
                      setSelectedStep(step);
                      setSelectedStepIndex(idx);
                    }}
                    className="p-5 rounded-2xl transition cursor-pointer group/card hover:scale-[1.005] hover:-translate-y-0.5"
                    style={cardStyle}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full"
                          style={isLast ? {
                            background: 'rgba(255,255,255,0.20)',
                            color: 'var(--lime-green)',
                          } : {
                            background: 'rgba(163,230,53,0.12)',
                            color: 'var(--lime-green)',
                            border: '1px solid rgba(163,230,53,0.25)',
                          }}
                        >
                          {t.roadmap.stage} {idx + 1}
                        </span>
                        <h4 className="font-extrabold text-base sm:text-lg text-white group-hover/card:opacity-90 transition-opacity">
                          {step?.title}
                        </h4>
                      </div>

                      <div
                        className="flex items-center gap-2 self-start sm:self-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {step?.duration && (
                          <div className="inline-flex items-center gap-1 text-xs font-semibold text-white/45">
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
                          className="text-white/60 hover:bg-white/10"
                          ariaLabel={`Listen to Stage ${idx + 1}: ${step?.title || ''}`}
                        />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm mt-2 leading-relaxed text-white/60">
                      {step?.description}
                    </p>

                    {/* Requirements */}
                    {step?.requirements && step.requirements.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-white/40">{t.common.prerequisites}</span>
                        {step.requirements.map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                            style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.75)' }}
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pro Tips */}
                    {step?.tips && step.tips.length > 0 && (
                      <div
                        className="mt-3 p-3 rounded-xl text-xs space-y-1"
                        style={{
                          background: 'rgba(163,230,53,0.08)',
                          border: '1px solid rgba(163,230,53,0.18)',
                        }}
                      >
                        <div className="font-bold flex items-center gap-1.5" style={{ color: 'var(--lime-green)' }}>
                          <span>{t.common.proTipsForRural}</span>
                        </div>
                        {step.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="font-medium pl-2 text-white/60">• {tip}</div>
                        ))}
                      </div>
                    )}

                    {/* Click CTA Indicator */}
                    <div
                      className="mt-3.5 pt-2.5 flex items-center justify-between text-xs font-bold"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'var(--lime-green)' }}
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

