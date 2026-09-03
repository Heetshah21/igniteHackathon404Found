'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { RoadmapStep, Career, Roadmap, Institution, InstitutionPreferenceFilter } from '@/types';
import { useStudent } from '@/context/StudentContext';
import { getInstitutions } from '@/lib/data/institutions';
import {
  isEducationStage,
  matchInstitutionsForStage,
  getPracticalStageGuide,
} from '@/lib/recommendations/institutionMatcher';
import { translations } from '@/lib/translations';
import { InstitutionRecommendationCard } from './InstitutionRecommendationCard';
import { AudioButton } from '@/components/common/AudioButton';
import {
  X,
  Compass,
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  Building2,
  GraduationCap,
  Filter,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Award,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface RoadmapStageDrawerProps {
  isOpen: boolean;
  step: RoadmapStep | null;
  career?: Career | null;
  pathway?: Roadmap | null;
  stageIndex?: number;
  onClose: () => void;
}

export const RoadmapStageDrawer: React.FC<RoadmapStageDrawerProps> = ({
  isOpen,
  step,
  career,
  pathway,
  stageIndex = 0,
  onClose,
}) => {
  const { profile, language } = useStudent();
  const t = translations[language];
  const [dbInstitutions, setDbInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Special preferences filter state
  const [filters, setFilters] = useState<InstitutionPreferenceFilter>({});

  // Fetch institutions on mount
  useEffect(() => {
    setIsLoading(true);
    getInstitutions()
      .then((data) => {
        setDbInstitutions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn('Error loading institutions in drawer:', err);
        setIsLoading(false);
      });
  }, []);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset filters when a new step is opened
  useEffect(() => {
    if (step) {
      setFilters({});
    }
  }, [step?.id]);

  const toggleFilter = (key: keyof InstitutionPreferenceFilter) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const handleClearFilters = () => {
    setFilters({});
  };

  // Determine stage type and recommendations
  const isEducation = step ? isEducationStage(step) : false;

  const recommendations = useMemo(() => {
    if (!step || !isEducation) return [];
    return matchInstitutionsForStage(dbInstitutions, step, profile || {}, filters);
  }, [dbInstitutions, step, isEducation, profile, filters]);

  const practicalGuide = useMemo(() => {
    if (!step || isEducation) return null;
    return getPracticalStageGuide(step, career?.title);
  }, [step, isEducation, career?.title]);

  if (!isOpen || !step) return null;

  const stageSpeechText = {
    en: `Stage ${stageIndex + 1}: ${step.title}. ${step.duration ? `Duration: ${step.duration}.` : ''} ${step.description}. ${step.tips?.length ? `Helpful tip: ${step.tips[0]}` : ''}`,
    hi: `चरण ${stageIndex + 1}: ${step.title}। ${step.duration ? `अवधि: ${step.duration}।` : ''} ${step.description}। ${step.tips?.length ? `महत्वपूर्ण सुझाव: ${step.tips[0]}` : ''}`,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* ── Dark Translucent Backdrop with Blur ─────────────────── */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />

      {/* ── Slide-in Drawer Container ────────────────────────────── */}
      <aside
        className="relative z-50 w-full sm:w-[480px] md:w-[520px] bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-stage-title"
      >
        {/* Top Header Sticky Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-white flex items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
              Stage #{stageIndex + 1}
            </span>
            {step.duration && (
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{step.duration}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <AudioButton
              id={`drawer-stage-speech-${step.id}`}
              text={stageSpeechText}
              label="Listen"
              variant="badge"
              size="xs"
              className="bg-blue-50 text-[#2563EB] hover:bg-blue-100 border-blue-200"
              ariaLabel={`Listen to details for ${step.title}`}
            />

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer shrink-0"
              aria-label="Close details drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          {/* Stage Main Overview Card */}
          <div className="space-y-2">
            <h2
              id="drawer-stage-title"
              className="text-xl sm:text-2xl font-black text-[#0F1B3D] tracking-tight leading-tight"
            >
              {step.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Personalized Student Context Bar */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100 text-xs space-y-2">
            <div className="flex items-center justify-between font-extrabold text-[#2563EB] text-[11px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalized Based On Your Profile</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500">Live Matching</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700 font-medium">
              <span className="px-2 py-0.5 bg-white rounded-md border border-blue-100 font-bold">
                📍 {profile?.location || 'Nashik'}, {profile?.state || 'Maharashtra'}
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-blue-100 font-bold">
                🎯 {career?.title || profile?.career_goal || 'Software Engineer'}
              </span>
              <span className="px-2 py-0.5 bg-white rounded-md border border-blue-100 font-bold text-[#0B7A48]">
                💰 Family Budget: {profile?.family_income ? 'Under ₹2.5L/yr' : 'Subsidized Plan'}
              </span>
            </div>
          </div>

          {/* Prerequisites / Requirements Badge List */}
          {step.requirements && step.requirements.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                <span>Prerequisites / Qualifying Standard:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {step.requirements.map((req, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    ✓ {req}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── SECTION: EDUCATION INSTITUTIONS (If college / school stage) ── */}
          {isEducation && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              {/* Special Preferences Filter Chips */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#101D35] uppercase tracking-wider flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Looking for something specific?</span>
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear filters</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFilter('governmentOnly')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                      filters.governmentOnly
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t.roadmap.filterGovt}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFilter('lowFees')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                      filters.lowFees
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t.roadmap.filterLowFees}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFilter('hostelAvailable')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                      filters.hostelAvailable
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t.roadmap.filterHostel}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFilter('girlsOnly')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                      filters.girlsOnly
                        ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-[#E6EBF5] hover:bg-slate-100'
                    }`}
                  >
                    <span>{t.roadmap.filterGirls}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFilter('closestToMe')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                      filters.closestToMe
                        ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-[#E6EBF5] hover:bg-slate-100'
                    }`}
                  >
                    <span>{t.roadmap.filterClosest}</span>
                  </button>
                </div>
              </div>

              {/* Recommended Options Heading */}
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-sm font-extrabold text-[#101D35] uppercase tracking-wider flex items-center gap-2">
                  <span>Recommended Institutions & Colleges</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-100 text-[#1769FF]">
                    {recommendations.length} Best Fits
                  </span>
                </h3>
              </div>

              {/* Cards List */}
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <InstitutionRecommendationCard
                    key={rec.institution.id}
                    recommendation={rec}
                  />
                ))}

                {recommendations.length === 0 && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                    <h4 className="font-bold text-sm text-slate-900">
                      No matching colleges found for this filter
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      We couldn&apos;t find an institution strictly matching all your chosen preferences in this district.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition shadow-2xs cursor-pointer"
                    >
                      Clear Filters & Show Top Options
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── SECTION: PRACTICAL / INTERNSHIP / PROJECT GUIDE (If non-college stage) ── */}
          {!isEducation && practicalGuide && (
            <div className="space-y-5 pt-2 border-t border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wide mb-1">
                  <Award className="w-3 h-3" />
                  <span>Proof of Work Gateway</span>
                </div>
                <h3 className="text-base font-extrabold text-[#101D35]">
                  {practicalGuide.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {practicalGuide.subtitle}
                </p>
              </div>

              {/* Action items list */}
              <div className="space-y-3">
                {practicalGuide.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#E6EBF5] hover:border-blue-300 transition space-y-2 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1769FF]">
                        {action.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#101D35]">
                      {action.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {action.description}
                    </p>
                    {action.url && (
                      <a
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1769FF] hover:underline pt-1"
                      >
                        <span>Explore Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Free Platforms Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase">
                  Recommended 100% Free Practice Platforms:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {practicalGuide.freePlatforms.map((plat, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800"
                    >
                      🚀 {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SECTION: RURAL & FIRST-GENERATION STUDENT PRO-TIPS ── */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs">
            <div className="font-extrabold text-amber-900 flex items-center gap-2 text-xs">
              <span className="text-base">💡</span>
              <span>Guidance for Rural & First-Generation Students:</span>
            </div>
            {step.tips && step.tips.length > 0 ? (
              <ul className="space-y-1.5 text-amber-950 font-medium pl-1">
                {step.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-amber-950 font-medium">
                Keep all your marksheet certificates and domicile/caste documents scanned in DigiLocker for fast online state verification.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Drawer Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-[#E6EBF5] flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-500">
            Roadmap Pathway: <strong className="text-slate-800">{pathway?.title || 'Active Track'}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-[#E6EBF5] transition cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </aside>
    </div>
  );
};
