'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { getSimulationById } from '@/data/simulations';
import { SimulationIntro } from '@/components/simulation/SimulationIntro';
import { SimulationWorkspace } from '@/components/simulation/SimulationWorkspace';
import { SimulationResult } from '@/components/simulation/SimulationResult';
import { evaluateSimulationState } from '@/lib/simulation/evaluator';
import { SimulationEvaluationResult, SimulationState } from '@/types/simulation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DynamicSimulationPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = typeof params?.careerId === 'string' ? params.careerId : '';

  const scenario = getSimulationById(careerId);

  const [viewState, setViewState] = useState<'intro' | 'workspace' | 'result'>('intro');
  const [evaluation, setEvaluation] = useState<SimulationEvaluationResult | null>(null);

  if (!scenario) {
    return (
      <AppLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 animate-bounce" />
          <h1 className="text-2xl font-bold text-slate-900">Career Simulation Not Found</h1>
          <p className="text-sm text-slate-600">The career simulation you requested does not exist or has been moved.</p>
          <Link
            href="/simulator"
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Simulation Hub</span>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const handleStartSimulation = () => {
    setViewState('workspace');
  };

  const handleCompleteSimulation = (finalState: SimulationState) => {
    const evalResult = evaluateSimulationState(finalState);
    setEvaluation(evalResult);
    setViewState('result');
  };

  const handleResetSimulation = () => {
    setEvaluation(null);
    setViewState('intro');
  };

  return (
    <AppLayout>
      {viewState === 'intro' && (
        <SimulationIntro scenario={scenario} onStart={handleStartSimulation} />
      )}

      {viewState === 'workspace' && (
        <SimulationWorkspace
          scenario={scenario}
          onComplete={handleCompleteSimulation}
        />
      )}

      {viewState === 'result' && evaluation && (
        <SimulationResult evaluation={evaluation} onReset={handleResetSimulation} />
      )}
    </AppLayout>
  );
}
