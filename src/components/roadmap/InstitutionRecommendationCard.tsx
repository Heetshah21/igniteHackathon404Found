'use client';

import React from 'react';
import { InstitutionRecommendation } from '@/types';
import {
  Building2,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  Wallet,
  Sparkles,
} from 'lucide-react';

interface InstitutionRecommendationCardProps {
  recommendation: InstitutionRecommendation;
  onSelect?: () => void;
}

export const InstitutionRecommendationCard: React.FC<InstitutionRecommendationCardProps> = ({
  recommendation,
}) => {
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
          <span>Why This Matches You:</span>
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
          <span className="font-bold text-slate-700">How to apply: </span>
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
          <span>View Institution Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
};
