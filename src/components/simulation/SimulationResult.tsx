'use client';

import React from 'react';
import Link from 'next/link';
import { SimulationEvaluationResult } from '@/types/simulation';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Clock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface SimulationResultProps {
  evaluation: SimulationEvaluationResult;
  onReset: () => void;
}

export const SimulationResult: React.FC<SimulationResultProps> = ({ evaluation, onReset }) => {
  const { actionTaken } = evaluation;

  return (
    <div className="relative min-h-[90vh] max-w-4xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-700 text-xs font-extrabold shadow-xs">
          <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>Simulation Complete 🎉</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How You Handled the <span className="text-blue-600">{evaluation.careerTitle}</span> Role
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
          Here&apos;s what your decisions and investigation workflow reveal about how you approach real-world professional situations.
        </p>
      </div>

      {/* Realistic Outcome & Consequence Card */}
      {actionTaken && (
        <div
          className={`p-6 rounded-3xl border backdrop-blur-xl shadow-lg space-y-3 ${
            actionTaken.outcomeQuality === 'optimal'
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              : actionTaken.outcomeQuality === 'suboptimal'
              ? 'bg-amber-50/90 border-amber-200 text-amber-950'
              : 'bg-rose-50/90 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              Selected Action Outcome
            </span>
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                actionTaken.outcomeQuality === 'optimal'
                  ? 'bg-emerald-200 text-emerald-900 border-emerald-400'
                  : actionTaken.outcomeQuality === 'suboptimal'
                  ? 'bg-amber-200 text-amber-900 border-amber-400'
                  : 'bg-rose-200 text-rose-900 border-rose-400'
              }`}
            >
              {actionTaken.outcomeQuality === 'optimal'
                ? 'Optimal Solution 🎉'
                : actionTaken.outcomeQuality === 'suboptimal'
                ? 'Suboptimal Trade-off ⚠️'
                : 'Reactionary Measures ❌'}
            </span>
          </div>

          <h2 className="text-xl font-black">{actionTaken.consequenceTitle}</h2>
          <p className="text-xs sm:text-sm leading-relaxed">{actionTaken.consequenceText}</p>

          <div className="pt-2 border-t border-black/10 text-xs font-semibold flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Key Takeaway: {actionTaken.keyTakeaway}</span>
          </div>
        </div>
      )}

      {/* Main Career Fit Insights Card */}
      <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-blue-500/5 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Career Fit Insights</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              These insights are based on your decisions, evidence inspection, and reasoning during the simulation.
            </p>
          </div>
          <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Time Taken: {evaluation.completionTimeFormatted}</span>
          </div>
        </div>

        {/* Skill Percentage Bars Grid */}
        <div className="space-y-4">
          {(evaluation?.skillInsights ?? []).map((skill, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <span>{skill?.name}</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    — {skill?.description}
                  </span>
                </span>
                <span className="text-blue-700 font-black text-sm">{skill?.score ?? 0}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-xs"
                  style={{ width: `${skill?.score ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Areas to Develop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Your Strengths */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Your Strengths</span>
          </h3>
          <ul className="space-y-2 text-xs text-emerald-950">
            {(evaluation?.strengths ?? []).map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Develop */}
        <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-200/80 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-blue-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Areas to Develop</span>
          </h3>
          <ul className="space-y-2 text-xs text-blue-950">
            {(evaluation?.areasToDevelop ?? []).map((area, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">→</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* What This Means Narrative Card */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-md space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">What This Means</h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {evaluation.whatThisMeans}
        </p>
      </div>

      {/* Bottom CTA Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Retry This Simulation</span>
        </button>

        <Link
          href="/simulator"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Try Another Career Simulation</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
