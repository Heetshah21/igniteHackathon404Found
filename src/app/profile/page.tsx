'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  GraduationCap,
  Heart,
  Target,
  FileCheck,
  Edit3,
  MapPin,
  Mail,
  Award,
  Sparkles,
  ShieldCheck,
  Clock,
  Building,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AudioButton } from '@/components/common/AudioButton';
import { useStudent } from '@/context/StudentContext';
import { translations } from '@/lib/translations';

export default function ProfilePage() {
  const { profile, language, isLoading } = useStudent();
  const t = translations[language];
  const p = t.profile;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">{t.common.loading}</p>
        </div>
      </AppLayout>
    );
  }

  if (!profile) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0F1B3D]">{p.incompleteTitle}</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">{p.incompleteSubtitle}</p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>{p.completeNow}</span>
          </Link>
        </div>
      </AppLayout>
    );
  }

  // Generate clean speech text for TTS
  const speechSummary = `${profile.name || 'Student'}, ${profile.education_level || ''} student from ${profile.location || ''} ${profile.state || ''}. Target career goal: ${profile.career_goal || 'Not specified'}. Percentage: ${profile.percentage ? `${profile.percentage} percent` : 'Not recorded'}.`;

  const hasMarksheet = Boolean(profile.percentage || profile.school_college);

  return (
    <AppLayout>
      <div className="space-y-6 pb-12 max-w-5xl mx-auto">
        {/* ============================================================ */}
        {/* TOP HERO HEADER WITH EDIT ACTION & TTS                       */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-[var(--shadow-card)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
                {profile.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                    {p.badge}
                  </span>
                  {profile.onboarding_completed && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0F1B3D] tracking-tight truncate">
                  {profile.name || 'Student Profile'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {p.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <AudioButton
                id="profile-overview-speech"
                text={speechSummary}
                label="Listen"
                variant="secondary"
                size="sm"
                ariaLabel="Listen to profile summary"
              />
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm cursor-pointer"
                title={p.editProfileDesc}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{p.editProfile}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PROFILE INFORMATION GRID                                    */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* 1. PERSONAL INFORMATION */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-2 text-[#0F1B3D] font-extrabold text-sm sm:text-base border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span>{p.personalInfo}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.fullName}</div>
                <div className="font-bold text-[#0F1B3D] text-sm break-words">{profile.name || '—'}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.email}</div>
                <div className="font-bold text-[#0F1B3D] text-xs truncate" title={profile.email}>
                  {profile.email || '—'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.location}</div>
                <div className="font-bold text-[#0F1B3D] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{profile.location || '—'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.state}</div>
                <div className="font-bold text-[#0F1B3D]">{profile.state || '—'}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.gender}</div>
                <div className="font-bold text-[#0F1B3D] capitalize">{profile.gender || '—'}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.areaType}</div>
                <div className="font-bold text-[#0F1B3D] capitalize">
                  {profile.rural_urban === 'rural' ? '🌾 Rural / Semi-Urban' : profile.rural_urban === 'urban' ? '🏙️ Urban / Metro' : '—'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. EDUCATION & ACADEMICS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-2 text-[#0F1B3D] font-extrabold text-sm sm:text-base border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span>{p.education}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.educationLevel}</div>
                <div className="font-bold text-[#0F1B3D] text-sm">{profile.education_level || '—'}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.stream}</div>
                <div className="font-bold text-[#0F1B3D] capitalize">{profile.branch || '—'}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.percentage}</div>
                <div className="font-bold text-emerald-700 text-sm">
                  {profile.percentage ? `${profile.percentage}%` : '—'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.schoolCollege}</div>
                <div className="font-bold text-[#0F1B3D] truncate" title={profile.school_college}>
                  {profile.school_college || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* 3. CAREER ASPIRATIONS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-2 text-[#0F1B3D] font-extrabold text-sm sm:text-base border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <span>{p.careerAspirations}</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                {p.careerGoal}
              </div>
              <div className="text-lg font-black text-[#0F1B3D] flex items-center gap-2">
                <span>🎯 {profile.career_goal || 'Goal Not Selected'}</span>
              </div>
              <p className="text-xs text-slate-600">
                Used to tailor your personalized multi-pathway roadmap, course recommendations, and career simulator.
              </p>
              <div className="pt-1">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-800"
                >
                  <span>View Career Roadmap</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4. PERSONALIZATION CONTEXT */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-2 text-[#0F1B3D] font-extrabold text-sm sm:text-base border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <span>{p.personalization}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.familyIncome}</div>
                <div className="font-bold text-[#0F1B3D]">
                  {profile.family_income === 'below-1lakh'
                    ? 'Under ₹1,00,000 / year'
                    : profile.family_income === '1-3lakh'
                    ? '₹1,00,000 – ₹3,00,000 / year'
                    : profile.family_income === '3-6lakh'
                    ? '₹3,00,000 – ₹6,00,000 / year'
                    : profile.family_income === 'above-6lakh'
                    ? 'Above ₹6,00,000 / year'
                    : '—'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 mb-0.5">{p.category}</div>
                <div className="font-bold text-[#0F1B3D]">{profile.category || 'General / Open'}</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
              💡 Income & category information is used strictly to match eligible state and national scholarships.
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. INTERESTS & PASSIONS CHIPS                               */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-3">
          <div className="flex items-center gap-2 text-[#0F1B3D] font-extrabold text-sm sm:text-base border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <span>{p.interests}</span>
          </div>

          {profile.interests && profile.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-bold"
                >
                  ✨ {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No specific interests recorded yet.</p>
          )}
        </div>

        {/* ============================================================ */}
        {/* 6. ACADEMIC DOCUMENTS & DIGILOCKER VERIFICATION SECTION     */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-[#0F1B3D] font-extrabold text-sm sm:text-base">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <span>{p.documentVerification}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Marksheet Status Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F1B3D] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-600" />
                  <span>{profile.education_level || 'Academic'} Marksheet</span>
                </span>
                {hasMarksheet ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{p.pendingVerification}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                    <AlertCircle className="w-3 h-3" />
                    <span>{p.notVerified}</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {hasMarksheet ? p.pendingVerificationDesc : p.notVerifiedDesc}
              </p>

              {hasMarksheet && (
                <div className="space-y-1.5 pt-1 text-[11px] text-slate-500">
                  {profile.marksheet_filename && (
                    <div className="flex items-center gap-2 font-medium text-slate-700 truncate">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{profile.marksheet_filename}</span>
                    </div>
                  )}
                  {profile.percentage && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">Recorded Score:</span>
                      <span className="font-bold text-emerald-700">{profile.percentage}%</span>
                      <span className="text-slate-300">•</span>
                      <span>Self-reported via profile</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* DigiLocker Integration Card (Architecture Ready) */}
            <div className="p-4 rounded-xl border border-slate-200 bg-blue-50/40 space-y-2.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F1B3D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>{p.digilockerTitle}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
                  {p.digilockerComingSoon}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {p.digilockerDesc}
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Connect DigiLocker (Coming Soon)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
