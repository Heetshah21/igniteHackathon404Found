'use client';

import React from 'react';
import { SimulationTool } from '@/types/simulation';
import { Terminal, Database, Activity, GitCommit, AlertTriangle } from 'lucide-react';

interface DevWorkspaceProps {
  activeTool: SimulationTool | null;
  inspectedToolIds: string[];
}

export const DevWorkspace: React.FC<DevWorkspaceProps> = ({ activeTool, inspectedToolIds }) => {
  const payload = activeTool?.payload;

  return (
    <div className="h-full flex flex-col justify-between bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Top IDE / Terminal Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-sans text-xs ml-2 font-semibold">
            auth-service.cluster.internal — Developer Console
          </span>
        </div>
        <div className="flex items-center gap-3 font-sans text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE TELEMETRY
          </span>
        </div>
      </div>

      {/* Main Dev Content Display */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {/* System Microservices Status Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300 font-sans">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Auth Service</div>
              <div className="font-bold text-rose-400">504 Gateway Err</div>
            </div>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">PostgreSQL DB</div>
              <div className="font-bold text-amber-400">99.4% CPU</div>
            </div>
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">API Gateway</div>
              <div className="font-bold text-emerald-400">210 req/s</div>
            </div>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Latest Deployment</div>
              <div className="font-bold text-sky-400">v2.4.2 (18m ago)</div>
            </div>
            <GitCommit className="w-4 h-4 text-sky-400" />
          </div>
        </div>

        {/* Selected Tool Payload View */}
        {activeTool ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <h3 className="font-sans font-bold text-sm text-sky-300">{payload?.title}</h3>
              </div>
              {payload?.subtitle && (
                <span className="text-[11px] text-slate-400 font-sans">{payload.subtitle}</span>
              )}
            </div>

            {/* Metrics cards if available */}
            {payload?.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans">
                {payload.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      m.status === 'danger'
                        ? 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                        : m.status === 'warning'
                        ? 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                        : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400">{m.label}</div>
                    <div className="text-base font-black mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Logs viewer */}
            {payload?.logs && (
              <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans">
                  Console Output Stream
                </div>
                {payload.logs.map((log, idx) => (
                  <div key={idx} className="font-mono text-[11px] leading-relaxed flex items-start gap-2">
                    <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                    <span
                      className={`font-bold shrink-0 ${
                        log.level === 'ERROR'
                          ? 'text-rose-400'
                          : log.level === 'WARN'
                          ? 'text-amber-400'
                          : 'text-sky-400'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="text-slate-200">{log.message}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Table data if available */}
            {payload?.tableData && (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 text-[11px]">
                    <tr>
                      {payload.tableData.headers.map((h, idx) => (
                        <th key={idx} className="p-2.5 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {payload.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2.5 font-mono text-[11px]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Raw code/diff output */}
            {payload?.rawText && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                {payload.rawText}
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500 font-sans space-y-2">
            <Terminal className="w-8 h-8 text-slate-600 animate-bounce" />
            <p className="text-xs font-semibold text-slate-400">
              Select an investigation tool on the right panel to examine live logs, commits, or DB metrics.
            </p>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-400 font-sans">
        <span>Inspected Clues: {inspectedToolIds.length} / 4</span>
        <span>Environment: Production Node Cluster</span>
      </div>
    </div>
  );
};
