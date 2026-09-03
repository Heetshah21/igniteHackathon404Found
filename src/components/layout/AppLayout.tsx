'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  User,
  UserCheck,
  Languages,
  RotateCcw,
  Menu,
  X,
  Sparkles,
  Briefcase,
  LogOut,
} from 'lucide-react';

import { AudioLanguageSelector } from '@/components/common/AudioLanguageSelector';

export const Navbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { profile, language, setLanguage } = useStudent();
  const t = translations[language];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0F1B3D]">
                  CAREER<span className="text-[#2563EB]">Mitra</span>
                </span>
                <span className="hidden xs:inline text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                  Bharat
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                {t.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* TTS Audio Language & Speed Control */}
          <AudioLanguageSelector />

          {/* Quick UI Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-semibold px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden sm:inline">{language}</span>
              <span className="inline sm:hidden text-[11px] font-bold">{language === 'Hindi' ? 'HI' : language === 'Marathi' ? 'MR' : 'EN'}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onClick={() => setLangMenuOpen(false)}
              >
                {(['English', 'Hindi', 'Marathi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-blue-50 hover:text-blue-700 transition rounded-lg mx-0 ${language === lang ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
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
              href="/profile"
              className="flex items-center gap-2 p-1 sm:pl-2 sm:pr-3 sm:py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition text-left shrink-0"
              title="View Profile"
            >
              <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0">
                {profile.name?.charAt(0) || 'S'}
              </div>
              <div className="hidden md:block text-xs">
                <div className="font-semibold text-slate-800 leading-tight flex items-center gap-1.5">
                  <span>{profile.name?.split(' ')[0] || 'Student'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard, color: 'text-blue-600' },
    { href: '/simulator', label: (t.nav as Record<string, string>).simulator || 'Try Simulator', icon: Briefcase, color: 'text-indigo-600', badge: 'NEW' },
    { href: '/roadmap', label: t.nav.roadmap, icon: Compass, color: 'text-emerald-600', badge: 'P0' },
    { href: '/scholarships', label: t.nav.scholarships, icon: GraduationCap, color: 'text-amber-600', badge: 'Eligible' },
    { href: '/resources', label: t.nav.resources, icon: BookOpen, color: 'text-sky-600' },
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
          className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
          }`}
      >
        <div className="p-3 space-y-1 overflow-y-auto">
          {/* Student Status Summary Card */}
          {profile && (
            <div className="mb-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-medium mb-1">
                <span>Current Goal:</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">Active</span>
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

          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-2">
            Navigation
          </div>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all group ${isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80'
                      : item.highlight
                        ? 'bg-gradient-to-r from-pink-50/60 to-indigo-50/60 text-slate-700 hover:from-pink-50 hover:to-indigo-50 border border-transparent'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-[18px] h-[18px] transition-transform group-hover:scale-105 ${isActive ? 'text-blue-600' : item.color
                        }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile / onboarding settings & Sign Out */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/30 space-y-1">
          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
              pathname === '/profile'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-white hover:text-blue-700 border border-transparent hover:border-slate-200'
            }`}
          >
            <User className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-bold text-slate-700">{t.nav.profile || 'Your Profile'}</div>
              <div className="text-[10px] text-slate-400">View personal data & status</div>
            </div>
          </Link>

          <Link
            href="/onboarding"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-blue-700 border border-transparent hover:border-slate-200 transition"
          >
            <UserCheck className="w-4 h-4 text-slate-500" />
            <div>
              <div className="font-bold text-slate-700">Edit Student Profile</div>
              <div className="text-[10px] text-slate-400">Change branch, state, marks</div>
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
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, profile } = useStudent();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
      } else if (profile && !profile.onboarding_completed) {
        router.push('/onboarding');
      }
    }
  }, [isLoading, isAuthenticated, profile, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500">Loading CareerMitra...</p>
      </div>
    );
  }

  if (!isAuthenticated || (profile && !profile.onboarding_completed)) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:pl-64 transition-all w-full min-w-0">
          <div className="p-3.5 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
