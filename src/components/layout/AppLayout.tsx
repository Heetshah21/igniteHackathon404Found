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
  X,
  Sparkles,
  LogOut,
} from 'lucide-react';

export const Navbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { profile, language, setLanguage } = useStudent();
  const t = translations[language];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-700 bg-clip-text text-transparent">
                  CAREER<span className="text-amber-600">Mitra</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Bharat MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
              title="Change Language"
            >
              <Languages className="w-4 h-4 text-indigo-600" />
              <span>{language}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1"
                onClick={() => setLangMenuOpen(false)}
              >
                {(['English', 'Hindi', 'Marathi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-700 ${
                      language === lang ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    {lang === 'Hindi' ? 'हिंदी (Hindi)' : lang === 'Marathi' ? 'मराठी (Marathi)' : 'English'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Student Profile Quick View Badge */}
          {profile && (
            <Link
              href="/onboarding"
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100/90 transition text-left"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {profile.name?.charAt(0) || 'S'}
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-semibold text-slate-800 leading-tight flex items-center gap-1">
                  <span>{profile.name?.split(' ')[0] || 'Student'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium leading-none truncate max-w-[110px]">
                  {profile.education_level || 'Profile'} {profile.state ? `• ${profile.state}` : ''}
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { language, profile, logout } = useStudent();
  const t = translations[language];

  const navItems = [
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard, color: 'text-indigo-600' },
    { href: '/roadmap', label: t.nav.roadmap, icon: Compass, color: 'text-emerald-600', badge: 'P0' },
    { href: '/scholarships', label: t.nav.scholarships, icon: GraduationCap, color: 'text-amber-600', badge: 'Eligible' },
    { href: '/resources', label: t.nav.resources, icon: BookOpen, color: 'text-blue-600' },
    { href: '/compare', label: t.nav.compare, icon: GitCompare, color: 'text-purple-600' },
    { href: '/resume', label: t.nav.resume, icon: FileText, color: 'text-teal-600', badge: 'ATS' },
    { href: '/opportunities', label: t.nav.opportunities, icon: Trophy, color: 'text-orange-600' },
    { href: '/chat', label: t.nav.chat, icon: Bot, color: 'text-pink-600', highlight: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs animate-in fade-in"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-1 overflow-y-auto">
          {/* Student Status Summary Card */}
          {profile && (
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-emerald-100/80 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-medium mb-1">
                <span>Current Goal:</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                🎯 {profile.career_goal || 'Set Goal'}
              </p>
              <div className="mt-2 text-[11px] text-slate-600 flex flex-wrap gap-1">
                {profile.education_level && (
                  <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200">
                    {profile.education_level} {profile.branch ? `• ${profile.branch}` : ''}
                  </span>
                )}
                {profile.state && (
                  <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200">
                    📍 {profile.state}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Navigation
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : item.highlight
                      ? 'bg-gradient-to-r from-pink-50 to-indigo-50 text-slate-800 hover:bg-pink-100 border border-pink-200/60'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : item.color
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile / onboarding settings & Sign Out */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2">
          <Link
            href="/onboarding"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-emerald-700 border border-transparent hover:border-slate-200 transition"
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="font-bold text-slate-800">Edit Student Profile</div>
              <div className="text-[10px] text-slate-500">Change branch, state, marks</div>
            </div>
          </Link>

          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span className="font-bold">{t.nav.logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:pl-64 transition-all w-full min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
