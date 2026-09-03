'use client';

import React from 'react';
import Link from 'next/link';
import { getAllSimulations } from '@/data/simulations';
import {
  Code,
  BarChart3,
  Scale,
  Clock,
  ArrowRight,
  Flag,
  Search,
  Zap,
  Eye,
  UserCheck,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  BarChart3,
  Scale,
};

const HOW_IT_WORKS = [
  { icon: Flag, label: 'Get a Real Situation' },
  { icon: Search, label: 'Investigate Information' },
  { icon: Zap, label: 'Make Decisions' },
  { icon: Eye, label: 'See the Consequences' },
  { icon: UserCheck, label: 'Reflect & Get Insights' },
];

export const SimulationHub: React.FC = () => {
  const simulations = getAllSimulations();

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #EBF4FF 0%, #F7FAFF 60%, #EEF5FF 100%)' }}
    >
      {/* ── Hero Section ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden text-center py-14 px-6"
        style={{
          background: 'linear-gradient(180deg, #D6E8FF 0%, #EBF4FF 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-blue-200/20 blur-2xl" />
          {/* Floating checkmark pills */}
          <div className="absolute top-8 right-12 w-10 h-10 rounded-xl bg-white/60 backdrop-blur shadow-sm flex items-center justify-center text-blue-600 text-lg font-black">✓</div>
          <div className="absolute top-20 left-8 w-9 h-9 rounded-xl bg-white/50 backdrop-blur shadow-sm flex items-center justify-center text-blue-400 text-base font-black">✓</div>
          <div className="absolute bottom-10 left-16 w-8 h-8 rounded-xl bg-white/40 backdrop-blur shadow-sm flex items-center justify-center text-blue-300 text-sm font-black">✓</div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            Career{' '}
            <span className="text-blue-600">Simulation</span>{' '}
            {/* Toggle pill */}
            <span className="inline-flex items-center ml-1 align-middle">
              <span
                className="relative inline-flex items-center w-14 h-7 rounded-full cursor-default shadow-inner"
                style={{ background: '#1677FF' }}
              >
                <span className="absolute right-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </span>
            </span>
          </h1>

          <p className="text-blue-700 font-extrabold text-xl tracking-tight">Try Before You Choose.</p>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-lg mx-auto">
            Experience real career situations, make decisions,<br />and discover the skills you naturally use.
          </p>
        </div>
      </div>

      {/* ── Cards Section ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* Sub-header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">C</span>
            </div>
            <span className="text-sm font-extrabold text-slate-800 tracking-tight">CareerMitra</span>
          </div>
          <button className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-200 bg-white rounded-full px-3 py-1.5 shadow-xs hover:border-blue-300 transition">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            How It Works
          </button>
        </div>

        <h2 className="text-center text-base font-bold text-slate-700 mb-6">
          Choose a career to start your simulation
        </h2>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {simulations.map((sim) => {
            const IconComponent = iconMap[sim.iconName] || Code;
            return (
              <div
                key={sim.id}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #1677FF 0%, #4096FF 100%)' }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title + Scenario */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      {sim.careerTitle}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{sim.scenarioTitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-normal flex-1">
                    {sim.shortDescription}
                  </p>

                  {/* Skill Tags */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Skills you&apos;ll use
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sim.skillsObserved.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {sim.estimatedTime}
                  </div>
                  <Link
                    href={`/simulator/${sim.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2 rounded-lg shadow-xs hover:opacity-90 transition"
                    style={{ background: '#1677FF' }}
                  >
                    Start Simulation
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── How It Works Strip ────────────────────────────── */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h3 className="text-sm font-extrabold text-slate-800 text-center mb-6">How It Works</h3>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center gap-2 text-center min-w-[80px]">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 leading-tight max-w-[80px]">
                      {step.label}
                    </span>
                  </div>
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-300 hidden sm:block shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
