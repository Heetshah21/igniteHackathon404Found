'use client';

import React, { useState, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { comparisons } from '@/data/comparisons';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
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
        <div className="rounded-3xl bg-white p-6 sm:p-8 text-[#101D35] shadow-xs border border-[#E6EBF5]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Feature 5 • Career & Stream Head-to-Head Comparison</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101D35]">
              Compare Education Streams & Careers
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
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
                      ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-sm'
                      : 'bg-white text-slate-700 border-[#E6EBF5] hover:bg-slate-50 hover:border-slate-300'
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Detailed Parameter Comparison
                </h2>
                <AudioButton
                  id={`cmp-speech-${activeComparison.id}`}
                  text={{
                    en: `Comparison between ${activeComparison.option_a} and ${activeComparison.option_b}. ${activeComparison.categories
                      .map((c) => `${c.label}: ${activeComparison.option_a} is ${c.option_a_value}, while ${activeComparison.option_b} is ${c.option_b_value}`)
                      .join('. ')}`,
                    hi: `${activeComparison.option_a} और ${activeComparison.option_b} के बीच तुलना। ${activeComparison.categories
                      .map((c) => `${c.label}: ${activeComparison.option_a} में ${c.option_a_value}, जबकि ${activeComparison.option_b} में ${c.option_b_value}`)
                      .join('। ')}`,
                  }}
                  label="Listen to Comparison"
                  variant="secondary"
                  size="xs"
                  ariaLabel={`Listen to comparison between ${activeComparison.option_a} and ${activeComparison.option_b}`}
                />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-[#101D35] shadow-xs border border-[#E6EBF5] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6EBF5] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] border border-[#CCE0FF] text-[#1769FF] text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#1769FF]" />
                <span>Deterministic Scoring Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#101D35]">
                Which is better for you?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Answer these 6 quick questions to discover which path aligns best with your strengths and interests.
              </p>
            </div>

            {Object.keys(quizAnswers).length > 0 && (
              <button
                onClick={handleResetQuiz}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-semibold border border-[#E6EBF5] transition cursor-pointer"
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
                  className="p-4 rounded-2xl bg-slate-50 border border-[#E6EBF5] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1769FF]">
                      Question #{idx + 1}
                    </span>
                    {currentAns && (
                      <span className="text-[10px] font-bold text-[#0B7A48] bg-[#DDF7EA] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Answered
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-bold text-[#101D35]">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => handleAnswer(idx, 'a')}
                      className={`p-3 rounded-xl text-left text-xs font-bold border transition cursor-pointer ${
                        currentAns === 'a'
                          ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-xs'
                          : 'bg-white text-slate-700 border-[#E6EBF5] hover:bg-slate-100'
                      }`}
                    >
                      👍 Prefer {activeComparison.option_a}
                    </button>
                    <button
                      onClick={() => handleAnswer(idx, 'b')}
                      className={`p-3 rounded-xl text-left text-xs font-bold border transition cursor-pointer ${
                        currentAns === 'b'
                          ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-xs'
                          : 'bg-white text-slate-700 border-[#E6EBF5] hover:bg-slate-100'
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
          <div className="p-6 rounded-2xl bg-slate-50 border border-[#E6EBF5] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Fit Score Result ({scores.totalAnswered} / {activeComparison.quiz.length} Answered)
              </span>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-[#1769FF]">
                  {activeComparison.option_a}: {scores.scoreA} pts
                </span>
                <span className="text-purple-600">
                  {activeComparison.option_b}: {scores.scoreB} pts
                </span>
              </div>
            </div>

            {scores.isCompleted ? (
              <div className="p-4 rounded-xl bg-[#DDF7EA] border border-emerald-300 text-[#0B7A48] space-y-2 animate-in zoom-in-95">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 font-black text-base">
                    <Trophy className="w-5 h-5 text-emerald-700" />
                    <span>Recommendation Result:</span>
                  </div>
                  <AudioButton
                    id={`quiz-recommendation-${activeComparison.id}`}
                    text={{
                      en: `Fit Quiz result: ${scores.recommendation}. Score for ${activeComparison.option_a} was ${scores.scoreA} points, and score for ${activeComparison.option_b} was ${scores.scoreB} points.`,
                      hi: `फिटनेस क्विज़ परिणाम: ${scores.recommendation}। ${activeComparison.option_a} के लिए ${scores.scoreA} अंक, और ${activeComparison.option_b} के लिए ${scores.scoreB} अंक मिले।`,
                    }}
                    label="Listen"
                    variant="badge"
                    size="xs"
                    className="bg-emerald-100 hover:bg-emerald-200 text-[#0B7A48] border-emerald-300"
                    ariaLabel="Listen to quiz recommendation result"
                  />
                </div>
                <p className="text-sm font-bold text-[#0B7A48]">
                  {scores.recommendation}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Answer all {activeComparison.quiz.length} questions above to unlock your personalized recommendation result.
              </p>
            )}
          </div>
        </div>
      </div>

    </AppLayout>
  );
}
