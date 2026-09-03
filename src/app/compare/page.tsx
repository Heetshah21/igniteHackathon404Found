'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getComparisons } from '@/lib/data/comparisons';
import { ComparisonData } from '@/types';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
import {
  GitCompare,
  Sparkles,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Target,
  MapPin,
  GraduationCap,
  AlertCircle,
  Loader2,
  HelpCircle,
  Check,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

// Rural-friendly label mapping for common comparison categories
const friendlyLabels: Record<string, string> = {
  'Main Focus': 'What you\'ll mainly do',
  'Mathematics': 'How much Maths you\'ll use',
  'Programming': 'How much coding is needed',
  'Statistics': 'Statistics & number work',
  'Key Tools': 'Software tools you\'ll learn',
  'Typical Roles': 'Jobs you can get',
  'Average Salary': 'How much you can earn',
  'Starting Salary': 'First job salary (approx)',
  'Difficulty': 'How hard is it',
  'Best For': 'Best suited for students who...',
  'Duration': 'How long it takes',
  'Eligibility': 'Who can apply',
  'Depth': 'How deep the study goes',
  'Placement': 'Job placement after studying',
  'Higher Studies': 'What you can study next',
  'Cost': 'Approximate cost / fees',
  'Key Skills': 'Most important skills',
  'Job Availability': 'How easy to find a job',
  'Work Style': 'What daily work looks like',
  'Entry Level': 'How easy to start',
  'Job Security': 'Is the job stable',
  'Salary Growth': 'How fast salary grows',
  'Preparation Time': 'How long to prepare',
  'Work Authority': 'Decision-making power',
  'Benefits': 'Extra benefits you get',
  'Career Flexibility': 'Can you switch careers later',
  'Social Impact': 'How you help society',
  'Entrance Exam': 'Which exam to give',
  'Study Stream': 'Which stream is needed',
  'Average Cost': 'Approximate yearly cost',
  'Job Variety': 'Types of jobs available',
  'Work-Life Balance': 'Free time after work',
};

export default function ComparePage() {
  const { profile, language } = useStudent();
  const t = translations[language];

  const [dbComparisons, setDbComparisons] = useState<ComparisonData[]>([]);
  const [activeComparisonId, setActiveComparisonId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    getComparisons()
      .then((data) => {
        setDbComparisons(data);
        if (data && data.length > 0) {
          setActiveComparisonId(data[0].id);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load comparisons:', err);
        setLoadError(true);
        setIsLoading(false);
      });
  }, []);

  const activeComparison = useMemo(() => {
    if (dbComparisons.length === 0) return null;
    return (
      dbComparisons.find((c) => c.id === activeComparisonId) ||
      dbComparisons[0]
    );
  }, [dbComparisons, activeComparisonId]);

  // Quiz state: stores { questionIndex: 'a' | 'b' }
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'a' | 'b'>>({});

  const handleAnswer = (qIndex: number, choice: 'a' | 'b') => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: choice }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
  };

  // Compute scoring with personalized recommendation & neutral choice reasons
  const scores = useMemo(() => {
    let scoreA = 0;
    let scoreB = 0;
    const quizList = activeComparison?.quiz ?? [];
    const reasonsA: string[] = [];
    const reasonsB: string[] = [];

    quizList.forEach((q, idx) => {
      const ans = quizAnswers[idx];
      if (ans === 'a') {
        scoreA += q?.option_a_points ?? 1;
        if (q?.option_a_reason) reasonsA.push(q.option_a_reason);
      } else if (ans === 'b') {
        scoreB += q?.option_b_points ?? 1;
        if (q?.option_b_reason) reasonsB.push(q.option_b_reason);
      }
    });

    const totalAnswered = Object.keys(quizAnswers).length;
    const isCompleted = quizList.length > 0 && totalAnswered === quizList.length;

    let recommendation = '';
    let winner: 'a' | 'b' | 'tie' = 'tie';
    let winnerName = '';
    let matchedReasons: string[] = [];
    let personalNote = '';

    if (isCompleted && activeComparison) {
      if (scoreA > scoreB) {
        winner = 'a';
        winnerName = activeComparison.option_a;
        recommendation = `Based on your interests, ${activeComparison.option_a} appears to be a stronger match for you.`;
        matchedReasons = reasonsA.slice(0, 3);
      } else if (scoreB > scoreA) {
        winner = 'b';
        winnerName = activeComparison.option_b;
        recommendation = `Based on your interests, ${activeComparison.option_b} appears to be a stronger match for you.`;
        matchedReasons = reasonsB.slice(0, 3);
      } else {
        winner = 'tie';
        recommendation = `You have balanced interests matching both ${activeComparison.option_a} and ${activeComparison.option_b}. Explore both options before deciding!`;
        matchedReasons = [
          `You showed strong interest in ${activeComparison.option_a} concepts (${scoreA} pts)`,
          `You also showed strong interest in ${activeComparison.option_b} concepts (${scoreB} pts)`,
        ];
      }

      // Build personalized profile alignment notes
      const profileNotes: string[] = [];
      if (profile?.career_goal && winnerName) {
        const goalLower = (profile.career_goal || '').toLowerCase();
        const winnerLower = (winnerName || '').toLowerCase();
        if (
          (winnerLower.includes('engineer') && goalLower.includes('engineer')) ||
          (winnerLower.includes('data') && goalLower.includes('data')) ||
          (winnerLower.includes('ai') && goalLower.includes('ai')) ||
          (winnerLower.includes('medical') && (goalLower.includes('doctor') || goalLower.includes('medical'))) ||
          (winnerLower.includes('government') && (goalLower.includes('government') || goalLower.includes('upsc') || goalLower.includes('civil'))) ||
          (winnerLower.includes('b.tech') && (goalLower.includes('engineer') || goalLower.includes('software'))) ||
          (winnerLower.includes('software') && goalLower.includes('software'))
        ) {
          profileNotes.push(`This also aligns directly with your "${profile.career_goal}" career goal.`);
        }
      }

      if (profile?.branch) {
        profileNotes.push(`Your current ${profile.branch.toUpperCase()} stream background also keeps this pathway open.`);
      }

      if (profileNotes.length > 0) {
        personalNote = profileNotes.join(' ');
      }
    }

    return {
      scoreA,
      scoreB,
      isCompleted,
      recommendation,
      totalAnswered,
      winner,
      winnerName,
      matchedReasons,
      personalNote,
    };
  }, [activeComparison, quizAnswers, profile]);

  // TTS speech for comparison table
  const comparisonSpeech = useMemo(() => {
    if (!activeComparison) return { en: '', hi: '' };
    return {
      en: `Comparison between ${activeComparison.option_a} and ${activeComparison.option_b}. ${(activeComparison.categories ?? [])
        .map((c) => `${c.label}: ${activeComparison.option_a} is ${c.option_a_value}, while ${activeComparison.option_b} is ${c.option_b_value}`)
        .join('. ')}`,
      hi: `${activeComparison.option_a} और ${activeComparison.option_b} के बीच तुलना। ${(activeComparison.categories ?? [])
        .map((c) => `${c.label}: ${activeComparison.option_a} में ${c.option_a_value}, जबकि ${activeComparison.option_b} में ${c.option_b_value}`)
        .join('। ')}`,
    };
  }, [activeComparison]);

  // TTS speech for quiz result
  const resultSpeech = useMemo(() => {
    if (!scores.isCompleted || !activeComparison) return { en: '', hi: '' };
    const reasonsPart = scores.matchedReasons.length > 0 ? ` Reasons: ${scores.matchedReasons.join('. ')}.` : '';
    const personalPart = scores.personalNote ? ` ${scores.personalNote}` : '';
    return {
      en: `Quiz result: ${scores.recommendation}.${reasonsPart}${personalPart} Score for ${activeComparison.option_a} was ${scores.scoreA} points, and score for ${activeComparison.option_b} was ${scores.scoreB} points.`,
      hi: `क्विज़ परिणाम: ${scores.recommendation}। ${reasonsPart}${personalPart} ${activeComparison.option_a} के लिए ${scores.scoreA} अंक, और ${activeComparison.option_b} के लिए ${scores.scoreB} अंक मिले।`,
    };
  }, [scores, activeComparison]);

  // Profile context for display
  const hasProfileContext = !!(profile?.career_goal || profile?.branch || profile?.education_level || profile?.location);

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 text-[#0F1B3D] shadow-[var(--shadow-card)] border border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>{t.compare.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F1B3D]">
              {t.compare.title}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              {t.compare.subtitle}
            </p>
          </div>
        </div>

        {/* Personalized Profile Context Bar */}
        {hasProfileContext && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-extrabold text-[#2563EB] text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.common.basedOnProfile}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700 font-medium">
              {profile?.career_goal && (
                <span className="px-2 py-0.5 bg-white rounded-md border border-blue-100 font-bold flex items-center gap-1">
                  <Target className="w-3 h-3 text-[#1769FF]" />
                  Goal: {profile.career_goal}
                </span>
              )}
              {profile?.education_level && (
                <span className="px-2 py-0.5 bg-white rounded-md border border-blue-100 font-bold flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-[#1769FF]" />
                  {profile.education_level} {profile.branch ? `(${profile.branch.toUpperCase()})` : ''}
                </span>
              )}
              {profile?.location && (
                <span className="px-2 py-0.5 bg-white rounded-md border border-blue-100 font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#1769FF]" />
                  {profile.location}, {profile.state || 'India'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Comparison Selector Chips */}
        {dbComparisons.length > 0 && (
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.compare.selectPairLabel}
            </label>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {dbComparisons.map((cmp) => {
                const isSelected = activeComparisonId === cmp.id;
                return (
                  <button
                    key={cmp.id}
                    onClick={() => {
                      setActiveComparisonId(cmp.id);
                      setQuizAnswers({});
                    }}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span>⚖️</span>
                    <span>
                      {cmp.option_a} <span className={isSelected ? 'text-blue-200' : 'text-purple-400'}>vs</span> {cmp.option_b}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#1769FF] mx-auto animate-spin" />
            <p className="text-slate-500 font-medium text-sm">{t.common.loading}</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && loadError && (
          <div className="py-16 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-bold text-slate-900">{t.common.error}</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              {t.common.tryRemovingFilter}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !loadError && dbComparisons.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <GitCompare className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-900">{t.common.noResults}</h3>
          </div>
        )}

        {activeComparison && (
          <>
            {/* Head-to-Head Comparison Table */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-[var(--shadow-card)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {t.compare.sideBySide}
                    </h2>
                    <AudioButton
                      id={`cmp-speech-${activeComparison.id}`}
                      text={comparisonSpeech}
                      label={t.compare.listenToComparison}
                      variant="secondary"
                      size="xs"
                      ariaLabel={`Listen to comparison between ${activeComparison.option_a} and ${activeComparison.option_b}`}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.compare.subAnalysis}
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

              <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                <table className="w-full text-left text-xs sm:text-sm min-w-[420px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                      <th className="py-3 px-3 sm:px-4 w-1/3">{t.compare.comparingMetric}</th>
                      <th className="py-3 px-3 sm:px-4 text-purple-700 w-1/3 bg-purple-50/40 rounded-t-xl font-extrabold">
                        {activeComparison.option_a}
                      </th>
                      <th className="py-3 px-3 sm:px-4 text-indigo-700 w-1/3 bg-indigo-50/40 rounded-t-xl font-extrabold">
                        {activeComparison.option_b}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(activeComparison.categories ?? []).map((cat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-3 sm:px-4 font-bold text-slate-800">
                          <div>
                            <span>{cat.label}</span>
                            {friendlyLabels[cat.label] && friendlyLabels[cat.label] !== cat.label && (
                              <span className="block text-[10px] font-medium text-slate-400 mt-0.5">
                                {friendlyLabels[cat.label]}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-slate-700 font-medium bg-purple-50/20">
                          {cat.option_a_value}
                        </td>
                        <td className="py-3 px-3 sm:px-4 text-slate-700 font-medium bg-indigo-50/20">
                          {cat.option_b_value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Redesigned Interactive Fit Quiz: "Which path is better for me?" */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 text-[#0F1B3D] shadow-[var(--shadow-card)] border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{t.compare.quizBadge}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F1B3D]">
                    {t.compare.quizTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {t.compare.quizSubtitle}
                  </p>
                </div>

                {Object.keys(quizAnswers).length > 0 && (
                  <button
                    onClick={handleResetQuiz}
                    className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-semibold border border-[#E6EBF5] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.compare.resetQuiz}</span>
                  </button>
                )}
              </div>

              {/* Progress Bar & Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">
                    {t.compare.progress}: {scores.totalAnswered} {t.compare.of} {(activeComparison.quiz ?? []).length} {t.compare.answered}
                  </span>
                  <span className="text-[#2563EB]">
                    {Math.round((scores.totalAnswered / Math.max(1, (activeComparison.quiz ?? []).length)) * 100)}% {t.compare.complete}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/60">
                  <div
                    className="bg-gradient-to-r from-[#2563EB] to-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${(scores.totalAnswered / Math.max(1, (activeComparison.quiz ?? []).length)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Quiz Questions List */}
              <div className="space-y-4">
                {(activeComparison.quiz ?? []).map((q, idx) => {
                  const currentAns = quizAnswers[idx];
                  const optAText = q.option_a_text || `Prefer ${activeComparison.option_a}`;
                  const optBText = q.option_b_text || `Prefer ${activeComparison.option_b}`;

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        currentAns
                          ? 'bg-white border-blue-200 shadow-xs'
                          : 'bg-slate-50/70 border-[#E6EBF5] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769FF]">
                          Question #{idx + 1} {t.compare.of} {(activeComparison.quiz ?? []).length}
                        </span>
                        {currentAns && (
                          <span className="text-[10px] font-bold text-[#0B7A48] bg-[#DDF7EA] px-2 py-0.5 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {t.compare.selected}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-[#101D35] mb-3">
                        {q.question}
                      </h3>

                      {/* Neutral Choice Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Option A */}
                        <button
                          type="button"
                          onClick={() => handleAnswer(idx, 'a')}
                          className={`p-4 rounded-xl text-left text-xs sm:text-sm transition-all flex items-start gap-3 border cursor-pointer ${
                            currentAns === 'a'
                              ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/20 text-[#0F1B3D] font-semibold shadow-xs'
                              : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              currentAns === 'a'
                                ? 'border-[#2563EB] bg-[#2563EB] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {currentAns === 'a' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-relaxed">{optAText}</span>
                        </button>

                        {/* Option B */}
                        <button
                          type="button"
                          onClick={() => handleAnswer(idx, 'b')}
                          className={`p-4 rounded-xl text-left text-xs sm:text-sm transition-all flex items-start gap-3 border cursor-pointer ${
                            currentAns === 'b'
                              ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/20 text-[#0F1B3D] font-semibold shadow-xs'
                              : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              currentAns === 'b'
                                ? 'border-[#2563EB] bg-[#2563EB] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {currentAns === 'b' && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-relaxed">{optBText}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Score & Recommendation Result Section */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-[#E6EBF5] space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t.compare.scoresTitle}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="text-[#1769FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {activeComparison.option_a}: {scores.scoreA} pts
                    </span>
                    <span className="text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                      {activeComparison.option_b}: {scores.scoreB} pts
                    </span>
                  </div>
                </div>

                {scores.isCompleted ? (
                  <div className="space-y-4 animate-in zoom-in-95 duration-200">
                    {/* Main Recommendation Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-teal-50/60 border border-emerald-300 text-slate-800 space-y-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🏆</span>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#0B7A48] block">
                              {t.compare.basedOnAnswers}
                            </span>
                            <h3 className="font-black text-lg sm:text-xl text-[#101D35]">
                              {scores.winner === 'tie'
                                ? `${t.compare.balancedMatch} ${activeComparison.option_a} & ${activeComparison.option_b}`
                                : `${t.compare.recommended} ${scores.winnerName}`}
                            </h3>
                          </div>
                        </div>

                        <AudioButton
                          id={`quiz-recommendation-${activeComparison.id}`}
                          text={resultSpeech}
                          label={t.compare.listenToRecommendation}
                          variant="badge"
                          size="xs"
                          className="bg-emerald-100 hover:bg-emerald-200 text-[#0B7A48] border-emerald-300 font-bold"
                          ariaLabel="Listen to quiz recommendation result"
                        />
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-700">
                        {scores.recommendation}
                      </p>

                      {/* Why this matches you (from actual chosen answers) */}
                      {scores.matchedReasons.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-200/80 space-y-2">
                          <div className="font-extrabold text-[#0B7A48] text-xs flex items-center gap-1.5 uppercase tracking-wide">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t.compare.whySuitYou}</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {scores.matchedReasons.map((reason, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B7A48] shrink-0 mt-0.5" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Personalized Profile Context Note */}
                      {scores.personalNote && (
                        <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-200 text-xs font-medium text-emerald-950 flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold text-emerald-900 block mb-0.5">
                              {t.compare.consideringProfile}
                            </strong>
                            <span>{scores.personalNote}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center space-y-1">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      {t.compare.answerAllHint}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      ({(activeComparison.quiz ?? []).length - scores.totalAnswered} {t.compare.questionsLeft})
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

