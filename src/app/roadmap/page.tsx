'use client';

import React, { useState, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { careers } from '@/data/careers';
import { roadmaps } from '@/data/roadmaps';
import { translations } from '@/lib/translations';
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

  // Selected career
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    profile?.career_goal_id || 'software-engineer'
  );

  const selectedCareer = useMemo(() => {
    return careers.find((c) => c.id === selectedCareerId) || careers[0];
  }, [selectedCareerId]);

  // Roadmaps for the selected career
  const careerRoadmaps = useMemo(() => {
    const list = roadmaps.filter((r) => r.career_id === selectedCareer.id);
    return list.length > 0 ? list : [roadmaps[0]];
  }, [selectedCareer.id]);

  const [activePathwayIndex, setActivePathwayIndex] = useState(0);

  // Set as primary career goal
  const handleSetPrimary = () => {
    updateProfile({
      career_goal_id: selectedCareer.id,
      career_goal: selectedCareer.title,
    });
  };

  const activeRoadmap = careerRoadmaps[activePathwayIndex] || careerRoadmaps[0];

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 text-[#101D35] shadow-xs border border-[#E6EBF5]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] border border-[#CCE0FF] text-[#1769FF] text-xs font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>Feature 2 • Multi-Pathway Educational Roadmaps</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101D35]">
                Career Roadmap: {selectedCareer.title}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
                Discover multiple proven educational paths from 10th/12th/Diploma to reaching your destination as a {selectedCareer.title}.
              </p>
            </div>

            {profile?.career_goal_id !== selectedCareer.id && (
              <button
                onClick={handleSetPrimary}
                className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1769FF] hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Set as My Primary Goal</span>
              </button>
            )}
          </div>
        </div>

        {/* Career Selector Horizontal Scroll */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Career to Explore Pathways:
          </label>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {careers.map((career) => {
              const isSelected = selectedCareerId === career.id;
              return (
                <button
                  key={career.id}
                  onClick={() => {
                    setSelectedCareerId(career.id);
                    setActivePathwayIndex(0);
                  }}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border shrink-0 ${
                    isSelected
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
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Avg. Package</span>
              <span className="text-emerald-700 font-extrabold">{selectedCareer.avg_salary}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Job Growth</span>
              <span className="text-indigo-700 font-extrabold">{selectedCareer.growth}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">Difficulty</span>
              <span className="text-amber-700 font-extrabold">{selectedCareer.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Pathway Tabs (e.g., B.Tech Path vs Diploma DSE vs BCA/MCA) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Available Pathways ({careerRoadmaps.length} Options)
            </h2>
            <span className="text-xs text-slate-500">Click a pathway tab below to view full timeline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {careerRoadmaps.map((r, idx) => {
              const isActive = activePathwayIndex === idx;
              return (
                <button
                  key={r.id}
                  onClick={() => setActivePathwayIndex(idx)}
                  className={`p-4 rounded-2xl text-left border transition ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Pathway #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {r.steps.length} Steps
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{r.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pathway Detailed Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {activeRoadmap.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeRoadmap.description}</p>
          </div>

          {/* Vertical Timeline with visual connectors */}
          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-400 before:to-indigo-600">
            {activeRoadmap.steps.map((step, idx) => {
              const isLast = idx === activeRoadmap.steps.length - 1;
              const isFirst = idx === 0;

              return (
                <div key={step.id} className="relative group">
                  {/* Timeline bullet node */}
                  <div
                    className={`absolute -left-6 sm:-left-10 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 shadow-xs transition-transform group-hover:scale-110 ${
                      isLast
                        ? 'bg-emerald-600 text-white border-white ring-4 ring-emerald-100'
                        : isFirst
                        ? 'bg-teal-500 text-white border-white ring-2 ring-teal-100'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`p-5 rounded-2xl border transition ${
                      isLast
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-lg'
                        : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            isLast ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          Stage {idx + 1}
                        </span>
                        <h4
                          className={`font-extrabold text-base sm:text-lg ${
                            isLast ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>

                      {step.duration && (
                        <div
                          className={`inline-flex items-center gap-1 text-xs font-semibold self-start sm:self-auto ${
                            isLast ? 'text-emerald-100' : 'text-slate-500'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{step.duration}</span>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                        isLast ? 'text-emerald-50' : 'text-slate-600'
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Requirements */}
                    {step.requirements && step.requirements.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold ${
                            isLast ? 'text-emerald-100' : 'text-slate-500'
                          }`}
                        >
                          Prerequisites:
                        </span>
                        {step.requirements.map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                              isLast
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
                    {step.tips && step.tips.length > 0 && (
                      <div
                        className={`mt-3 p-3 rounded-xl text-xs space-y-1 ${
                          isLast
                            ? 'bg-black/15 text-emerald-100 border border-white/10'
                            : 'bg-emerald-50/70 text-emerald-900 border border-emerald-200/60'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          <span>💡 Pro-Tips for Rural & First-Gen Students:</span>
                        </div>
                        {step.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="font-medium pl-2">
                            • {tip}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
