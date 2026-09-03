// ============================================================
// CAREERMitra — Text-to-Speech (TTS) Type Definitions
// ============================================================

export type AudioLanguage = 'en-IN' | 'hi-IN';

export type SpeechRate = 0.75 | 1 | 1.25 | 1.5;

export interface MultilingualText {
  en: string;
  hi?: string;
}

export interface SpeechControls {
  speak: (
    text: string | MultilingualText,
    options?: {
      id?: string;
      language?: AudioLanguage;
      rate?: number;
    }
  ) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentId: string | null;
  audioLanguage: AudioLanguage;
  setAudioLanguage: (lang: AudioLanguage) => void;
  audioRate: number;
  setAudioRate: (rate: number) => void;
  activeText: string | null;
}

export interface AudioButtonProps {
  text: string | MultilingualText;
  id?: string;
  label?: string;
  language?: AudioLanguage;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon-only' | 'badge';
  className?: string;
  ariaLabel?: string;
}
