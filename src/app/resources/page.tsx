'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { getResources } from '@/lib/data/resources';
import { Resource } from '@/types';
import { matchResources } from '@/lib/recommendations/matcher';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
import {
  BookOpen,
  Search,
  ExternalLink,
  Languages,
  CheckCircle2,
  Sparkles,
  Video,
  FileText,
  Globe,
  Layers,
  Flame,
} from 'lucide-react';


const CATEGORIES = [
  'All',
  'Programming',
  'Web Development',
  'DSA',
  'Machine Learning',
  'Deep Learning',
  'Mathematics',
  'Physics',
  'Accountancy',
  'CA Foundation',
  'JEE',
  'NEET',
  'UPSC',
  'MPSC',
  'Career Guidance',
  'Interview Prep',
  'Projects',
  'Design',
  'Digital Marketing',
];

export default function ResourcesPage() {
  const { profile, language, setLanguage } = useStudent();
  const t = translations[language];

  const [dbResources, setDbResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    getResources().then(setDbResources);
  }, []);

  // Scored resources matched with student profile
  const scoredResources = useMemo(() => {
    return matchResources(dbResources, profile || {});
  }, [dbResources, profile]);

  // Combined and filtered
  const filteredResources = useMemo(() => {
    return (dbResources ?? []).filter((res) => {
      if (!res) return false;
      // Search
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = res.title?.toLowerCase().includes(term) ?? false;
        const matchesDesc = res.description?.toLowerCase().includes(term) || false;
        const matchesSubject = res.subject?.toLowerCase().includes(term) || false;
        const matchesTags = (res.tags ?? []).some((t) => t?.toLowerCase().includes(term));
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesTags) return false;
      }

      // Category
      if (selectedCategory !== 'All') {
        if (res.subject !== selectedCategory && !(res.tags ?? []).includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Language
      if (selectedLanguage !== 'All') {
        if (res.language !== selectedLanguage) return false;
      }

      // Type
      if (selectedType !== 'All') {
        if (res.type !== selectedType) return false;
      }

      return true;
    });
  }, [dbResources, searchTerm, selectedCategory, selectedLanguage, selectedType]);


  const typeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
      case 'playlist':
        return <Video className="w-4 h-4 text-red-500" />;
      case 'notes':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'course':
        return <Layers className="w-4 h-4 text-purple-500" />;
      default:
        return <Globe className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Banner */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.13)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.35)', color: '#60A5FA' }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.resources.badge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.resources.title}
              </h1>
              <p className="text-white/55 text-xs sm:text-sm max-w-2xl">
                {t.resources.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setSelectedLanguage('Hindi')}
                className="px-3 py-2 rounded-xl text-xs font-bold transition"
                style={selectedLanguage === 'Hindi' ? {
                  background: 'rgba(163,230,53,0.20)',
                  border: '1px solid rgba(163,230,53,0.45)',
                  color: 'var(--lime-green)',
                } : {
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                🇮🇳 हिंदी Resources
              </button>
              <button
                onClick={() => setSelectedLanguage('Marathi')}
                className="px-3 py-2 rounded-xl text-xs font-bold transition"
                style={selectedLanguage === 'Marathi' ? {
                  background: 'rgba(163,230,53,0.20)',
                  border: '1px solid rgba(163,230,53,0.45)',
                  color: 'var(--lime-green)',
                } : {
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                🚩 मराठी Resources
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div
          className="rounded-2xl p-4 sm:p-5 space-y-4"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.resources.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none transition"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
              />
            </div>

            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
            >
              <option value="All">{t.resources.allLanguages} (EN, HI, MR)</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Marathi">Marathi (मराठी)</option>
            </select>

            {/* Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
            >
              <option value="All">All Media Types</option>
              <option value="youtube">YouTube Video</option>
              <option value="playlist">YouTube Playlist</option>
              <option value="course">Full Course / Specialization</option>
              <option value="notes">Notes / Solutions</option>
              <option value="website">Interactive Website</option>
            </select>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0"
                  style={isSelected ? {
                    background: 'rgba(163,230,53,0.20)',
                    border: '1px solid rgba(163,230,53,0.40)',
                    color: 'var(--lime-green)',
                  } : {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.11)',
                    color: 'rgba(255,255,255,0.60)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => {
            return (
              <div
                key={res.id}
                className="rounded-2xl p-5 flex flex-col justify-between space-y-3 group transition hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(163,230,53,0.30)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {typeIcon(res.type)}
                      <span className="text-[11px] font-bold uppercase text-white/45">
                        {res.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          background: res.language === 'Marathi'
                            ? 'rgba(251,146,60,0.15)'
                            : res.language === 'Hindi'
                            ? 'rgba(252,211,77,0.15)'
                            : 'rgba(96,165,250,0.15)',
                          color: res.language === 'Marathi'
                            ? '#FB923C'
                            : res.language === 'Hindi'
                            ? '#FCD34D'
                            : '#60A5FA',
                        }}
                      >
                        {res.language}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{ background: 'rgba(163,230,53,0.15)', color: 'var(--lime-green)' }}
                      >
                        {t.common.free}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#A3E635] transition-colors line-clamp-2">
                      {res.title}
                    </h3>
                    <AudioButton
                      id={`res-speech-${res.id}`}
                      text={{
                        en: `${res.title}. ${res.subject ? `Subject: ${res.subject}.` : ''} Provider: ${res.provider || 'Free Community'}. Language: ${res.language}. ${res.description || ''}`,
                        hi: `${res.title}। ${res.subject ? `विषय: ${res.subject}।` : ''} प्रदाता: ${res.provider || 'फ्री कम्युनिटी'}। भाषा: ${res.language}। ${res.description || ''}`,
                      }}
                      label={t.common.listen}
                      variant="ghost"
                      size="xs"
                      className="text-white/50 hover:bg-white/10 shrink-0"
                      ariaLabel={`Listen to course details for ${res.title}`}
                    />
                  </div>

                  <p className="text-xs text-white/50 line-clamp-2">{res.description}</p>

                  <div className="text-[11px] font-semibold text-white/35">
                    {t.common.provider}: <span className="text-white/65">{res.provider || 'Free Community'}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {res.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition mt-2 btn-lime"
                >
                  <span>{t.resources.startLearning}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
