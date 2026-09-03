'use client';

import React from 'react';
import { SimulationTool } from '@/types/simulation';
import { Scale, FileText, FileCheck, Mail, ShieldAlert, CheckCircle2, Bookmark } from 'lucide-react';

interface LegalWorkspaceProps {
  activeTool: SimulationTool | null;
  inspectedToolIds: string[];
}

export const LegalWorkspace: React.FC<LegalWorkspaceProps> = ({ activeTool, inspectedToolIds }) => {
  const payload = activeTool?.payload;

  return (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans text-xs">
      {/* Top Legal Dossier Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm leading-tight flex items-center gap-2">
              <span>CASE #2048 — CONSUMER FORUM LITIGATION</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/60">
                ACTIVE BRIEF
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Rajesh Kumar vs. Apex Electronics Pvt Ltd</p>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-slate-400">
          Senior Lead: Meera Sharma, Advocate
        </div>
      </div>

      {/* Main Legal Brief Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {/* Case Dossier Summary Bar */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-purple-400 shrink-0" />
            <span><strong className="text-white">Forum:</strong> District Consumer Disputes Forum</span>
          </div>
          <div><strong className="text-white">Claim Amount:</strong> ₹65,000 + ₹50k Compensation</div>
          <div><strong className="text-white">Status:</strong> Evidence Stage</div>
        </div>

        {/* Selected Legal Exhibit Document Viewer */}
        {activeTool ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-inner animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-base text-purple-200">{payload?.title}</h3>
              </div>
              {payload?.subtitle && (
                <span className="text-[11px] font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  {payload.subtitle}
                </span>
              )}
            </div>

            {/* Metrics cards if available */}
            {payload?.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {payload.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      m.status === 'danger'
                        ? 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                        : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-semibold">{m.label}</div>
                    <div className="text-sm font-bold mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Document Content Sections */}
            {payload?.documentContent && (
              <div className="space-y-3 font-serif">
                {payload.documentContent.author && (
                  <div className="text-[11px] font-sans text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
                    <span>Source/Author: <strong>{payload.documentContent.author}</strong></span>
                    <span>Date: <strong>{payload.documentContent.date}</strong></span>
                  </div>
                )}

                <div className="space-y-3 pt-1">
                  {payload.documentContent.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border ${
                        sec.highlighted
                          ? 'bg-purple-950/30 border-purple-600/60 ring-1 ring-purple-500/40 text-purple-100'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300'
                      }`}
                    >
                      {sec.heading && (
                        <h4 className="font-sans font-bold text-xs text-purple-300 mb-1 flex items-center justify-between">
                          <span>{sec.heading}</span>
                          {sec.highlighted && (
                            <span className="text-[9px] font-sans uppercase font-extrabold px-1.5 py-0.5 rounded bg-purple-500 text-white">
                              KEY EVIDENCE CLAUSE
                            </span>
                          )}
                        </h4>
                      )}
                      <p className="text-xs leading-relaxed font-sans">{sec.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
            <Scale className="w-8 h-8 text-purple-400 animate-bounce" />
            <p className="text-xs font-semibold text-slate-300">
              Select a case exhibit on the right panel to examine customer claims, forensic reports, or email evidence.
            </p>
          </div>
        )}
      </div>

      {/* Footer Legal Brief Status */}
      <div className="bg-slate-950 border-t border-slate-800 px-5 py-2.5 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span>Exhibits Examined: {inspectedToolIds.length} / 4</span>
        <span>Client: Apex Electronics Pvt Ltd</span>
      </div>
    </div>
  );
};
