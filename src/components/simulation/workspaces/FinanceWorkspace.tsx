'use client';

import React from 'react';
import { SimulationTool } from '@/types/simulation';
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  PieChart,
  MapPin,
  Package,
  AlertCircle,
  BarChart,
} from 'lucide-react';

interface FinanceWorkspaceProps {
  activeTool: SimulationTool | null;
  inspectedToolIds: string[];
}

export const FinanceWorkspace: React.FC<FinanceWorkspaceProps> = ({ activeTool, inspectedToolIds }) => {
  const payload = activeTool?.payload;

  return (
    <div className="h-full flex flex-col justify-between bg-slate-50 text-slate-900 rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden font-sans text-xs">
      {/* Top Corporate Dashboard Header Bar */}
      <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
            SF
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm leading-tight">
              Shree Foods — Financial & Operational Intelligence
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Monthly Performance Audit (Q3 Period)</p>
          </div>
        </div>
        <div className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-100/80 text-amber-800 border border-amber-200">
          PROFIT ALERT (-38%)
        </div>
      </div>

      {/* Main Financial Analytics Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {/* Key Financial KPI Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1">
              <span>Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-black text-slate-900">₹18.4L</div>
            <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +0.8% (Stable)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1">
              <span>Operating Expenses</span>
              <PieChart className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-lg font-black text-amber-700">₹15.9L</div>
            <div className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +14.0% Surge
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] text-rose-700 font-bold mb-1">
              <span>Net Profit</span>
              <TrendingDown className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-lg font-black text-rose-700">₹2.5L</div>
            <div className="text-[10px] font-extrabold text-rose-700 flex items-center gap-0.5 mt-0.5">
              -38.0% (was ₹4.03L)
            </div>
          </div>
        </div>

        {/* Selected Financial Tool Payload View */}
        {activeTool ? (
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">{payload?.title}</h3>
              </div>
              {payload?.subtitle && (
                <span className="text-[11px] font-semibold text-slate-500">{payload.subtitle}</span>
              )}
            </div>

            {/* Metrics cards if available */}
            {payload?.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {payload.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      m.status === 'danger'
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : m.status === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    <div className="text-[10px] font-semibold text-slate-500">{m.label}</div>
                    <div className="text-base font-black mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Table data viewer */}
            {payload?.tableData && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold">
                    <tr>
                      {payload.tableData.headers.map((h, idx) => (
                        <th key={idx} className="p-2.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 text-slate-800">
                    {payload.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-2.5 font-medium ${
                              String(cell).includes('Spike') || String(cell).includes('⚠️')
                                ? 'font-bold text-rose-600'
                                : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Chart representation if present */}
            {payload?.chartData && (
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Product Sales Volume Breakdown
                </div>
                <div className="space-y-2">
                  {payload.chartData.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{item.label}</span>
                        <span className="font-bold text-slate-900">₹{(item.value / 100000).toFixed(2)}L ({item.change})</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(item.value / 1000000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw analysis text */}
            {payload?.rawText && (
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs font-medium text-amber-900 leading-relaxed">
                💡 <span className="font-bold">Analyst Discovery:</span> {payload.rawText}
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
            <PieChart className="w-8 h-8 text-amber-500 animate-pulse" />
            <p className="text-xs font-semibold text-slate-600">
              Select a financial audit tool on the right panel to examine expenses, sales SKUs, or regional margins.
            </p>
          </div>
        )}
      </div>

      {/* Footer Audit Bar */}
      <div className="bg-white border-t border-slate-200 px-5 py-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Financial Tools Examined: {inspectedToolIds.length} / 4</span>
        <span>Entity: Shree Foods Maharashtra</span>
      </div>
    </div>
  );
};
