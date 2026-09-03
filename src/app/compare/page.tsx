'use client';

import React, { useState, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { comparisons } from '@/data/comparisons';
import { translations } from '@/lib/translations';
import {
  GitCompare,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function ComparePage() {
  const { language } = useStudent();
  const t = translations[language];

  const [activeComparisonId, setActiveComparisonId] = useState<string>(comparisons[0].id);
  const activeComparison = useMemo(() => {
    return comparisons.find((c) => c.id === activeComparisonId) || comparisons[0];
  }, [activeComparisonId]);

  // Quiz state: stores { questionIndex: 'a' | 'b' }
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'a' | 'b'>>({});

  const handleAnswer = (qIndex: number, choice: 'a' | 'b') => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: choice }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
  };

  // Compute scoring
  const scores = useMemo(() => {
    let scoreA = 0;
    let scoreB = 0;

    activeComparison.quiz.forEach((q, idx) => {
      const ans = quizAnswers[idx];
      if (ans === 'a') {
        scoreA += q.option_a_points;
      } else if (ans === 'b') {
        scoreB += q.option_b_points;
      }
    });

    const totalAnswered = Object.keys(quizAnswers).length;
    const isCompleted = totalAnswered === activeComparison.quiz.length;

    let recommendation = '';
    if (isCompleted) {
      if (scoreA > scoreB) {
        recommendation = `${activeComparison.option_a} is strongly recommended for your preferences!`;
      } else if (scoreB > scoreA) {
        recommendation = `${activeComparison.option_b} is strongly recommended for your preferences!`;
      } else {
        recommendation = `Both ${activeComparison.option_a} and ${activeComparison.option_b} are great balanced fits for you!`;
      }
    }

    return { scoreA, scoreB, isCompleted, recommendation, totalAnswered };
  }, [activeComparison, quizAnswers]);

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-purple-500/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Feature 5 • Career & Stream Head-to-Head Comparison</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Compare Education Streams & Careers
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Confused between two paths? Compare pros, cons, salary ranges, mathematics requirements, and take the deterministic &quot;Which is better for you?&quot; quiz.
            </p>
          </div>
        </div>

        {/* Comparison Selector Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Pair to Compare:
          </label>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {comparisons.map((cmp) => {
              const isSelected = activeComparisonId === cmp.id;
              return (
                <button
                  key={cmp.id}
                  onClick={() => {
                    setActiveComparisonId(cmp.id);
                    setQuizAnswers({});
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border shrink-0 ${
                    isSelected
                      ? 'bg-purple-700 text-white border-purple-600 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>⚖️</span>
                  <span>
                    {cmp.option_a} <span className="text-purple-300 font-normal">vs</span> {cmp.option_b}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Head-to-Head Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Detailed Parameter Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Side-by-side analysis of key attributes and industry requirements
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                {activeComparison.option_a}
              </span>
              <span className="text-xs font-bold text-slate-400">VS</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                {activeComparison.option_b}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                  <th className="py-3 px-4 w-1/3">Metric / Category</th>
                  <th className="py-3 px-4 text-purple-700 w-1/3 bg-purple-50/40 rounded-t-xl font-extrabold">
                    {activeComparison.option_a}
                  </th>
                  <th className="py-3 px-4 text-indigo-700 w-1/3 bg-indigo-50/40 rounded-t-xl font-extrabold">
                    {activeComparison.option_b}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeComparison.categories.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {cat.label}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium bg-purple-50/20">
                      {cat.option_a_value}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium bg-indigo-50/20">
                      {cat.option_b_value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Fit Quiz: "Which is better for you?" */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Deterministic Scoring Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Which is better for you?
              </h2>
              <p className="text-xs text-slate-300">
                Answer these 6 quick questions to discover which path aligns best with your strengths and interests.
              </p>
            </div>

            {Object.keys(quizAnswers).length > 0 && (
              <button
                onClick={handleResetQuiz}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 font-semibold border border-white/20 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Quiz</span>
              </button>
            )}
          </div>

          {/* Quiz Questions */}
          <div className="space-y-4">
            {activeComparison.quiz.map((q, idx) => {
              const currentAns = quizAnswers[idx];
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">
                      Question #{idx + 1}
                    </span>
                    {currentAns && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Answered
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => handleAnswer(idx, 'a')}
                      className={`p-3 rounded-xl text-left text-xs font-bold border transition ${
                        currentAns === 'a'
                          ? 'bg-purple-600 text-white border-purple-400 shadow-md ring-2 ring-purple-400/40'
                          : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      👍 Prefer {activeComparison.option_a}
                    </button>
                    <button
                      onClick={() => handleAnswer(idx, 'b')}
                      className={`p-3 rounded-xl text-left text-xs font-bold border transition ${
                        currentAns === 'b'
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-400/40'
                          : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/20'
                      }`}
                    >
                      👍 Prefer {activeComparison.option_b}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score Result Box */}
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Fit Score Result ({scores.totalAnswered} / {activeComparison.quiz.length} Answered)
              </span>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-purple-300">
                  {activeComparison.option_a}: {scores.scoreA} pts
                </span>
                <span className="text-indigo-300">
                  {activeComparison.option_b}: {scores.scoreB} pts
                </span>
              </div>
            </div>

            {scores.isCompleted ? (
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-600/90 to-teal-700/90 border border-emerald-400 text-white space-y-2 animate-in zoom-in-95">
                <div className="flex items-center gap-2 font-extrabold text-base">
                  <Trophy className="w-5 h-5 text-amber-300 animate-bounce" />
                  <span>Recommendation Result:</span>
                </div>
                <p className="text-sm font-semibold text-emerald-100">
                  {scores.recommendation}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Answer all {activeComparison.quiz.length} questions above to unlock your personalized recommendation result.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
