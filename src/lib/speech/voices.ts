import { AudioLanguage, MultilingualText } from '@/types/speech';

/**
 * Strips markdown symbols, URLs, and noisy syntax to produce clean natural speech text.
 */
export function cleanTextForSpeech(rawText: string): string {
  if (!rawText) return '';
  return rawText
    // Remove markdown links [title](url) -> title
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove markdown headers #, ##, etc.
    .replace(/#{1,6}\s+/g, '')
    // Remove bold/italics asterisks and underscores
    .replace(/[*_~`]/g, '')
    // Remove markdown bullet points
    .replace(/^\s*[-*+]\s+/gm, '')
    // Remove markdown numbered lists
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove emoji symbols that sound noisy on screen readers if needed
    // Normalize extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves the appropriate language string based on selected AudioLanguage.
 */
export function resolveSpeechText(
  content: string | MultilingualText,
  audioLanguage: AudioLanguage
): { text: string; langCode: string } {
  if (typeof content === 'string') {
    return {
      text: cleanTextForSpeech(content),
      langCode: audioLanguage,
    };
  }

  if (audioLanguage === 'hi-IN' && content.hi) {
    return {
      text: cleanTextForSpeech(content.hi),
      langCode: 'hi-IN',
    };
  }

  // Fallback to English
  return {
    text: cleanTextForSpeech(content.en),
    langCode: 'en-IN',
  };
}

/**
 * Finds the most suitable SpeechSynthesisVoice based on language preference.
 */
export function getBestVoice(
  voices: SpeechSynthesisVoice[],
  targetLanguage: AudioLanguage
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  if (targetLanguage === 'hi-IN') {
    // 1. Exact hi-IN match
    const exactHindi = voices.find(
      (v) => v.lang === 'hi-IN' || v.lang === 'hi_IN'
    );
    if (exactHindi) return exactHindi;

    // 2. Any Hindi voice (e.g., 'hi', Google हिन्दी, Microsoft Hemant/Kalpana/Swara)
    const anyHindi = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi') ||
        v.name.includes('हिन्दी')
    );
    if (anyHindi) return anyHindi;
  }

  if (targetLanguage === 'en-IN') {
    // 1. Exact Indian English match
    const indianEnglish = voices.find(
      (v) =>
        v.lang === 'en-IN' ||
        v.lang === 'en_IN' ||
        v.name.toLowerCase().includes('india')
    );
    if (indianEnglish) return indianEnglish;

    // 2. English fallback (en-US, en-GB, any en)
    const englishVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('en') ||
        v.name.toLowerCase().includes('english')
    );
    if (englishVoice) return englishVoice;
  }

  // Fallback to default browser voice
  const defaultVoice = voices.find((v) => v.default);
  return defaultVoice || voices[0] || null;
}
