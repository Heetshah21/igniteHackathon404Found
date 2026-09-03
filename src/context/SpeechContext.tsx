'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { usePathname } from 'next/navigation';
import {
  AudioLanguage,
  MultilingualText,
  SpeechControls,
} from '@/types/speech';
import { getBestVoice, resolveSpeechText } from '@/lib/speech/voices';

const LANG_STORAGE_KEY = 'careermitra_audio_language';
const RATE_STORAGE_KEY = 'careermitra_audio_rate';

const SpeechContext = createContext<SpeechControls | undefined>(undefined);

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [activeText, setActiveText] = useState<string | null>(null);

  const [audioLanguage, setAudioLanguageState] = useState<AudioLanguage>('en-IN');
  const [audioRate, setAudioRateState] = useState<number>(1);

  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 1. Check support and load voices safely
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const updateVoices = () => {
      try {
        const available = window.speechSynthesis.getVoices();
        voicesRef.current = available;
      } catch (e) {
        console.warn('Could not retrieve speech synthesis voices:', e);
      }
    };

    updateVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    // Load persisted preferences
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as AudioLanguage | null;
      if (savedLang === 'en-IN' || savedLang === 'hi-IN') {
        setAudioLanguageState(savedLang);
      }

      const savedRate = localStorage.getItem(RATE_STORAGE_KEY);
      if (savedRate) {
        const numRate = parseFloat(savedRate);
        if (!isNaN(numRate) && numRate >= 0.5 && numRate <= 2) {
          setAudioRateState(numRate);
        }
      }
    } catch (e) {
      console.warn('LocalStorage error in SpeechProvider', e);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 2. Stop speech automatically when user navigates to another page
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentId(null);
      setActiveText(null);
    }
  }, [pathname]);

  // Setters with LocalStorage persistence
  const setAudioLanguage = useCallback((lang: AudioLanguage) => {
    setAudioLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {}
  }, []);

  const setAudioRate = useCallback((rate: number) => {
    setAudioRateState(rate);
    try {
      localStorage.setItem(RATE_STORAGE_KEY, rate.toString());
    } catch (e) {}
  }, []);

  // 3. Stop speech
  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentId(null);
    setActiveText(null);
    utteranceRef.current = null;
  }, []);

  // 4. Pause speech
  const pause = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } catch (e) {
      console.warn('Speech pause error', e);
    }
  }, []);

  // 5. Resume speech
  const resume = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
      }
    } catch (e) {
      console.warn('Speech resume error', e);
    }
  }, []);

  // 6. Speak new content (cancels any previous speech first!)
  const speak = useCallback(
    (
      content: string | MultilingualText,
      options?: {
        id?: string;
        language?: AudioLanguage;
        rate?: number;
      }
    ) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      // CRITICAL: Stop previous speech immediately to prevent overlaps
      window.speechSynthesis.cancel();

      const targetLang = options?.language || audioLanguage;
      const targetRate = options?.rate || audioRate;
      const speechId = options?.id || 'speech-' + Date.now();

      const { text, langCode } = resolveSpeechText(content, targetLang);

      if (!text || text.trim().length === 0) {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentId(null);
        setActiveText(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = targetRate;
      utterance.lang = langCode;

      // Select matching voice
      if (voicesRef.current.length === 0) {
        voicesRef.current = window.speechSynthesis.getVoices();
      }
      const voice = getBestVoice(voicesRef.current, targetLang);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentId(speechId);
        setActiveText(text);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentId(null);
        setActiveText(null);
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        // Canceled is not a true error, it happens on cancel()
        if (event.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', event);
        }
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentId(null);
        setActiveText(null);
        utteranceRef.current = null;
      };

      utterance.onpause = () => {
        setIsPaused(true);
      };

      utterance.onresume = () => {
        setIsPaused(false);
        setIsSpeaking(true);
      };

      utteranceRef.current = utterance;

      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error('Failed to trigger window.speechSynthesis.speak', e);
        setIsSpeaking(false);
      }
    },
    [audioLanguage, audioRate]
  );

  return (
    <SpeechContext.Provider
      value={{
        speak,
        pause,
        resume,
        stop,
        isSpeaking,
        isPaused,
        isSupported,
        currentId,
        audioLanguage,
        setAudioLanguage,
        audioRate,
        setAudioRate,
        activeText,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = (): SpeechControls => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};
