'use client';

import React, { useId } from 'react';
import { useSpeech } from '@/context/SpeechContext';
import { AudioButtonProps } from '@/types/speech';
import { Volume2, Pause, Play, Square, Loader2 } from 'lucide-react';

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  id: customId,
  label = 'Listen',
  language,
  size = 'sm',
  variant = 'primary',
  className = '',
  ariaLabel,
}) => {
  const generatedId = useId();
  const buttonId = customId || generatedId;

  const {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    currentId,
    audioLanguage,
  } = useSpeech();

  const isCurrentActive = currentId === buttonId;
  const isCurrentSpeaking = isCurrentActive && isSpeaking && !isPaused;
  const isCurrentPaused = isCurrentActive && isPaused;

  if (!isSupported) {
    return (
      <button
        disabled
        title="Speech synthesis is not supported on this browser"
        aria-label="Text to speech not supported"
        className={`opacity-40 cursor-not-allowed inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200 ${className}`}
      >
        <Volume2 className="w-3.5 h-3.5" />
        <span>{label}</span>
      </button>
    );
  }

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentPaused) {
      resume();
    } else if (isCurrentSpeaking) {
      pause();
    } else {
      speak(text, { id: buttonId, language });
    }
  };

  const handleStopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    stop();
  };

  // Size styles
  const sizeClasses = {
    xs: 'text-[10px] px-2 py-1 gap-1',
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2',
    lg: 'text-sm sm:text-base px-4 py-2.5 gap-2',
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  }[size];

  // Active playing/paused UI with split Pause/Resume + Stop
  if (isCurrentActive && (isCurrentSpeaking || isCurrentPaused)) {
    return (
      <div
        className={`inline-flex items-center rounded-xl p-0.5 border shadow-xs transition-all ${
          isCurrentSpeaking
            ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30'
            : 'bg-amber-50 border-amber-300'
        } ${className}`}
      >
        {/* Pause / Resume Button */}
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label={
            isCurrentSpeaking
              ? ariaLabel || 'Pause speech'
              : ariaLabel || 'Resume speech'
          }
          className={`flex items-center ${sizeClasses} rounded-lg font-bold transition ${
            isCurrentSpeaking
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          {isCurrentSpeaking ? (
            <>
              <Pause className={`${iconSizes} animate-pulse`} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className={iconSizes} />
              <span>Resume</span>
            </>
          )}
        </button>

        {/* Stop Button */}
        <button
          type="button"
          onClick={handleStopClick}
          aria-label="Stop audio speech"
          title="Stop Speech"
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition ml-0.5"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    );
  }

  // Variant styles for Idle state
  const variantClasses = {
    primary:
      'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 hover:border-indigo-300 shadow-2xs',
    secondary:
      'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 hover:border-emerald-300 shadow-2xs',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent',
    'icon-only':
      'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full p-2 border border-slate-200',
    badge:
      'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-full font-bold',
  }[variant];

  const defaultAriaLabel =
    ariaLabel || (audioLanguage === 'hi-IN' ? `यह जानकारी सुनें (${label})` : `Listen to ${label}`);

  return (
    <button
      type="button"
      onClick={handlePlayClick}
      aria-label={defaultAriaLabel}
      title={audioLanguage === 'hi-IN' ? 'आवाज़ में सुनें (Listen in Hindi)' : 'Listen to content (Text to Speech)'}
      className={`inline-flex items-center justify-center font-bold rounded-xl transition-all cursor-pointer hover:scale-102 active:scale-98 ${sizeClasses} ${variantClasses} ${className}`}
    >
      <Volume2 className={`${iconSizes} text-current shrink-0`} />
      {variant !== 'icon-only' && <span>{label}</span>}
    </button>
  );
};
