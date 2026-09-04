'use client';

import React from 'react';
import { InstitutionRecommendation } from '@/types';
import { useStudent } from '@/context/StudentContext';
import { translations } from '@/lib/translations';
import {
  Building2,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  Wallet,
  Sparkles,
  Target,
} from 'lucide-react';

interface InstitutionRecommendationCardProps {
  recommendation: InstitutionRecommendation;
  onSelect?: () => void;
}

export const InstitutionRecommendationCard: React.FC<InstitutionRecommendationCardProps> = ({
  recommendation,
}) => {
  const { language } = useStudent();
  const t = translations[language];

  const { institution: inst, distanceLabel, affordabilityBadge, matchReasons, highlights } =
    recommendation;

  const getAffordabilityStyle = (badge: string) => {
    switch (badge) {
      case 'Budget-friendly':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Comfortable fit':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Moderate':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'May require financial support':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formattedFee =
    inst.annual_fee === 0
      ? '100% Free (Govt Funded)'
      : inst.annual_fee !== undefined
      ? `₹${inst.annual_fee.toLocaleString('en-IN')}/year`
      : 'Fee details unavailable';

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#E6EBF5] hover:border-blue-300 shadow-xs hover:shadow-md transition-all space-y-4 text-left group">
      {/* Top badges & Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1769FF] border border-blue-200">
              <MapPin className="w-3 h-3" />
              <span>{distanceLabel}</span>
            </span>

            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getAffordabilityStyle(
                affordabilityBadge
              )}`}
            >
              💰 {affordabilityBadge}
            </span>
          </div>

          <span
            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
              inst.government
                ? 'bg-[#DDF7EA] text-[#0B7A48]'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {inst.government ? '🏛️ Govt / Aided' : '🏢 Private'}
          </span>
        </div>

        <h4 className="font-extrabold text-sm sm:text-base text-[#101D35] group-hover:text-[#1769FF] transition-colors leading-snug">
          {inst.name}
        </h4>

        <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{inst.course}</span>
        </div>
      </div>

      {/* Fee and Key attributes Bar */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Estimated Tuition
          </span>
          <span className="font-black text-[#101D35] text-xs sm:text-sm">
            {formattedFee}
          </span>
        </div>

        {inst.hostel_available && (
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs">
              🛏️ Hostel Available
            </span>
          </div>
        )}
      </div>

      {/* ── Entrance Exam Required Section ── */}
      {inst.entrance_exam && (
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-50/20 border border-amber-200 shadow-2xs space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="font-black text-amber-950 flex items-center gap-1.5 text-xs sm:text-[13px] tracking-tight">
              <span className="text-sm">🎯</span>
              <span>{t.roadmap?.entranceExamRequired || 'Entrance Exam Required'}</span>
            </div>
            {inst.entrance_exam.status && (
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  inst.entrance_exam.status === 'Required'
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}
              >
                {inst.entrance_exam.status === 'Required'
                  ? t.roadmap?.statusRequired || 'Required'
                  : t.roadmap?.statusAccepted || 'Accepted / Optional'}
              </span>
            )}
          </div>

          <div className="space-y-1.5 bg-white/90 p-2.5 rounded-lg border border-amber-200/60 text-[11px] text-slate-800">
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-slate-500 shrink-0">
                • {t.roadmap?.examLabel || 'Exam'}:
              </span>
              <span className="font-black text-slate-900">
                {inst.entrance_exam.exam_name}
              </span>
            </div>

            {inst.entrance_exam.required_for && (
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-slate-500 shrink-0">
                  • {t.roadmap?.requiredForLabel || 'Required for'}:
                </span>
                <span className="font-medium text-slate-700">
                  {inst.entrance_exam.required_for}
                </span>
              </div>
            )}

            {inst.entrance_exam.admission_route && (
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-slate-500 shrink-0">
                  • {t.roadmap?.admissionRouteLabel || 'Admission route'}:
                </span>
                <span className="font-medium text-slate-700">
                  {inst.entrance_exam.admission_route}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtle note if exam is explicitly not required (e.g. direct merit) */}
      {!inst.entrance_exam && inst.entrance_exam_exempt && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-emerald-800 text-[11px] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{t.roadmap?.entranceExamDirectMerit || 'Entrance exam: Direct merit / Not required'}</span>
        </div>
      )}

      {/* Highlights chips */}
      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {highlights.map((h, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
            >
              ✓ {h}
            </span>
          ))}
        </div>
      )}

      {/* Why This Matches You */}
      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border border-emerald-200/70 space-y-1.5 text-xs">
        <div className="font-black text-[#0B7A48] flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.roadmap?.whyMatchesYou || 'Why This Matches You:'}</span>
        </div>
        <ul className="space-y-1 text-slate-700 text-[11px] leading-relaxed">
          {matchReasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Admission Process Guidance */}
      {inst.admission_process && (
        <div className="text-[11px] text-slate-500 font-medium">
          <span className="font-bold text-slate-700">{t.roadmap?.howToApply || 'How to apply:'} </span>
          <span>{inst.admission_process}</span>
        </div>
      )}

      {/* Action Link */}
      {inst.website_url && (
        <a
          href={inst.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition shadow-2xs"
        >
          <span>{t.roadmap?.viewPortal || 'View Institution Portal'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
};
