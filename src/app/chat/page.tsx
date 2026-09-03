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
  const { profile, language } = useStudent();
  const t = translations[language];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello **${profile?.name || 'Rahul'}**! 👋 I am **CAREERMitra AI**, your personalized career & education mentor.

I can see you are in **${profile?.education_level || '12th'} ${profile?.branch || 'Science'}** aiming for **${profile?.career_goal || 'Software Engineer'}** in **${profile?.state || 'Maharashtra'}**.

How can I help guide your journey today? Click any suggested question below or type your doubt!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        <div className="rounded-3xl bg-white p-6 text-[#101D35] shadow-xs border border-[#E6EBF5]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
                <Bot className="w-3.5 h-3.5" />
                <span>Feature 6 • Dedicated Career & Education AI Mentor</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#101D35]">
                CAREERMitra AI Assistant
              </h1>
              <p className="text-slate-600 text-xs">
                Context-aware guidance for Indian education pathways, state entrance exams, DSE lateral entry, and scholarships.
              </p>
            </div>

            <button
              onClick={handleClear}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 font-semibold border border-[#E6EBF5] transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Active Context Indicator Bar */}
        {profile && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Personalized Context Active:</span>
              <span className="font-normal text-emerald-800">
                {profile.name} • {profile.education_level} ({profile.branch}) • {profile.state} • Goal: {profile.career_goal}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              AI uses this to customize answers
            </span>
          </div>
        )}

        {/* Chat Canvas */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[580px] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs ${
                      isUser
                        ? 'bg-emerald-600'
                        : 'bg-gradient-to-tr from-pink-600 to-indigo-600'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                      isUser
                        ? 'bg-emerald-600 text-white shadow-xs rounded-tr-none'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>
                    <div
                      className={`flex items-center justify-between text-[10px] font-medium pt-1 ${
                        isUser ? 'text-emerald-200' : 'text-slate-400'
                      }`}
                    >
                      {!isUser ? (
                        <AudioButton
                          id={`chat-msg-${msg.id}`}
                          text={msg.content}
                          label="Listen"
                          variant="ghost"
                          size="xs"
                          className="text-slate-500 hover:text-slate-800 p-0 text-[10px]"
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-indigo-600 flex items-center justify-center text-white text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                  <span>CAREERMitra AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="p-3 bg-slate-50/80 border-t border-slate-200/80 flex gap-2 overflow-x-auto scrollbar-thin">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-pink-300 hover:bg-pink-50/40 text-slate-700 text-xs font-semibold whitespace-nowrap transition shrink-0 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3 h-3 text-pink-500" />
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
            className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your education or career question here..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-2xl shadow-md transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
