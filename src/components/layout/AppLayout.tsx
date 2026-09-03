'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStudent } from '@/context/StudentContext';
import { translations } from '@/lib/translations';
import {
  Compass,
  GraduationCap,
  BookOpen,
  GitCompare,
  FileText,
  Trophy,
  Bot,
  LayoutDashboard,
  UserCheck,
  Languages,
  RotateCcw,
  Menu,
  Sparkles,
  ChevronRight,
  Bell,
} from 'lucide-react';

export const Navbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { profile, language, setLanguage, resetToDemo } = useStudent();
  const t = translations[language];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E6EBF5] h-[72px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#1769FF] flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#101D35]">
                Career<span className="text-[#1769FF]">Mitra</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Clean & Minimal (Marketing links removed as instructed) */}
        <div className="hidden lg:flex items-center gap-6" />

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E6EBF5] bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#1769FF]" />
              <span className="hidden sm:inline">{language}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-36 bg-white border border-[#E6EBF5] rounded-xl shadow-lg py-1 z-50 animate-in fade-in"
                onClick={() => setLangMenuOpen(false)}
              >
                {(['English', 'Hindi', 'Marathi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-blue-50 hover:text-[#1769FF] ${
                      language === lang ? 'bg-blue-50 text-[#1769FF] font-bold' : 'text-slate-700'
                    }`}
                  >
                    {lang === 'Hindi' ? 'हिंदी (Hindi)' : lang === 'Marathi' ? 'मराठी (Marathi)' : 'English'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Demo Student */}
          <button
            onClick={resetToDemo}
            className="hidden md:flex items-center gap-1 text-xs text-slate-600 hover:text-[#1769FF] px-2.5 py-1.5 rounded-lg border border-dashed border-[#E6EBF5] hover:border-blue-300 hover:bg-blue-50/50 transition"
            title="Reset to Demo Student (Rahul Sharma)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-[#1769FF] bg-white border border-[#1769FF] rounded-xl hover:bg-blue-50/50 transition"
          >
            Login
          </Link>

          {/* Get Started Button */}
          <Link
            href="/signup"
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-[#1769FF] rounded-xl hover:bg-blue-600 transition shadow-xs"
          >
            Get Started
          </Link>

          {/* Notification Bell */}
          <button
            className="p-2 text-slate-600 hover:text-[#101D35] hover:bg-slate-100 rounded-xl transition relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#1769FF]" />
          </button>

          {/* Student Profile Avatar */}
          <Link
            href="/onboarding"
            className="w-8 h-8 rounded-full bg-[#EAF2FF] text-[#1769FF] font-bold text-xs flex items-center justify-center border border-blue-200 hover:ring-2 hover:ring-blue-300 transition shadow-2xs"
            title={`${profile?.name || 'Rahul Sharma'} - Edit Profile`}
          >
            {profile?.name?.charAt(0) || 'R'}
          </Link>
        </div>
      </div>
    </header>
  );
};

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { language, profile } = useStudent();
  const t = translations[language];

  const navItems = [
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard, color: 'text-[#1769FF]' },
    { href: '/roadmap', label: t.nav.roadmap, icon: Compass, color: 'text-emerald-500', badge: 'P0', hasChevron: true },
    { href: '/scholarships', label: t.nav.scholarships, icon: GraduationCap, color: 'text-amber-500', badge: 'Eligible', hasChevron: true },
    { href: '/resources', label: t.nav.resources, icon: BookOpen, color: 'text-blue-500' },
    { href: '/compare', label: t.nav.compare, icon: GitCompare, color: 'text-purple-500' },
    { href: '/resume', label: t.nav.resume, icon: FileText, color: 'text-teal-500', badge: 'ATS' },
    { href: '/opportunities', label: t.nav.opportunities, icon: Trophy, color: 'text-orange-500' },
    { href: '/chat', label: t.nav.chat, icon: Bot, color: 'text-pink-500', highlight: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden backdrop-blur-xs animate-in fade-in"
        />
      )}

      <aside
        className={`fixed top-[72px] bottom-0 left-0 z-40 w-[280px] bg-white border-r border-[#E6EBF5] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Current Goal Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E6EBF5] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 font-medium mb-1.5 text-xs">
              <span className="text-slate-500 font-medium">Current Goal:</span>
              <span className="text-[10px] font-bold text-[#0B7A48] bg-[#DDF7EA] px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="font-bold text-[#101D35] text-sm flex items-center gap-1.5 mb-2">
              <span className="text-sm">🎯</span>
              <span className="truncate">{profile?.career_goal || 'Software Engineer'}</span>
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 bg-[#EAF2FF] text-[#1769FF] rounded-md text-[11px] font-semibold flex items-center gap-1 border border-blue-100">
                <GraduationCap className="w-3 h-3 text-[#1769FF]" />
                <span>
                  {profile?.education_level || '12th'} • {profile?.branch ? (profile.branch === 'science' ? 'Science' : profile.branch) : 'Science'}
                </span>
              </span>
              <span className="px-2 py-0.5 bg-[#FDEAF6] text-[#B3206A] rounded-md text-[11px] font-semibold flex items-center gap-1 border border-pink-100">
                <span>📍</span>
                <span>{profile?.location || 'Nashik'}</span>
              </span>
            </div>
          </div>

          {/* Navigation Label */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BAB] px-3 py-1">
            Navigation
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isCurrent = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group border ${
                      isCurrent
                        ? 'bg-[#1769FF] text-white border-[#1769FF] shadow-sm shadow-blue-500/20'
                        : 'bg-gradient-to-r from-[#FFF0FA] to-[#F1EDFF] border-[#F5D8EE] text-[#101D35] hover:from-[#FDEAF6] hover:to-[#EBE7FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-pink-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    <Sparkles className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-pink-500'}`} />
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isCurrent
                      ? 'bg-[#1769FF] text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                        isCurrent ? 'text-white' : item.color
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isCurrent
                            ? 'bg-blue-700 text-blue-100'
                            : 'bg-[#DDF7EA] text-[#0B7A48]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isCurrent ? (
                      <ChevronRight className="w-4 h-4 text-white" />
                    ) : item.hasChevron ? (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile / onboarding settings link */}
        <div className="p-4 border-t border-[#E6EBF5] bg-slate-50/50">
          <Link
            href="/onboarding"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-[#1769FF] border border-transparent hover:border-[#E6EBF5] transition"
          >
            <UserCheck className="w-4 h-4 text-[#1769FF]" />
            <div>
              <div className="font-bold text-[#101D35]">Edit Student Profile</div>
              <div className="text-[10px] text-slate-500">Change branch, state, marks</div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FE] flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:pl-[280px] transition-all w-full min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1250px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
