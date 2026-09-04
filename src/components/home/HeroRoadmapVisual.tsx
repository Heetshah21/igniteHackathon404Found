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
    <div className="relative w-full max-w-[560px] mx-auto min-h-[400px] sm:min-h-[460px] flex items-center justify-center select-none overflow-hidden rounded-3xl float-animate">

      {/* ── Outer glass shell ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      />

      {/* ── Ambient glow orbs inside card ─────────────────────────── */}
      <div
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'var(--lime-green)',
          filter: 'blur(72px)',
          opacity: 0.10,
          top: '-40px',
          right: '-20px',
        }}
      />
      <div
        className="absolute w-36 h-36 rounded-full pointer-events-none"
        style={{
          background: '#60A5FA',
          filter: 'blur(60px)',
          opacity: 0.10,
          bottom: '-20px',
          left: '0',
        }}
      />

      {/* ── Orbit ring decorations ────────────────────────────────── */}
      <div
        className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none"
        style={{
          border: '1px solid rgba(163,230,53,0.15)',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
      <div
        className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full pointer-events-none"
        style={{
          border: '1px dashed rgba(255,255,255,0.08)',
          right: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      {/* ── Floating accent icons ─────────────────────────────────── */}
      <div className="absolute top-8 right-14 pointer-events-none sparkle-animate" style={{ animationDelay: '0.5s' }}>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(163,230,53,0.18)',
            border: '1px solid rgba(163,230,53,0.35)',
            boxShadow: '0 0 14px rgba(163,230,53,0.25)',
          }}
        >
          <Send className="w-3.5 h-3.5 -rotate-45" style={{ color: 'var(--lime-green)' }} />
        </div>
      </div>
      <div className="absolute top-14 left-12 pointer-events-none sparkle-animate" style={{ animationDelay: '1.2s' }}>
        <Sparkles className="w-4 h-4" style={{ color: 'rgba(163,230,53,0.70)' }} />
      </div>
      <div className="absolute bottom-14 right-6 pointer-events-none sparkle-animate" style={{ animationDelay: '0.8s' }}>
        <Sparkles className="w-3.5 h-3.5" style={{ color: 'rgba(163,230,53,0.55)' }} />
      </div>

      {/* ── 3D Student Character ─────────────────────────────────────── */}
      <div className="relative z-20 flex-shrink-0 -mr-10 sm:-mr-8">
        <div className="relative w-[150px] sm:w-[190px] h-[220px] sm:h-[270px]">
          <Image
            src="/images/student.png"
            alt="CareerMitra Student"
            fill
            sizes="(max-width: 640px) 150px, 190px"
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* ── Career Roadmap Flowchart Container ───────────────────────── */}
      <div className="relative z-10 flex flex-col items-center space-y-2.5 w-[250px] sm:w-[290px]">

        {/* Step 1: Career Goal */}
        <div
          className="w-full rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-bold text-white"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(244, 114, 182, 0.20)', border: '1px solid rgba(244,114,182,0.40)' }}
          >
            <Target className="w-3 h-3 text-pink-400" />
          </div>
          <span>Career Goal</span>
        </div>

        {/* Connector */}
        <div className="w-0.5 h-3" style={{ background: 'rgba(163,230,53,0.60)' }} />

        {/* Step 2: Software Engineer */}
        <div
          className="w-full rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm"
          style={{
            background: 'rgba(163,230,53,0.20)',
            border: '1px solid rgba(163,230,53,0.45)',
            boxShadow: '0 4px 20px rgba(163,230,53,0.20), inset 0 1px 0 rgba(255,255,255,0.20)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <Code2 className="w-4 h-4" style={{ color: 'var(--lime-green)' }} />
          <span style={{ color: 'var(--lime-green)' }}>Software Engineer</span>
        </div>

        {/* Branching Connectors & Middle Cards */}
        <div className="w-full relative pt-2">
          <svg
            className="absolute -top-1 left-0 w-full h-4"
            fill="none"
            viewBox="0 0 300 16"
            preserveAspectRatio="none"
          >
            <path
              d="M 150 0 V 8 H 75 V 16 M 150 8 H 225 V 16"
              stroke="rgba(163,230,53,0.50)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2">
            {/* Skills Card */}
            <div
              className="rounded-xl p-2.5 text-left"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex items-center gap-1.5 font-bold text-[11px] text-white mb-1.5">
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center"
                  style={{ background: 'rgba(52,211,153,0.20)', border: '1px solid rgba(52,211,153,0.35)' }}
                >
                  <Brain className="w-3 h-3 text-emerald-400" />
                </div>
                <span>Skills</span>
              </div>
              <ul className="text-[10px] text-white/55 space-y-0.5 font-medium">
                <li>• Coding</li>
                <li>• Problem Solving</li>
                <li>• Data Structures</li>
              </ul>
            </div>

            {/* Education Card */}
            <div
              className="rounded-xl p-2.5 text-left"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex items-center gap-1.5 font-bold text-[11px] text-white mb-1.5">
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center"
                  style={{ background: 'rgba(129,140,248,0.20)', border: '1px solid rgba(129,140,248,0.35)' }}
                >
                  <GraduationCap className="w-3 h-3 text-violet-400" />
                </div>
                <span>Education</span>
              </div>
              <ul className="text-[10px] text-white/55 space-y-0.5 font-medium">
                <li>• B.Tech CSE</li>
                <li>• Relevant Courses</li>
                <li>• Certifications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Card */}
        <div
          className="w-full rounded-xl p-2.5 text-left"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <div className="flex items-center gap-1.5 font-bold text-[11px] text-white mb-1">
            <div
              className="w-4 h-4 rounded-md flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.20)', border: '1px solid rgba(251,191,36,0.35)' }}
            >
              <Briefcase className="w-3 h-3 text-amber-400" />
            </div>
            <span>Experience</span>
          </div>
          <div className="text-[10px] text-white/55 font-medium flex flex-wrap gap-x-2 gap-y-0.5">
            <span>• Projects</span>
            <span>• Internships</span>
            <span>• Practical Learning</span>
          </div>
        </div>

        {/* Down Connector */}
        <div className="w-0.5 h-2" style={{ background: 'rgba(163,230,53,0.60)' }} />

        {/* Step 4: Dream Job */}
        <div
          className="w-full rounded-xl px-3.5 py-2 flex items-center gap-2.5"
          style={{
            background: 'rgba(163,230,53,0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(163,230,53,0.35)',
            boxShadow: '0 4px 20px rgba(163,230,53,0.15), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center shadow-sm shrink-0"
            style={{
              background: 'var(--lime-green)',
              boxShadow: '0 0 12px rgba(163,230,53,0.50)',
            }}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#0A1F00]" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white leading-tight">Dream Job</div>
            <div className="text-[10px] text-white/55 font-medium" style={{ color: 'rgba(163,230,53,0.75)' }}>
              Your Future Starts Here!
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 ml-auto shrink-0" style={{ color: 'var(--lime-green)' }} />
        </div>

      </div>
    </div>
  );
};
