'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import { getCareers } from '@/lib/data/careers';
import { Career } from '@/types';
import { translations } from '@/lib/translations';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Heart,
  Target,
  User,
  MapPin,
  Building,
  Percent,
  Wallet,
  FileUp,
  FileCheck,
  Upload,
  X,
} from 'lucide-react';

const INDIAN_STATES = [
  'Maharashtra',
  'Karnataka',
  'Gujarat',
  'Tamil Nadu',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Rajasthan',
  'Bihar',
  'West Bengal',
  'Andhra Pradesh',
  'Telangana',
  'Kerala',
  'Delhi',
  'Punjab',
  'Haryana',
  'Odisha',
  'Assam',
  'Jharkhand',
  'Other State',
];

const EDUCATION_LEVELS = [
  { id: '10th', label: '10th Standard', desc: 'Completed or currently in 10th' },
  { id: '12th', label: '12th Standard', desc: 'Higher Secondary (Science/Commerce/Arts)' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Technical or vocational diploma' },
  { id: 'undergraduate', label: 'College / Undergrad (B.Tech, BCA, BSc, BCom)', desc: 'Pursuing Bachelor’s degree' },
  { id: 'postgraduate', label: 'Postgraduate (MCA, M.Tech, MSc)', desc: 'Pursuing Master’s degree' },
];

const STREAMS = [
  { id: 'science', label: 'Science (PCM / PCB)', icon: '🔬' },
  { id: 'computer', label: 'Computer Science / IT', icon: '💻' },
  { id: 'engineering', label: 'Engineering (Polytechnic/B.Tech)', icon: '⚙️' },
  { id: 'commerce', label: 'Commerce & Finance', icon: '📈' },
  { id: 'arts', label: 'Arts & Humanities', icon: '🎨' },
  { id: 'medical', label: 'Medical / Healthcare', icon: '🩺' },
];

const INTEREST_OPTIONS = [
  'Technology',
  'Programming & Coding',
  'Artificial Intelligence',
  'Mathematics & Logic',
  'Design & UI/UX',
  'Business & Startups',
  'Finance & Accounting',
  'Medical & Biology',
  'Government & Civil Services',
  'Civil & Construction',
  'Mechanical & Robotics',
  'Teaching & Research',
  'Digital Marketing',
];

const INCOME_OPTIONS = [
  { id: 'below-1-lakh', label: 'Less than ₹1.0 Lakh/year' },
  { id: '1-2.5-lakh', label: '₹1.0 Lakh - ₹2.5 Lakh/year' },
  { id: '2.5-5-lakh', label: '₹2.5 Lakh - ₹5.0 Lakh/year' },
  { id: '5-8-lakh', label: '₹5.0 Lakh - ₹8.0 Lakh/year' },
  { id: '8-15-lakh', label: '₹8.0 Lakh - ₹15 Lakh/year' },
  { id: 'above-15-lakh', label: 'More than ₹15 Lakh/year' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile, language, isAuthenticated, isLoading } = useStudent();
  const t = translations[language];
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?next=/onboarding');
    }
  }, [isLoading, isAuthenticated, router]);

  // Form state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [gender, setGender] = useState('male');
  const [ruralUrban, setRuralUrban] = useState('rural');

  const [educationLevel, setEducationLevel] = useState('12th');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [branch, setBranch] = useState('science');
  const [percentage, setPercentage] = useState<number | string>(82);
  const [familyIncome, setFamilyIncome] = useState('1-2.5-lakh');
  const [category, setCategory] = useState('OBC');
  const [marksheetFilename, setMarksheetFilename] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [interests, setInterests] = useState<string[]>([
    'Technology',
    'Programming & Coding',
    'Artificial Intelligence',
  ]);

  const [careerGoalId, setCareerGoalId] = useState('software-engineer');
  const [dbCareers, setDbCareers] = useState<Career[]>([]);

  useEffect(() => {
    getCareers().then(setDbCareers);
  }, []);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setLocation(profile.location || 'Nashik');
      setState(profile.state || 'Maharashtra');
      setGender(profile.gender || 'male');
      setRuralUrban(profile.rural_urban || 'rural');
      setEducationLevel(profile.education_level || '12th');
      setSchoolCollege(profile.school_college || 'Shivaji Vidya Mandir');
      setBranch(profile.branch || 'science');
      setPercentage(profile.percentage || 82);
      setFamilyIncome(profile.family_income || '1-2.5-lakh');
      setCategory(profile.category || 'OBC');
      if (profile.marksheet_filename) setMarksheetFilename(profile.marksheet_filename);
      if (profile.interests?.length) setInterests(profile.interests);
      if (profile.career_goal_id) setCareerGoalId(profile.career_goal_id);
    }
  }, [profile]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMarksheetFilename(file.name);
    }
  };

  const handleRemoveFile = () => {
    setMarksheetFilename('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleFinish = async () => {
    const selectedCareer = dbCareers.find((c: Career) => c.id === careerGoalId);

    await updateProfile({
      name: name.trim() || 'Student',
      location: location.trim() || 'Maharashtra',
      state,
      gender,
      rural_urban: ruralUrban,
      education_level: educationLevel,
      school_college: schoolCollege.trim() || 'School / College',
      branch,
      percentage: Number(percentage) || 75,
      family_income: familyIncome,
      category,
      interests,
      marksheet_filename: marksheetFilename || undefined,
      career_goal_id: careerGoalId,
      career_goal: selectedCareer?.title || 'Software Engineer',
      onboarding_completed: true,
    });

    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500">Loading profile data...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2563EB] text-white shadow-sm mb-3">
            <Compass className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F1B3D] tracking-tight">
            {t.onboarding.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {t.onboarding.subtitle}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-400 mb-2 gap-1">
            <span className={step >= 1 ? 'text-[#2563EB] font-bold' : ''}>{t.onboarding.step1Title}</span>
            <span className={step >= 2 ? 'text-[#2563EB] font-bold' : ''}>{t.onboarding.step2Title}</span>
            <span className={step >= 3 ? 'text-[#2563EB] font-bold' : ''}>{t.onboarding.step3Title}</span>
            <span className={step >= 4 ? 'text-[#2563EB] font-bold' : ''}>{t.onboarding.step4Title}</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 shadow-[var(--shadow-card)]">
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-2 text-[#2563EB] font-bold text-sm">
                <User className="w-4 h-4" />
                <span>Step 1 of 4: Personal Background</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    City / Village / District *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Nashik / Kolhapur / Pune"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0F1B3D] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female (Eligible for Pragati & Girl Scholarships)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Area Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRuralUrban('rural')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${ruralUrban === 'rural'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      🌾 Rural / Semi-Urban
                    </button>
                    <button
                      type="button"
                      onClick={() => setRuralUrban('urban')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${ruralUrban === 'urban'
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      🏙️ Urban / Metro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Education Details */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-2 text-[#1769FF] font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Step 2 of 4: Current Education & Academic Status</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101D35] mb-2">
                  Current Education Level *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EDUCATION_LEVELS.map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setEducationLevel(lvl.id)}
                      className={`p-3 rounded-xl text-left border transition ${educationLevel === lvl.id
                          ? 'bg-blue-50 border-[#2563EB] text-[#2563EB] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <div className="font-bold text-xs">{lvl.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    School / College Name
                  </label>
                  <input
                    type="text"
                    value={schoolCollege}
                    onChange={(e) => setSchoolCollege(e.target.value)}
                    placeholder="e.g. Govt Higher Secondary School"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-[#101D35] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#1769FF] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Academic Stream / Branch *
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-[#E6EBF5] rounded-xl text-[#101D35] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#1769FF] text-sm transition"
                  >
                    {STREAMS.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.icon} {st.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Percentage / CGPA (%) *
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="82"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#101D35] placeholder-slate-400 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Family Annual Income (For Scholarships)
                  </label>
                  <select
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#101D35] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  >
                    {INCOME_OPTIONS.map((inc) => (
                      <option key={inc.id} value={inc.id}>
                        {inc.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#101D35] mb-1">
                    Category (Optional)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#101D35] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#2563EB] text-sm transition"
                  >
                    <option value="General">General / Open</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                {/* Marksheet Document Upload Card */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <label className="block text-xs font-bold text-[#101D35] flex items-center gap-1.5">
                      <FileUp className="w-4 h-4 text-[#2563EB]" />
                      <span>{educationLevel || '12th'} Marksheet</span>
                    </label>
                    <span className="text-[10px] font-semibold text-slate-400">PDF, JPG, JPEG or PNG</span>
                  </div>

                  {marksheetFilename ? (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200 gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-emerald-900 truncate">
                            {marksheetFilename}
                          </div>
                          <div className="text-[10px] font-medium text-emerald-700">
                            {educationLevel || '12th'} Marksheet uploaded • Verification pending
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-blue-50 rounded-md border border-blue-200 bg-white cursor-pointer transition"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 rounded-xl p-4 text-center cursor-pointer transition"
                    >
                      <Upload className="w-6 h-6 text-[#2563EB] mx-auto mb-1.5" />
                      <div className="text-xs font-bold text-slate-700">
                        Upload {educationLevel || '12th'} Marksheet
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        PDF, JPG or PNG (Grade card / marksheet document)
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Interests */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-2 text-[#1769FF] font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>Step 3 of 4: Select Your Interests</span>
              </div>
              <p className="text-xs text-slate-500">
                Choose the subjects and areas you find exciting. This fine-tunes your recommendations and career fit.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${isSelected
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Career Aspiration */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-2 text-[#1769FF] font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>Step 4 of 4: What is your primary career goal?</span>
              </div>
              <p className="text-xs text-slate-500">
                Pick your dream destination. We will map out the exact step-by-step pathway from where you are today.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                {dbCareers.map((career) => {
                  const isSelected = careerGoalId === career.id;
                  return (
                    <button
                      key={career.id}
                      type="button"
                      onClick={() => setCareerGoalId(career.id)}
                      className={`p-3.5 rounded-xl text-left border transition ${isSelected
                          ? 'bg-blue-50 border-[#2563EB] text-[#0F1B3D] shadow-xs ring-1 ring-[#2563EB]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <div className="text-2xl mb-1">{career.icon}</div>
                      <div className="font-bold text-xs text-[#0F1B3D]">{career.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {career.description}
                      </div>
                      <div className="mt-2 text-[10px] font-bold text-[#0B7A48] flex items-center gap-1">
                        💰 {career.avg_salary}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
