'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  SimulationAction,
  SimulationScenario,
  SimulationState,
  SimulationTool,
  UserReasoningRecord,
} from '@/types/simulation';
import { DevWorkspace } from './workspaces/DevWorkspace';
import { FinanceWorkspace } from './workspaces/FinanceWorkspace';
import { LegalWorkspace } from './workspaces/LegalWorkspace';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SimulationWorkspaceProps {
  scenario: SimulationScenario;
  onComplete: (state: SimulationState) => void;
}

export const SimulationWorkspace: React.FC<SimulationWorkspaceProps> = ({
  scenario,
  onComplete,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inspectedToolIds, setInspectedToolIds] = useState<string[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [reasoningText, setReasoningText] = useState<string>('');
  const [confidence, setConfidence] = useState<'not_sure' | 'somewhat_confident' | 'very_confident'>('somewhat_confident');
  const [reasoningRecords, setReasoningRecords] = useState<UserReasoningRecord[]>([]);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [startTime] = useState<number>(Date.now());

  const currentStage = scenario.stages[currentStageIndex] || scenario.stages[0];

  // Live Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format timer 00:00
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Automatically select first available tool when entering Stage 1
  useEffect(() => {
    if (currentStage.availableTools.length > 0 && !activeToolId) {
      const firstTool = currentStage.availableTools[0];
      setActiveToolId(firstTool.id);
      setInspectedToolIds([firstTool.id]);
    }
  }, [currentStage, activeToolId]);

  const handleSelectTool = (tool: SimulationTool) => {
    setActiveToolId(tool.id);
    if (!inspectedToolIds.includes(tool.id)) {
      setInspectedToolIds((prev) => [...prev, tool.id]);
    }
  };

  const activeTool =
    currentStage.availableTools.find((t) => t.id === activeToolId) ||
    currentStage.availableTools[0] ||
    null;

  // Handle stage transition
  const handleProceedToDiagnose = () => {
    if (currentStageIndex < scenario.stages.length - 1) {
      setCurrentStageIndex(1);
    }
  };

  const handleConfirmDecision = () => {
    if (!selectedActionId) return;

    // Record reasoning checkpoint
    const record: UserReasoningRecord = {
      stageId: currentStage.id,
      actionId: selectedActionId,
      inspectedTools: inspectedToolIds,
      reasoningText: reasoningText || 'Decision based on evidence correlation.',
      confidence,
      timestamp: new Date().toISOString(),
    };

    const finalState: SimulationState = {
      scenarioId: scenario.id,
      currentStageIndex: 2,
      activeToolId,
      inspectedToolIds,
      selectedActionId,
      reasoningRecords: [...reasoningRecords, record],
      isCompleted: true,
      startTime,
    };

    onComplete(finalState);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between space-y-4">
      {/* Top Workspace Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-3 shadow-md flex items-center justify-between gap-4">
        {/* Left: Exit Link */}
        <Link
          href="/simulator"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Exit Simulation</span>
        </Link>

        {/* Center: Title & Stepper */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
            <span>{scenario.careerTitle}:</span>
            <span className="text-blue-600 font-bold">&quot;{scenario.scenarioTitle}&quot;</span>
          </div>

          {/* Stepper pills */}
          <div className="flex items-center gap-2 mt-1">
            {scenario.stages.map((stg, idx) => {
              const isActive = idx === currentStageIndex;
              const isPast = idx < currentStageIndex;
              return (
                <React.Fragment key={stg.id}>
                  <div
                    className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isPast
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    <span>{stg.shortName}</span>
                  </div>
                  {idx < scenario.stages.length - 1 && (
                    <span className="text-[10px] text-slate-300">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Live Session Timer */}
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-xs">
          <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>{formatTimer(secondsElapsed)}</span>
        </div>
      </div>

      {/* Main 3-Column Glass Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch">
        {/* LEFT PANEL: Situation & Current Objective (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          {/* Situation Card */}
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Current Situation</span>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {scenario.fullOverview.slice(0, 180)}...
            </p>
          </div>

          {/* Objective Glass Card */}
          <div
            className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-white backdrop-blur-md border border-blue-200/80 shadow-md space-y-3 flex-1"
            style={{ borderColor: scenario.themeColor.border }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Stage {currentStage.stageNumber} Objective</span>
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">{currentStage.objective}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {currentStage.description}
            </p>

            {currentStageIndex === 0 && (
              <div className="pt-3 border-t border-blue-100 space-y-2">
                <div className="text-[11px] font-semibold text-blue-800">
                  Clues Inspected: {inspectedToolIds.length} / {currentStage.availableTools.length}
                </div>
                <button
                  onClick={handleProceedToDiagnose}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Ready to Diagnose →</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CENTER PANEL: Professional Workplace Environment (6 cols) */}
        <div className="lg:col-span-6 min-h-[420px] flex flex-col">
          {scenario.id === 'software-developer' ? (
            <DevWorkspace activeTool={activeTool} inspectedToolIds={inspectedToolIds} />
          ) : scenario.id === 'financial-analyst' ? (
            <FinanceWorkspace activeTool={activeTool} inspectedToolIds={inspectedToolIds} />
          ) : (
            <LegalWorkspace activeTool={activeTool} inspectedToolIds={inspectedToolIds} />
          )}
        </div>

        {/* RIGHT PANEL: Available Tools / Resources (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-3">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm flex flex-col space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Available Tools ({currentStage.availableTools.length})
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Click to Inspect
              </span>
            </div>

            <div className="space-y-2">
              {currentStage.availableTools.map((tool) => {
                const isSelected = tool.id === activeToolId;
                const isInspected = inspectedToolIds.includes(tool.id);
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                        : isInspected
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50/40'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : isInspected
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isInspected ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs truncate">{tool.name}</h4>
                        {tool.badgeText && (
                          <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                            {tool.badgeText}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                        {tool.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL: Decision Trigger & Reasoning Drawer (Stage 2) */}
      {currentStageIndex === 1 && currentStage.availableActions && (
        <div className="bg-white/95 backdrop-blur-xl border border-blue-200 rounded-3xl p-6 shadow-2xl space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Action Decision Required
              </span>
              <h3 className="text-base font-black text-slate-900">
                Select Your Operational Fix / Recommendation
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Based on inspected evidence ({inspectedToolIds.length} clues discovered)
            </div>
          </div>

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentStage.availableActions.map((action) => {
              const isSelected = action.id === selectedActionId;
              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedActionId(action.id)}
                  className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{action.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reasoning Prompt & Confidence Selector */}
          {selectedActionId && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 block">
                  Why did you choose this action? (Short reflection)
                </label>
                <p className="text-[11px] text-slate-500">
                  {currentStage.reasoningPrompt || 'Explain what telemetry clues guided your choice.'}
                </p>
                <textarea
                  value={reasoningText}
                  onChange={(e) => setReasoningText(e.target.value)}
                  placeholder="Explain your technical or strategic reasoning..."
                  rows={2}
                  className="w-full mt-2 p-3 text-xs bg-white rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 outline-none transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    How confident are you in this decision?
                  </span>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="confidence"
                        checked={confidence === 'not_sure'}
                        onChange={() => setConfidence('not_sure')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>○ Not sure</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="confidence"
                        checked={confidence === 'somewhat_confident'}
                        onChange={() => setConfidence('somewhat_confident')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>○ Somewhat confident</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="confidence"
                        checked={confidence === 'very_confident'}
                        onChange={() => setConfidence('very_confident')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>○ Very confident</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleConfirmDecision}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Action & See Outcome →</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
