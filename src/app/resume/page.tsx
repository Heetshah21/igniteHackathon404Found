'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { ResumeData } from '@/types';
import { translations } from '@/lib/translations';
import {
  FileText,
  Printer,
  Download,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Briefcase,
} from 'lucide-react';

export default function ResumePage() {
  const { user, profile, language } = useStudent();
  const t = translations[language];
  const printRef = useRef<HTMLDivElement>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    full_name: profile?.name || user?.email?.split('@')[0] || '',
    email: profile?.email || user?.email || '',
    phone: profile?.phone || '',
    location: profile?.location ? `${profile.location}, ${profile.state || 'India'}` : '',
    career_objective: profile?.career_goal
      ? `Motivated and ambitious student aiming to build a career as a ${profile.career_goal}. Passionate about continuous learning, problem solving, and professional development.`
      : 'Motivated student seeking opportunities to apply knowledge, learn core skills, and contribute effectively to impactful projects.',
    education: [
      {
        degree: profile?.education_level ? `${profile.education_level} ${profile.branch ? `(${profile.branch})` : ''}` : 'Secondary / Higher Secondary Education',
        institution: profile?.school_college || 'School / Institution Name',
        year: '2024 - 2026',
        score: profile?.percentage ? `${profile.percentage}%` : '80%',
      },
    ],
    skills: profile?.skills && profile.skills.length > 0 ? profile.skills : [
      'Problem Solving',
      'Team Collaboration',
      'Logical Thinking',
      'Computer Fundamentals',
    ],
    projects: [
      {
        title: 'Academic / Personal Project',
        description:
          'Developed a web/software project addressing practical problems with modern design and functional features.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
      },
    ],
    certifications: [
      'Foundational Skill Certification',
    ],
    achievements: [
      'Active participant in academic competitions and team projects',
    ],
    interests: profile?.interests && profile.interests.length > 0 ? profile.interests : ['Technology', 'Learning'],
  });

  // Pre-fill from active student profile
  useEffect(() => {
    if (profile) {
      setResumeData((prev) => ({
        ...prev,
        full_name: profile.name || prev.full_name,
        email: profile.email || prev.email,
        phone: profile.phone || prev.phone,
        location: profile.location ? `${profile.location}, ${profile.state || 'India'}` : prev.location,
        career_objective: profile.career_goal
          ? `Motivated student with a background in ${profile.education_level || 'Education'} ${profile.branch ? `(${profile.branch})` : ''}, aiming to build a career as a ${profile.career_goal}. Seeking opportunities to learn and apply technical skills.`
          : prev.career_objective,
        skills: profile.skills && profile.skills.length > 0 ? profile.skills : prev.skills,
        interests: profile.interests && profile.interests.length > 0 ? profile.interests : prev.interests,
      }));
    }
  }, [profile]);

  // Skill editing helpers
  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };
  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Project editing helpers
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const addProject = () => {
    if (projectTitle.trim() && projectDesc.trim()) {
      setResumeData((prev) => ({
        ...prev,
        projects: [...prev.projects, { title: projectTitle.trim(), description: projectDesc.trim() }],
      }));
      setProjectTitle('');
      setProjectDesc('');
    }
  };
  const removeProject = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Education helpers
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [score, setScore] = useState('');
  const addEducation = () => {
    if (degree.trim() && institution.trim()) {
      setResumeData((prev) => ({
        ...prev,
        education: [
          ...prev.education,
          { degree: degree.trim(), institution: institution.trim(), year: year.trim() || '2026', score: score.trim() },
        ],
      }));
      setDegree('');
      setInstitution('');
      setYear('');
      setScore('');
    }
  };
  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 text-[#0F1B3D] shadow-[var(--shadow-card)] border border-slate-200 print:hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>{t.resume.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F1B3D]">
                {t.resume.title}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
                {t.resume.subtitle}
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition self-start md:self-auto cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.resume.printResume}</span>
            </button>
          </div>
        </div>

        {/* Two-Column Editor: Left Form + Right Live ATS Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================================ */}
          {/* LEFT: RESUME FORM EDITOR (Hidden during print)              */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-6 print:hidden">
            {/* 1. Personal Contact Info */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                <span>1. Personal & Contact Info</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-600 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.full_name}
                    onChange={(e) => setResumeData({ ...resumeData, full_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-600 mb-1 block">Email</label>
                    <input
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 mb-1 block">Phone</label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-600 mb-1 block">Location</label>
                  <input
                    type="text"
                    value={resumeData.location}
                    onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-600 mb-1 block">Career Objective</label>
                  <textarea
                    rows={3}
                    value={resumeData.career_objective}
                    onChange={(e) => setResumeData({ ...resumeData, career_objective: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* 2. Skills Editor */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>2. Skills & Technologies</span>
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="e.g. React, SQL, Java..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 flex items-center gap-1.5 group"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(idx)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Projects Editor */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>3. Projects</span>
              </h3>

              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Project Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                />
                <textarea
                  rows={2}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Brief description of what you built and tech used..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={addProject}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-2 divide-y divide-slate-100 pt-2">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="pt-2 flex items-start justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{proj.title}</div>
                      <div className="text-slate-500 mt-0.5 line-clamp-2">{proj.description}</div>
                    </div>
                    <button
                      onClick={() => removeProject(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Education Editor */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>4. Education Entries</span>
              </h3>

              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Degree / Examination (e.g. 12th Science)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="School / College Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year (2024 - 2026)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    type="text"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Percentage / CGPA (82%)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-2 divide-y divide-slate-100 pt-2">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="pt-2 flex items-start justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-500">
                        {edu.institution} • {edu.year} {edu.score ? `(${edu.score})` : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => removeEducation(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: LIVE ATS-COMPLIANT RESUME TEMPLATE (Print Canvas)     */}
          {/* ============================================================ */}
          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-2 print:hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Live ATS-Friendly Document Preview</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Standard 8.5&quot; x 11&quot; Single-Column Format
                </span>
              </div>

              {/* The Actual Resume Sheet */}
              <div className="overflow-x-auto w-full">
                <div
                  ref={printRef}
                  id="resume-document"
                  className="bg-white p-4 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200 text-slate-900 font-sans space-y-6 text-xs sm:text-sm print:p-0 print:shadow-none print:border-none print:rounded-none min-w-0"
                >
                {/* Header Section */}
                <div className="text-center space-y-1.5 border-b-2 border-slate-800 pb-4">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase text-slate-950">
                    {resumeData.full_name}
                  </h1>
                  <div className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-medium">
                    <span>{resumeData.email}</span>
                    <span>•</span>
                    <span>{resumeData.phone}</span>
                    <span>•</span>
                    <span>{resumeData.location}</span>
                  </div>
                </div>

                {/* Objective */}
                {resumeData.career_objective && (
                  <div className="space-y-1">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                      Career Objective
                    </h2>
                    <p className="text-xs text-slate-700 leading-relaxed pt-1">
                      {resumeData.career_objective}
                    </p>
                  </div>
                )}

                {/* Education */}
                {(resumeData.education ?? []).length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                      Education
                    </h2>
                    <div className="space-y-2 pt-1">
                      {(resumeData.education ?? []).map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-start text-xs">
                          <div>
                            <div className="font-bold text-slate-900">{edu?.degree}</div>
                            <div className="text-slate-600">{edu?.institution}</div>
                          </div>
                          <div className="text-right text-slate-600 shrink-0 font-medium">
                            <div>{edu?.year}</div>
                            {edu?.score && <div className="font-bold text-slate-800">{edu.score}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Skills */}
                {(resumeData.skills ?? []).length > 0 && (
                  <div className="space-y-1">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                      Skills & Competencies
                    </h2>
                    <div className="text-xs text-slate-700 leading-relaxed pt-1">
                      <span className="font-bold">Key Skills: </span>
                      {(resumeData.skills ?? []).join(', ')}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {(resumeData.projects ?? []).length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                      Projects
                    </h2>
                    <div className="space-y-2.5 pt-1">
                      {(resumeData.projects ?? []).map((proj, idx) => (
                        <div key={idx} className="text-xs space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900">{proj?.title}</span>
                            {proj?.technologies && (
                              <span className="text-[11px] text-slate-500 font-medium">
                                [{(proj.technologies ?? []).join(', ')}]
                              </span>
                            )}
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            • {proj?.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications & Achievements */}
                {(resumeData.certifications ?? []).length > 0 && (
                  <div className="space-y-1">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                      Certifications & Courses
                    </h2>
                    <ul className="text-xs text-slate-700 space-y-1 pt-1 list-disc list-inside">
                      {(resumeData.certifications ?? []).map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {(resumeData.achievements ?? []).length > 0 && (
                  <div className="space-y-1">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                      Achievements & Honors
                    </h2>
                    <ul className="text-xs text-slate-700 space-y-1 pt-1 list-disc list-inside">
                      {(resumeData.achievements ?? []).map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
