'use client';

import React from 'react';
import Image from 'next/image';
import {
  Target,
  Code2,
  Brain,
  GraduationCap,
  Briefcase,
  Sparkles,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const HeroRoadmapVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[560px] mx-auto min-h-[440px] flex items-center justify-center select-none">
      {/* Background Orbit Ring */}
      <div className="absolute w-[400px] h-[400px] sm:w-[460px] sm:h-[460px] rounded-full border border-blue-200/50 -right-4 pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-blue-200/40 -right-4 pointer-events-none" />

      {/* Decorative Floating Accents */}
      <div className="absolute top-8 right-16 text-blue-400 rotate-12 pointer-events-none">
        <Send className="w-5 h-5 -rotate-45 text-[#1769FF]" />
      </div>
      <div className="absolute top-12 left-16 text-blue-300 pointer-events-none">
        <Sparkles className="w-4 h-4 text-blue-400" />
      </div>
      <div className="absolute bottom-16 right-4 text-blue-300 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
      </div>

      {/* 3D Student Character */}
      <div className="relative z-20 flex-shrink-0 -mr-10 sm:-mr-8">
        <div className="relative w-[150px] sm:w-[190px] h-[220px] sm:h-[270px]">
          <Image
            src="/images/student.png"
            alt="CareerMitra Student"
            fill
            sizes="(max-width: 640px) 150px, 190px"
            priority
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Career Roadmap Flowchart Container */}
      <div className="relative z-10 flex flex-col items-center space-y-3 w-[260px] sm:w-[300px]">
        {/* Step 1: Career Goal */}
        <div className="bg-white border border-[#E6EBF5] shadow-xs rounded-xl px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold text-[#101D35] hover:shadow-md transition">
          <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
            <Target className="w-3 h-3 text-rose-600" />
          </div>
          <span>Career Goal</span>
        </div>

        {/* Down Arrow / Connector */}
        <div className="w-0.5 h-3 bg-[#1769FF]" />

        {/* Step 2: Software Engineer (Solid Blue) */}
        <div className="w-full bg-[#1769FF] text-white shadow-md shadow-blue-500/25 rounded-xl px-4 py-2 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm">
          <Code2 className="w-4 h-4 text-blue-100" />
          <span>Software Engineer</span>
        </div>

        {/* Branching Connectors & Middle Cards: Skills & Education */}
        <div className="w-full relative pt-2">
          {/* SVG Connector Lines from Software Engineer to Skills and Education */}
          <svg
            className="absolute -top-1 left-0 w-full h-4 text-[#1769FF]"
            fill="none"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
          >
            <path
              d="M 150 0 V 8 H 75 V 16 M 150 8 H 225 V 16"
              stroke="#1769FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2">
            {/* Skills Card */}
            <div className="bg-white border border-[#E6EBF5] shadow-xs rounded-xl p-2.5 text-left hover:shadow-md transition">
              <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#101D35] mb-1.5">
                <div className="w-4 h-4 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Brain className="w-3 h-3" />
                </div>
                <span>Skills</span>
              </div>
              <ul className="text-[10px] text-slate-600 space-y-0.5 font-medium">
                <li>• Coding</li>
                <li>• Problem Solving</li>
                <li>• Data Structures</li>
              </ul>
            </div>

            {/* Education Card */}
            <div className="bg-white border border-[#E6EBF5] shadow-xs rounded-xl p-2.5 text-left hover:shadow-md transition">
              <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#101D35] mb-1.5">
                <div className="w-4 h-4 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-3 h-3" />
                </div>
                <span>Education</span>
              </div>
              <ul className="text-[10px] text-slate-600 space-y-0.5 font-medium">
                <li>• B.Tech CSE</li>
                <li>• Relevant Courses</li>
                <li>• Certifications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Card */}
        <div className="w-full relative pt-1">
          <div className="bg-white border border-[#E6EBF5] shadow-xs rounded-xl p-2.5 text-left hover:shadow-md transition w-full">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#101D35] mb-1">
              <div className="w-4 h-4 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                <Briefcase className="w-3 h-3" />
              </div>
              <span>Experience</span>
            </div>
            <div className="text-[10px] text-slate-600 font-medium flex flex-wrap gap-x-2 gap-y-0.5">
              <span>• Projects</span>
              <span>• Internships</span>
              <span>• Practical Learning</span>
            </div>
          </div>
        </div>

        {/* Down Connector */}
        <div className="w-0.5 h-2 bg-[#1769FF]" />

        {/* Step 4: Dream Job */}
        <div className="bg-white border border-[#E6EBF5] shadow-xs rounded-xl px-3.5 py-1.5 flex items-center gap-2.5 text-left hover:shadow-md transition">
          <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#101D35] leading-tight">
              Dream Job
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Your Future Starts Here!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
