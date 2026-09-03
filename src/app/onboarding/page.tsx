'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import { careers } from '@/data/careers';
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
  const { profile, updateProfile } = useStudent();
  const [step, setStep] = useState(1);

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

  const [interests, setInterests] = useState<string[]>([
    'Technology',
    'Programming & Coding',
    'Artificial Intelligence',
  ]);

  const [careerGoalId, setCareerGoalId] = useState('software-engineer');

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
      if (profile.interests?.length) setInterests(profile.interests);
      if (profile.career_goal_id) setCareerGoalId(profile.career_goal_id);
    }
  }, [profile]);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleFinish = () => {
    const selectedCareer = careers.find((c) => c.id === careerGoalId);

    updateProfile({
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
      career_goal_id: careerGoalId,
      career_goal: selectedCareer?.title || 'Software Engineer',
      onboarding_completed: true,
    });

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Personalized Student Onboarding</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Set Up Your Career Profile
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Tell us about your background so we can recommend the best roadmaps, scholarships, and opportunities for you.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className={step >= 1 ? 'text-emerald-400 font-bold' : ''}>1. Personal</span>
            <span className={step >= 2 ? 'text-emerald-400 font-bold' : ''}>2. Education</span>
            <span className={step >= 3 ? 'text-emerald-400 font-bold' : ''}>3. Interests</span>
            <span className={step >= 4 ? 'text-emerald-400 font-bold' : ''}>4. Aspirations</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <User className="w-4 h-4" />
                <span>Step 1 of 4: Personal Background</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    City / Village / District *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Nashik / Kolhapur / Pune"
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female (Eligible for Pragati & Girl Scholarships)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Area Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRuralUrban('rural')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                        ruralUrban === 'rural'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      🌾 Rural / Semi-Urban
                    </button>
                    <button
                      type="button"
                      onClick={() => setRuralUrban('urban')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                        ruralUrban === 'urban'
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:bg-slate-700'
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
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Step 2 of 4: Current Education & Academic Status</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Current Education Level *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EDUCATION_LEVELS.map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setEducationLevel(lvl.id)}
                      className={`p-3 rounded-xl text-left border transition ${
                        educationLevel === lvl.id
                          ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 shadow-xs'
                          : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="font-bold text-xs">{lvl.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    School / College Name
                  </label>
                  <input
                    type="text"
                    value={schoolCollege}
                    onChange={(e) => setSchoolCollege(e.target.value)}
                    placeholder="e.g. Govt Higher Secondary School"
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Academic Stream / Branch *
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  >
                    {STREAMS.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.icon} {st.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Percentage / CGPA (%) *
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="82"
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Family Annual Income (For Scholarships)
                  </label>
                  <select
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  >
                    {INCOME_OPTIONS.map((inc) => (
                      <option key={inc.id} value={inc.id}>
                        {inc.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category (Optional)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm"
                  >
                    <option value="General">General / Open</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Interests */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>Step 3 of 4: Select Your Interests</span>
              </div>
              <p className="text-xs text-slate-300">
                Choose the subjects and areas you find exciting. This fine-tunes your recommendations and career fit.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-700'
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
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>Step 4 of 4: What is your primary career goal?</span>
              </div>
              <p className="text-xs text-slate-300">
                Pick your dream destination. We will map out the exact step-by-step pathway from where you are today.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                {careers.map((career) => {
                  const isSelected = careerGoalId === career.id;
                  return (
                    <button
                      key={career.id}
                      type="button"
                      onClick={() => setCareerGoalId(career.id)}
                      className={`p-3.5 rounded-xl text-left border transition ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md ring-1 ring-emerald-400'
                          : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{career.icon}</div>
                      <div className="font-bold text-xs text-white">{career.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                        {career.description}
                      </div>
                      <div className="mt-2 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        💰 {career.avg_salary}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-700/80 pt-5">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 transition"
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
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition shadow-md cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-900 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-950" />
                <span>Generate My Career Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
