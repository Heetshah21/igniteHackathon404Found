'use client';

import React, { useState, useEffect } from 'react';
import { useSpeech } from '@/context/SpeechContext';
import { Volume2, X } from 'lucide-react';

export const TextSelectionReader: React.FC = () => {
  const { speak, isSupported, isSpeaking, stop } = useSpeech();
  const [selectedText, setSelectedText] = useState<string>('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return;

    const handleMouseUp = () => {
      // Small timeout to let browser selection finalize
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (text && text.length >= 3 && text.length <= 1000) {
          const range = selection?.getRangeAt(0);
          const rect = range?.getBoundingClientRect();

          if (rect) {
            setSelectedText(text);
            setPosition({
              x: Math.max(10, Math.min(window.innerWidth - 160, rect.left + window.scrollX)),
              y: Math.max(10, rect.top + window.scrollY - 44),
            });
          }
        } else {
          setPosition(null);
          setSelectedText('');
        }
      }, 50);
    };

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setPosition(null);
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isSupported]);

  if (!position || !selectedText) return null;

  const handleSpeakSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    speak(selectedText, { id: 'selection-' + Date.now() });
    setPosition(null);
  };

  return (
    <div
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      className="absolute z-50 animate-in fade-in zoom-in-95 pointer-events-auto"
    >
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleSpeakSelection}
        title="Read Selected Text Aloud"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold shadow-2xl border border-emerald-400/40 hover:bg-slate-800 transition cursor-pointer"
      >
        <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>Read Selection</span>
      </button>
    </div>
  );
};
