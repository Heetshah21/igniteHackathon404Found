'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getScholarships } from '@/lib/data/scholarships';
import { Scholarship } from '@/types';
import { matchScholarships } from '@/lib/recommendations/matcher';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
import { getScholarshipSpeech } from '@/lib/speech/hindiContent';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Sparkles,
  Calendar,
  Building,
  AlertCircle,
} from 'lucide-react';

const glassCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.13)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
};

export default function ScholarshipsPage() {
  const { profile, language } = useStudent();
  const t = translations[language];

  const [dbScholarships, setDbScholarships] = useState<Scholarship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<string>('all');
  const [filterEducation, setFilterEducation] = useState<string>('all');
  const [showOnlyEligible, setShowOnlyEligible] = useState(false);

  useEffect(() => {
    getScholarships().then(setDbScholarships);
  }, []);

  const evaluatedScholarships = useMemo(() => {
    return matchScholarships(dbScholarships, profile || {});
  }, [dbScholarships, profile]);

  const filteredList = useMemo(() => {
    return evaluatedScholarships.filter(({ item, eligibilityResult }) => {
      if (!item) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(term) ?? false;
        const matchesProvider = item.provider?.toLowerCase().includes(term) ?? false;
        const matchesTags = (item.tags ?? []).some((t) => t?.toLowerCase().includes(term));
        if (!matchesName && !matchesProvider && !matchesTags) return false;
      }
      if (filterState !== 'all') {
        if (item.states && item.states.length > 0 && !item.states.includes(filterState)) return false;
      }
      if (filterEducation !== 'all') {
        if (item.education_levels && item.education_levels.length > 0 && !item.education_levels.includes(filterEducation)) return false;
      }
      if (showOnlyEligible && (!eligibilityResult || !eligibilityResult.eligible)) return false;
      return true;
    });
  }, [evaluatedScholarships, searchTerm, filterState, filterEducation, showOnlyEligible]);

  const eligibleCount = evaluatedScholarships.filter((s) => s.eligibilityResult?.eligible).length;

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.14)',
    color: 'white',
  };

  return (
    <AppLayout>
      {/* Ambient orb */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="glow-orb w-80 h-80 top-0 right-1/4" style={{ background: '#FCD34D', opacity: 0.06 }} />
      </div>

      <div className="relative z-10 space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-2xl p-6 sm:p-8" style={glassCard}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(252,211,77,0.15)', border: '1px solid rgba(252,211,77,0.35)', color: '#FCD34D' }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t.scholarships.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.scholarships.title}
              </h1>
              <p className="text-white/55 text-xs sm:text-sm max-w-2xl">
                {t.scholarships.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div
                className="px-4 py-3 rounded-2xl text-center"
                style={{
                  background: 'rgba(252,211,77,0.15)',
                  border: '1px solid rgba(252,211,77,0.35)',
                  boxShadow: '0 0 20px rgba(252,211,77,0.10)',
                }}
              >
                <span className="text-2xl font-black" style={{ color: '#FCD34D' }}>{eligibleCount}</span>
                <span className="block text-[11px] font-bold uppercase" style={{ color: 'rgba(252,211,77,0.70)' }}>
                  {t.scholarships.eligibleBadge}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="rounded-2xl p-4 sm:p-5 space-y-4" style={glassCard}>
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.scholarships.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm placeholder-white/30 focus:outline-none transition"
                style={inputStyle}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'rgba(252,211,77,0.50)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(252,211,77,0.12)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Dropdowns */}
            <div className="flex gap-2">
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none transition"
                style={inputStyle}
              >
                <option value="all">{t.scholarships.allStates}</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>

              <select
                value={filterEducation}
                onChange={(e) => setFilterEducation(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none transition"
                style={inputStyle}
              >
                <option value="all">{t.scholarships.allLevels}</option>
                <option value="10th">10th Standard</option>
                <option value="12th">12th Standard</option>
                <option value="diploma">Diploma</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <label className="flex items-center gap-2 font-semibold text-white/70 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={showOnlyEligible}
                onChange={(e) => setShowOnlyEligible(e.target.checked)}
                className="rounded w-4 h-4"
                style={{ accentColor: 'var(--lime-green)' }}
              />
              <span>{t.scholarships.onlyEligible}</span>
            </label>
            <span className="text-xs text-white/40 font-medium">
              Showing {filteredList.length} of {dbScholarships.length}
            </span>
          </div>
        </div>

        {/* Scholarships List */}
        <div className="space-y-4">
          {filteredList.map(({ item: sch, eligibilityResult }) => {
            const isEligible = !!eligibilityResult?.eligible;
            const matchedRules = eligibilityResult?.matchedRules || [];
            const failedRules = eligibilityResult?.failedRules || [];

            return (
              <div
                key={sch.id}
                className="rounded-3xl p-6 space-y-4 transition"
                style={{
                  background: isEligible ? 'rgba(163,230,53,0.06)' : 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isEligible ? '1px solid rgba(163,230,53,0.30)' : '1px solid rgba(255,255,255,0.11)',
                  boxShadow: isEligible
                    ? '0 8px 32px rgba(0,0,0,0.25), 0 0 20px rgba(163,230,53,0.08)'
                    : '0 4px 16px rgba(0,0,0,0.20)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-black uppercase px-2.5 py-1 rounded-md"
                        style={{ background: 'rgba(252,211,77,0.15)', color: '#FCD34D', border: '1px solid rgba(252,211,77,0.30)' }}
                      >
                        💰 {sch.amount || 'Financial Assistance'}
                      </span>
                      {isEligible ? (
                        <span
                          className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1"
                          style={{ background: 'rgba(163,230,53,0.18)', color: 'var(--lime-green)', border: '1px solid rgba(163,230,53,0.35)' }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.scholarships.eligibleBadge}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-white/50">
                          Partial Match
                        </span>
                      )}
                      {sch.states && sch.states.length > 0 && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                          style={{ background: 'rgba(129,140,248,0.15)', color: '#A78BFA', border: '1px solid rgba(129,140,248,0.30)' }}>
                          📍 {sch.states.join(', ')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="text-base sm:text-lg font-extrabold text-white">{sch.name}</h3>
                      <AudioButton
                        id={`sch-audio-${sch.id}`}
                        text={getScholarshipSpeech(sch.name, sch.provider, sch.amount, sch.deadline, matchedRules.map((r) => r.label))}
                        label={t.common.listen}
                        variant="secondary"
                        size="xs"
                        ariaLabel={`Listen to scholarship details for ${sch.name}`}
                      />
                    </div>
                    <p className="text-xs text-white/50 font-semibold flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>{t.common.provider}: {sch.provider}</span>
                    </p>
                    <p className="text-xs text-white/55 leading-relaxed mt-1">{sch.description}</p>
                  </div>

                  {/* Apply Button & Deadline */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    {sch.deadline && (
                      <div className="text-[11px] font-semibold text-white/40 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.common.deadline}: {sch.deadline}</span>
                      </div>
                    )}
                    <a
                      href={sch.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 btn-lime transition"
                    >
                      <span>{t.scholarships.applyOnline}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Why You May Qualify Box */}
                <div
                  className="p-4 rounded-2xl space-y-2"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="text-xs font-bold flex items-center justify-between text-white">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: '#FCD34D' }} />
                      <span>{t.scholarships.whyQualify}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-white/40">{t.common.basedOnProfile}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {matchedRules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-2 p-2 rounded-xl font-medium"
                        style={{ background: 'rgba(163,230,53,0.10)', border: '1px solid rgba(163,230,53,0.22)', color: 'rgba(163,230,53,0.90)' }}
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--lime-green)' }} />
                        <span>{rule.label}</span>
                      </div>
                    ))}
                    {failedRules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-2 p-2 rounded-xl font-medium"
                        style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.22)', color: '#FCA5A5' }}
                      >
                        <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{rule.label} ({t.scholarships.missingCriteria})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="text-center py-12 rounded-3xl p-8 space-y-3" style={glassCard}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                <AlertCircle className="w-6 h-6 text-white/40" />
              </div>
              <h3 className="font-bold text-white text-base">{t.scholarships.noScholarshipsFound}</h3>
              <p className="text-xs text-white/45 max-w-md mx-auto">{t.common.tryRemovingFilter}</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
