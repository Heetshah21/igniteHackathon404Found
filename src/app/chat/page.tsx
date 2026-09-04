'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStudent } from '@/context/StudentContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatMessage } from '@/types';
import { translations } from '@/lib/translations';
import { AudioButton } from '@/components/common/AudioButton';
import {
  Bot,
  Send,
  Sparkles,
  User,
  HelpCircle,
  Compass,
  ArrowRight,
  BookOpen,
  GraduationCap,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';


const SUGGESTED_QUESTIONS = [
  'Can I become a software engineer after diploma?',
  'What is DSE (Direct Second Year)?',
  'What can I do after 10th standard?',
  'Should I choose BCA or B.Tech CSE?',
  'What skills do I need for AI/ML Engineer?',
  'Which scholarships can I apply for in Maharashtra?',
  'What career options do I have after 12th Commerce?',
];

export default function ChatPage() {
  const { user, profile, language } = useStudent();
  const t = translations[language];

  const [mounted, setMounted] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello **${profile?.name || user?.email?.split('@')[0] || 'Student'}**! 👋 I am **CAREERMitra AI**, your personalized career & education mentor.

I can see you are in **${profile?.education_level || 'School/College'} ${profile?.branch ? `(${profile.branch})` : ''}** aiming for **${profile?.career_goal || 'your target career goal'}** in **${profile?.state || 'India'}**.

How can I help guide your journey today? Click any suggested question below or type your doubt!`,
      timestamp: '',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === 'init-1' && !msg.timestamp
          ? {
            ...msg,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }
          : msg
      )
    );
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText.trim(),
          profile: profile || {},
        }),
      });

      const data = await res.json();
      const botReply = data.reply || 'I am sorry, I could not generate a response. Please try again.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content:
          'Network error. Please make sure your server is running or check your connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'init-reset',
        role: 'assistant',
        content: `Conversation reset. Ask me anything about educational pathways, DSE, scholarships, or entrance exams!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-12">
        {/* Header Banner */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.13)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.35)', color: '#F472B6' }}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{t.chat.badge}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {t.chat.title}
              </h1>
              <p className="text-white/55 text-xs">{t.chat.subtitle}</p>
            </div>

            <button
              onClick={handleClear}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.65)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.common.reset}</span>
            </button>
          </div>
        </div>

        {/* Active Context Indicator Bar */}
        {profile && (
          <div
            className="p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs"
            style={{
              background: 'rgba(163,230,53,0.10)',
              border: '1px solid rgba(163,230,53,0.25)',
            }}
          >
            <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--lime-green)' }}>
              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--lime-green)' }} />
              <span>Personalized Context Active:</span>
              <span className="font-normal text-white/65">
                {profile.name} • {profile.education_level} ({profile.branch}) • {profile.state} • Goal: {profile.career_goal}
              </span>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: 'rgba(163,230,53,0.70)' }}>
              AI uses this to customize answers
            </span>
          </div>
        )}

        {/* Chat Canvas */}
        <div
          className="rounded-2xl flex flex-col h-[520px] sm:h-[580px] overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
          }}
        >
          {/* Messages Scroll Area */}
          <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
                    style={isUser ? {
                      background: 'var(--lime-green)',
                      color: '#0A1F00',
                      boxShadow: '0 0 10px rgba(163,230,53,0.40)',
                    } : {
                      background: 'linear-gradient(135deg, #EC4899, #6366F1)',
                      color: 'white',
                    }}
                  >
                    {isUser ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>

                  <div
                    className="max-w-[88%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed space-y-2 break-words"
                    style={isUser ? {
                      background: 'rgba(163,230,53,0.20)',
                      border: '1px solid rgba(163,230,53,0.35)',
                      color: 'white',
                      borderRadius: '1rem 0 1rem 1rem',
                    } : {
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.85)',
                      borderRadius: '0 1rem 1rem 1rem',
                    }}
                  >
                    <div className="whitespace-pre-wrap font-sans break-words">
                      {msg.content}
                    </div>
                    <div className={`flex items-center justify-between text-[10px] font-medium pt-1 ${isUser ? 'text-lime-300/70' : 'text-white/35'}`}>
                      {!isUser ? (
                        <AudioButton
                          id={`chat-msg-${msg.id}`}
                          text={msg.content}
                          label="Listen"
                          variant="ghost"
                          size="xs"
                          className="text-white/40 hover:text-white p-0 text-[10px]"
                          ariaLabel="Listen to AI mentor message"
                        />
                      ) : (
                        <span />
                      )}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>

                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: 'linear-gradient(135deg, #EC4899, #6366F1)' }}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <div
                  className="p-4 rounded-2xl text-xs font-medium flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.65)' }}
                >
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ background: '#F472B6' }}></span>
                  <span>CAREERMitra AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div
            className="p-3 flex gap-2 overflow-x-auto"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.12)' }}
          >
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 flex items-center gap-1.5 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.70)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(163,230,53,0.40)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--lime-green)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.13)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.70)';
                }}
              >
                <Sparkles className="w-3 h-3" style={{ color: '#F472B6' }} />
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 flex gap-2 items-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your education or career question here..."
              className="flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-2xl disabled:opacity-50 cursor-pointer btn-lime transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
