'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSpeech } from '@/context/SpeechContext';
import { AudioLanguage, SpeechRate } from '@/types/speech';
import { Volume2, ChevronDown, Check, Gauge, Square } from 'lucide-react';

export const AudioLanguageSelector: React.FC = () => {
  const {
    audioLanguage,
    setAudioLanguage,
    audioRate,
    setAudioRate,
    isSpeaking,
    isPaused,
    stop,
    isSupported,
  } = useSpeech();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isSupported) {
    return null;
  }

  const speedOptions: SpeechRate[] = [0.75, 1, 1.25, 1.5];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-1">
        {/* Main Audio Selector Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          title="Change Text-to-Speech Language and Speed"
          className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition ${
            isSpeaking
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-400/20'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <Volume2
            className={`w-3.5 h-3.5 ${
              isSpeaking ? 'text-emerald-600 animate-pulse' : 'text-indigo-600'
            }`}
          />
          <span className="hidden md:inline text-[11px] text-slate-400 font-medium">
            Audio:
          </span>
          <span className="hidden sm:inline font-extrabold">
            {audioLanguage === 'hi-IN' ? 'हिंदी (Hindi)' : 'English'}
          </span>
          <span className="inline sm:hidden font-extrabold">
            {audioLanguage === 'hi-IN' ? 'हिंदी' : 'EN'}
          </span>
          {audioRate !== 1 && (
            <span className="text-[10px] px-1 bg-slate-200 text-slate-700 rounded font-semibold">
              {audioRate}×
            </span>
          )}
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {/* Quick Global Stop Button when speech is running */}
        {(isSpeaking || isPaused) && (
          <button
            type="button"
            onClick={stop}
            title="Stop Audio Speech"
            aria-label="Stop current audio"
            className="p-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition animate-in fade-in"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
          {/* Header */}
          <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            🔊 Text-to-Speech Settings
          </div>

          {/* Language Options */}
          <div className="py-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-500">
              Voice Language
            </div>
            <button
              type="button"
              onClick={() => {
                setAudioLanguage('en-IN');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition ${
                audioLanguage === 'en-IN'
                  ? 'text-emerald-700 bg-emerald-50/70 font-bold'
                  : 'text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🇮🇳</span>
                <span>English (Indian Accent)</span>
              </div>
              {audioLanguage === 'en-IN' && (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setAudioLanguage('hi-IN');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition ${
                audioLanguage === 'hi-IN'
                  ? 'text-emerald-700 bg-emerald-50/70 font-bold'
                  : 'text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🇮🇳</span>
                <span>हिंदी (Hindi Voice)</span>
              </div>
              {audioLanguage === 'hi-IN' && (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              )}
            </button>
          </div>

          {/* Speed / Rate Options */}
          <div className="border-t border-slate-100 pt-2 pb-1 px-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1.5">
              <Gauge className="w-3 h-3 text-indigo-600" />
              <span>Voice Speed</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {speedOptions.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setAudioRate(rate)}
                  className={`py-1 rounded-lg text-xs font-bold border transition ${
                    audioRate === rate
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rate}×
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
