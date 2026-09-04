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
  Zap,
} from 'lucide-react';

import { AudioLanguageSelector } from '@/components/common/AudioLanguageSelector';

export const Navbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { profile, language, setLanguage, isAuthenticated } = useStudent();
  const t = translations[language];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <header className="navbar-glass sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-lime-green flex items-center justify-center shadow-[0_0_16px_rgba(163,230,53,0.45)] group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(163,230,53,0.60)] transition-all shrink-0"
              style={{ background: 'var(--lime-green)' }}>
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A1F00]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  CAREER<span style={{ color: 'var(--lime-green)' }}>Mitra</span>
                </span>
                <span className="hidden xs:inline text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full badge-lime">
                  Bharat
                </span>
              </div>
              <p className="text-[11px] text-white/55 font-medium hidden md:block">
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
              className="flex items-center gap-1 text-xs font-semibold px-2 sm:px-2.5 py-1.5 rounded-xl glass-light text-white/80 hover:text-white hover:bg-white/10 transition"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5" style={{ color: 'var(--lime-green)' }} />
              <span className="hidden sm:inline">{language}</span>
              <span className="inline sm:hidden text-[11px] font-bold">{language === 'Hindi' ? 'HI' : language === 'Marathi' ? 'MR' : 'EN'}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-40 glass rounded-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onClick={() => setLangMenuOpen(false)}
              >
                {(['English', 'Hindi', 'Marathi'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium transition rounded-lg ${language === lang
                      ? 'text-[#A3E635] font-bold bg-white/10'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {lang === 'Hindi' ? 'हिंदी (Hindi)' : lang === 'Marathi' ? 'मराठी (Marathi)' : 'English'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Student Profile Quick View Badge or Auth Actions */}
          {isAuthenticated && profile ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 p-1 sm:pl-2 sm:pr-3 sm:py-1 rounded-full glass-light hover:bg-white/10 transition text-left shrink-0"
              title="View Profile"
            >
              <div className="w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center shrink-0 text-[#0A1F00]"
                style={{ background: 'var(--lime-green)', boxShadow: '0 0 10px rgba(163,230,53,0.40)' }}>
                {profile.name?.charAt(0) || 'S'}
              </div>
              <div className="hidden md:block text-xs">
                <div className="font-semibold text-white leading-tight flex items-center gap-1.5">
                  <span>{profile.name?.split(' ')[0] || 'Student'}</span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--lime-green)' }}></span>
                </div>
                <div className="text-[10px] text-white/50 font-medium leading-none truncate max-w-[110px]">
                  {profile.education_level || 'Profile'} {profile.state ? `• ${profile.state}` : ''}
                </div>
              </div>
            </Link>
          ) : !isAuthenticated ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white/70 hover:text-white transition"
              >
                {t.nav.login || 'Sign In'}
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0A1F00] rounded-xl shadow-xs transition btn-lime"
              >
                <Zap className="w-3 h-3" />
                Sign Up
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { language, profile, isAuthenticated, logout } = useStudent();
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
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard, color: 'text-sky-400' },
    { href: '/simulator', label: (t.nav as Record<string, string>).simulator || 'Try Simulator', icon: Briefcase, color: 'text-purple-400', badge: 'NEW' },
    { href: '/roadmap', label: t.nav.roadmap, icon: Compass, color: 'text-emerald-400' },
    { href: '/scholarships', label: t.nav.scholarships, icon: GraduationCap, color: 'text-amber-400' },
    { href: '/resources', label: t.nav.resources, icon: BookOpen, color: 'text-blue-400' },
    { href: '/compare', label: t.nav.compare, icon: GitCompare, color: 'text-violet-400' },
    { href: '/opportunities', label: t.nav.opportunities, icon: Trophy, color: 'text-orange-400' },
    { href: '/resume', label: t.nav.resume, icon: FileText, color: 'text-teal-400' },
    { href: '/chat', label: t.nav.chat, icon: Bot, color: 'text-pink-400', highlight: true },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`sidebar-glass fixed top-16 bottom-0 left-0 z-40 w-64 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
      >
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Mobile drawer header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-white/40">Navigation</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive
                    ? 'bg-[rgba(163,230,53,0.15)] border border-[rgba(163,230,53,0.35)] text-[#A3E635] font-bold shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                    : 'text-white/65 hover:bg-white/08 hover:text-white border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#A3E635]' : item.color}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${isActive
                        ? 'bg-[rgba(163,230,53,0.25)] text-[#A3E635]'
                        : 'bg-white/10 text-white/60'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile / onboarding settings & Sign Out */}
        {isAuthenticated ? (
          <div className="p-3 border-t border-white/08 space-y-1" style={{ background: 'rgba(0,0,0,0.20)' }}>
            <Link
              href="/profile"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${pathname === '/profile'
                ? 'bg-[rgba(163,230,53,0.15)] text-[#A3E635] border border-[rgba(163,230,53,0.30)]'
                : 'text-white/65 hover:bg-white/08 hover:text-white border border-transparent'
                }`}
            >
              <User className="w-4 h-4" style={{ color: 'var(--lime-green)' }} />
              <div>
                <div className="font-bold text-white">{t.nav.profile || 'Your Profile'}</div>
                <div className="text-[10px] text-white/40">View personal data & status</div>
              </div>
            </Link>

            <Link
              href="/onboarding"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-white/65 hover:bg-white/08 hover:text-white border border-transparent transition"
            >
              <UserCheck className="w-4 h-4 text-white/40" />
              <div>
                <div className="font-bold text-white">Edit Student Profile</div>
                <div className="text-[10px] text-white/40">Change branch, state, marks</div>
              </div>
            </Link>

            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span className="font-bold">{t.nav.logout}</span>
            </button>
          </div>
        ) : (
          <div className="p-3 border-t border-white/08 space-y-2" style={{ background: 'rgba(0,0,0,0.20)' }}>
            <Link
              href="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold glass-light text-white hover:bg-white/10 transition"
            >
              <User className="w-4 h-4" style={{ color: 'var(--lime-green)' }} />
              <span>{t.nav.login || 'Sign In'}</span>
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#0A1F00] btn-lime transition shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export const AppLayout: React.FC<{
  children: React.ReactNode;
  requireAuth?: boolean;
}> = ({ children, requireAuth = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, profile } = useStudent();

  // Root landing page is public and never forces redirect
  const isPublicPage = !requireAuth || pathname === '/';

  useEffect(() => {
    if (!isLoading && !isPublicPage) {
      if (!isAuthenticated) {
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
      } else if (profile && !profile.onboarding_completed) {
        router.push('/onboarding');
      }
    }
  }, [isLoading, isAuthenticated, profile, pathname, router, isPublicPage]);

  if (isLoading && !isPublicPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#A3E635] border-t-transparent rounded-full animate-spin mb-4"
          style={{ boxShadow: '0 0 20px rgba(163,230,53,0.40)' }} />
        <p className="text-sm font-semibold text-white/60">Loading CareerMitra...</p>
      </div>
    );
  }

  if (!isPublicPage && (!isAuthenticated || (profile && !profile.onboarding_completed))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#A3E635] border-t-transparent rounded-full animate-spin mb-4"
          style={{ boxShadow: '0 0 20px rgba(163,230,53,0.40)' }} />
        <p className="text-sm font-semibold text-white/60">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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
