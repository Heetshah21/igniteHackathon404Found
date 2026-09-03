'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getOpportunities } from '@/lib/data/opportunities';
import { Opportunity } from '@/types';
import { matchOpportunities } from '@/lib/recommendations/matcher';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
import { getOpportunitySpeech } from '@/lib/speech/hindiContent';
import {
  Trophy,
  Search,
  ExternalLink,
  Calendar,
  Building,
  DollarSign,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';


const TYPES = ['All', 'hackathon', 'internship', 'competition', 'project', 'workshop'];

export default function OpportunitiesPage() {
  const { profile, language } = useStudent();
  const t = translations[language];

  const [dbOpportunities, setDbOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    getOpportunities().then(setDbOpportunities);
  }, []);

  // Scored recommendations based on student profile
  const scoredOpportunities = useMemo(() => {
    return matchOpportunities(dbOpportunities, profile || {});
  }, [dbOpportunities, profile]);

  const filteredOpportunities = useMemo(() => {
    return (dbOpportunities ?? []).filter((opp) => {
      if (!opp) return false;
      // Search
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = opp.title?.toLowerCase().includes(term) ?? false;
        const matchesOrg = opp.organizer?.toLowerCase().includes(term) ?? false;
        const matchesDesc = opp.description?.toLowerCase().includes(term) ?? false;
        const matchesTags = (opp.tags ?? []).some((t) => t?.toLowerCase().includes(term));
        if (!matchesTitle && !matchesOrg && !matchesDesc && !matchesTags) return false;
      }

      // Type filter
      if (selectedType !== 'All') {
        if (opp.type !== selectedType) return false;
      }

      return true;
    });
  }, [dbOpportunities, searchTerm, selectedType]);


  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 text-[#101D35] shadow-xs border border-[#E6EBF5]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Feature 3 • Hackathons, Internships & Competitions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#101D35]">
              Student Opportunities & Competitions
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              Gain practical industry exposure, win national prizes, and build your resume with curated hackathons, GSoC, fellowships, and internships.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6EBF5] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Smart India Hackathon, GSoC, Internshala, MLH..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
              />
            </div>

            {/* Type Selector Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {TYPES.map((type) => {
                const isSelected = selectedType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                      isSelected
                        ? 'bg-[#1769FF] text-white border-[#1769FF]'
                        : 'bg-slate-50 text-slate-700 border-[#E6EBF5] hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => {
            return (
              <div
                key={opp.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 group hover:border-orange-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-md bg-orange-100 text-orange-800">
                      {opp.type}
                    </span>
                    {opp.stipend && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        💰 {opp.stipend}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-orange-700 transition-colors">
                      {opp.title}
                    </h3>
                    <AudioButton
                      id={`opp-speech-${opp.id}`}
                      text={getOpportunitySpeech(
                        opp.title,
                        opp.organizer,
                        opp.type,
                        opp.description,
                        opp.stipend,
                        opp.deadline
                      )}
                      label="Listen"
                      variant="ghost"
                      size="xs"
                      className="text-slate-600 hover:bg-slate-100 shrink-0"
                      ariaLabel={`Listen to opportunity details for ${opp.title}`}
                    />
                  </div>

                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.organizer}</span>
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {opp.description}
                  </p>


                  <div className="flex flex-wrap gap-1 pt-1">
                    {opp.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  {opp.deadline && (
                    <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline:</span>
                      </span>
                      <span className="text-slate-800 font-bold">{opp.deadline}</span>
                    </div>
                  )}

                  <a
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition shadow-xs"
                  >
                    <span>View Details & Register</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
