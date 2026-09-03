'use client';

import React from 'react';
import Link from 'next/link';
import { SimulationScenario } from '@/types/simulation';
import {
  ArrowLeft,
  Clock,
  Code,
  BarChart3,
  Scale,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  BarChart3,
  Scale,
};

interface SimulationIntroProps {
  scenario: SimulationScenario;
  onStart: () => void;
}

export const SimulationIntro: React.FC<SimulationIntroProps> = ({ scenario, onStart }) => {
  const IconComponent = iconMap[scenario.iconName] || Code;

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between max-w-5xl mx-auto py-4 space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <Link
          href="/simulator"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Simulator Hub</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Estimated Time: {scenario.estimatedTime}</span>
        </div>
      </div>

      {/* Main Split Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch my-auto">
        {/* Left Side: Visual Role Badge & Card */}
        <div className="md:col-span-5 flex flex-col justify-center items-center p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50/80 border border-white shadow-xl shadow-blue-500/10 text-center relative overflow-hidden">
          {/* Subtle glowing ring background */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl opacity-20 pointer-events-none"
            style={{ backgroundColor: scenario.themeColor.primary }}
          />

          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-xl mb-6 transform group-hover:scale-105 transition-transform"
            style={{ backgroundColor: scenario.themeColor.primary }}
          >
            <IconComponent className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            {scenario.badge}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mb-2">{scenario.careerTitle}</h2>
          <div className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Active Work Experience</span>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/60 w-full text-left space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Environment:</span>
              <span className="font-semibold text-slate-800">Realistic Workplace</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Interaction:</span>
              <span className="font-semibold text-slate-800">Investigate & Decide</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Outcome:</span>
              <span className="font-semibold text-slate-800">Personalized Skill Fit</span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Scenario Content */}
        <div className="md:col-span-7 flex flex-col justify-between p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl shadow-blue-500/5 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                You’re stepping into the role of a
              </p>
              <h1 className="text-3xl font-extrabold text-slate-900">{scenario.roleTitle}</h1>
            </div>

            {/* Scenario Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Scenario Overview</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
                {scenario.fullOverview}
              </p>
            </div>

            {/* What you'll do */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">What You&apos;ll Do</h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {scenario.whatYouWillDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Observed skills */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills Being Observed</h3>
              <div className="flex flex-wrap gap-2">
                {scenario.skillsObserved.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              Takes ~3–5 mins • Fully interactive
            </div>
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-black text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group cursor-pointer"
              style={{ backgroundColor: scenario.themeColor.primary }}
            >
              <span>Begin Simulation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
