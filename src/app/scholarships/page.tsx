'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getScholarships } from '@/lib/data/scholarships';
import { Scholarship } from '@/types';
import { matchScholarships } from '@/lib/recommendations/matcher';
import { translations } from '@/lib/translations';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Calendar,
  Building,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

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

  // Evaluate all scholarships against current student profile
  const evaluatedScholarships = useMemo(() => {
    return matchScholarships(dbScholarships, profile || {});
  }, [dbScholarships, profile]);

  // Filter list
  const filteredList = useMemo(() => {
    return evaluatedScholarships.filter(({ item, eligibilityResult }) => {
      // Search
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(term);
        const matchesProvider = item.provider.toLowerCase().includes(term);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(term));
        if (!matchesName && !matchesProvider && !matchesTags) return false;
      }

      // State
      if (filterState !== 'all') {
        if (item.states && item.states.length > 0 && !item.states.includes(filterState)) {
          return false;
        }
      }

      // Education Level
      if (filterEducation !== 'all') {
        if (
          item.education_levels &&
          item.education_levels.length > 0 &&
          !item.education_levels.includes(filterEducation)
        ) {
          return false;
        }
      }

      // Eligible toggle
      if (showOnlyEligible && (!eligibilityResult || !eligibilityResult.eligible)) {
        return false;
      }

      return true;
    });
  }, [evaluatedScholarships, searchTerm, filterState, filterEducation, showOnlyEligible]);

  const eligibleCount = evaluatedScholarships.filter((s) => s.eligibilityResult?.eligible).length;


  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 p-6 sm:p-8 text-white shadow-xl border border-amber-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Feature 7 • Verified Scholarship Matching Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Personalized Scholarship Finder
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Matched automatically with your profile ({profile?.education_level || '12th'}, {profile?.state || 'Maharashtra'}, {profile?.percentage || 82}% marks, {profile?.category || 'OBC'}).
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="px-4 py-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-center">
                <span className="text-2xl font-black text-amber-300">{eligibleCount}</span>
                <span className="block text-[11px] text-amber-200 font-bold uppercase">
                  Qualifying Grants
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scholarship name, provider, central, state..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition"
              />
            </div>

            {/* State Filter */}
            <div className="flex gap-2">
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All States & National</option>
                <option value="Maharashtra">Maharashtra Schemes</option>
                <option value="Karnataka">Karnataka Schemes</option>
              </select>

              {/* Education Level Filter */}
              <select
                value={filterEducation}
                onChange={(e) => setFilterEducation(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">All Education Levels</option>
                <option value="10th">10th Standard</option>
                <option value="12th">12th Standard</option>
                <option value="diploma">Diploma</option>
                <option value="undergraduate">Undergraduate (B.Tech/BSc)</option>
                <option value="postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyEligible}
                onChange={(e) => setShowOnlyEligible(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Show only scholarships I qualify for (100% Match)</span>
            </label>
            <span className="text-slate-500 font-medium">
              Showing {filteredList.length} of {dbScholarships.length} scholarships
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
                className={`bg-white rounded-3xl p-6 border transition space-y-4 shadow-xs hover:shadow-md ${
                  isEligible
                    ? 'border-emerald-300 ring-1 ring-emerald-400/30'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                        💰 {sch.amount || 'Financial Assistance'}
                      </span>
                      {isEligible ? (
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>You May Qualify</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Partial Match
                        </span>
                      )}
                      {sch.states && sch.states.length > 0 && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                          📍 {sch.states.join(', ')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {sch.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      <span>Provider: {sch.provider}</span>
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {sch.description}
                    </p>
                  </div>

                  {/* Apply Button & Deadline */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    {sch.deadline && (
                      <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline: {sch.deadline}</span>
                      </div>
                    )}
                    <a
                      href={sch.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Why You May Qualify / Rule Evaluation Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Eligibility Criteria Breakdown:</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Evaluated against your active profile
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {matchedRules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{rule.label}</span>
                      </div>
                    ))}
                    {failedRules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-2 p-2 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-900 font-medium"
                      >
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{rule.label} (Not matching profile)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}


          {filteredList.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">No Scholarships Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try clearing your search terms or unchecking the strict eligibility filter to view all available national and state schemes.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
