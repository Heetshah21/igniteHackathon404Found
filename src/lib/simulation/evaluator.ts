import {
  CareerSimulationId,
  SimulationAction,
  SimulationEvaluationResult,
  SimulationScenario,
  SimulationState,
  SkillInsight,
} from '@/types/simulation';
import { getSimulationById } from '@/data/simulations';

export function evaluateSimulationState(state: SimulationState): SimulationEvaluationResult {
  const scenario = getSimulationById(state.scenarioId);
  const defaultScenario: SimulationScenario = scenario || {
    id: state.scenarioId,
    careerTitle: 'Professional',
    roleTitle: 'Professional',
    scenarioTitle: 'Simulation',
    badge: 'Career',
    estimatedTime: '3–5 min',
    shortDescription: '',
    fullOverview: '',
    whatYouWillDo: [],
    skillsObserved: [],
    iconName: 'Sparkles',
    themeColor: { primary: '#1677FF', border: 'rgba(22,119,255,0.2)', bgSoft: '#F5F9FF', accent: '#1554B8' },
    stages: [],
    defaultSkills: [],
  };

  // Find chosen action in Stage 2
  let selectedAction: SimulationAction | null = null;
  for (const stage of defaultScenario.stages) {
    if (stage.availableActions) {
      const match = stage.availableActions.find((a) => a.id === state.selectedActionId);
      if (match) {
        selectedAction = match;
        break;
      }
    }
  }

  // Calculate elapsed time formatted
  const elapsedSeconds = Math.max(120, Math.floor((Date.now() - (state.startTime || Date.now())) / 1000));
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

  // Reasoning evaluation
  const lastReasoning = state.reasoningRecords[state.reasoningRecords.length - 1];
  const reasoningText = lastReasoning?.reasoningText || '';
  const reasoningWords = reasoningText.trim().split(/\s+/).filter(Boolean).length;
  const isDetailedReasoning = reasoningWords >= 15;

  // Inspected tools bonus
  const toolCount = state.inspectedToolIds.length;
  const thoroughlyInvestigated = toolCount >= 3;

  // Base skill calculations based on action score impact or defaults
  let problemSolving = selectedAction?.scoreImpact.problemSolving || 80;
  let logicalThinking = selectedAction?.scoreImpact.logicalThinking || 78;
  let evidenceEval = selectedAction?.scoreImpact.evidenceEvaluation || 82;
  let riskAssessment = selectedAction?.scoreImpact.riskAssessment || 75;
  let communication = selectedAction?.scoreImpact.communication || 74;

  // Adjustments
  if (thoroughlyInvestigated) {
    problemSolving = Math.min(99, problemSolving + 4);
    evidenceEval = Math.min(99, evidenceEval + 5);
  }
  if (isDetailedReasoning) {
    communication = Math.min(99, communication + 8);
    logicalThinking = Math.min(99, logicalThinking + 3);
  }
  if (lastReasoning?.confidence === 'very_confident') {
    riskAssessment = Math.min(99, riskAssessment + 3);
  }

  const overallScore = Math.round(
    (problemSolving + logicalThinking + evidenceEval + riskAssessment + communication) / 5
  );

  const skillInsights: SkillInsight[] = [
    {
      name: 'Problem Solving',
      score: problemSolving,
      description: 'Ability to isolate root causes in complex environments.',
    },
    {
      name: 'Logical Thinking',
      score: logicalThinking,
      description: 'Structuring clear step-by-step diagnostic workflows.',
    },
    {
      name: 'Evidence Evaluation',
      score: evidenceEval,
      description: 'Distinguishing critical clues from irrelevant noise.',
    },
    {
      name: 'Risk Assessment',
      score: riskAssessment,
      description: 'Evaluating trade-offs and operational consequences.',
    },
    {
      name: 'Communication',
      score: communication,
      description: 'Articulating reasoning clearly with professional rationale.',
    },
  ];

  // Dynamic Strengths & Areas to Develop based on performance
  const strengths: string[] = [];
  const areasToDevelop: string[] = [];

  if (thoroughlyInvestigated) {
    strengths.push('Thoroughly inspected available tools and telemetry prior to making key decisions.');
  } else {
    areasToDevelop.push('Try inspecting more evidence sources before committing to an operational action.');
  }

  if (selectedAction?.outcomeQuality === 'optimal') {
    strengths.push('Identified the optimal solution that resolves the core issue without unwanted side effects.');
    strengths.push('Demonstrated strong cause-and-effect correlation across empirical metrics.');
  } else if (selectedAction?.outcomeQuality === 'suboptimal') {
    strengths.push('Applied immediate relief to the situation.');
    areasToDevelop.push('Focus on fixing underlying root causes rather than masking symptoms with quick fixes.');
  } else {
    areasToDevelop.push('Avoid reactionary measures that contradict empirical evidence data.');
  }

  if (isDetailedReasoning) {
    strengths.push('Articulated clear, evidence-backed rationale during the decision checkpoint.');
  } else {
    areasToDevelop.push('Provide more detailed reasoning to explain what data points influenced your choice.');
  }

  // Final summary text
  let whatThisMeans = '';
  if (overallScore >= 88) {
    whatThisMeans = `You demonstrated outstanding analytical rigor and decision making during the ${defaultScenario.careerTitle} simulation. Your ability to connect evidence clues to the right operational fix shows natural aptitude for high-impact problem solving roles.`;
  } else if (overallScore >= 75) {
    whatThisMeans = `You showed strong logical structure during the ${defaultScenario.careerTitle} simulation. With slightly deeper investigation of diagnostic tools before taking action, you will excel in complex technical or analytical careers.`;
  } else {
    whatThisMeans = `You gained valuable hands-on experience in the ${defaultScenario.careerTitle} role! Career simulations help build your professional intuition over time as you learn to correlate clues with operational consequences.`;
  }

  return {
    scenarioId: state.scenarioId,
    careerTitle: defaultScenario.careerTitle,
    completionTimeFormatted: timeFormatted,
    overallScore,
    skillInsights,
    strengths,
    areasToDevelop,
    whatThisMeans,
    actionTaken: selectedAction,
    reasoningSummary: reasoningText,
  };
}

/**
 * Async boundary for future LLM or Supabase Edge Function evaluation.
 * Returns evaluated results gracefully even when offline.
 */
export async function evaluateWithAI(
  state: SimulationState
): Promise<SimulationEvaluationResult> {
  // Simulate lightweight async evaluation latency
  await new Promise((resolve) => setTimeout(resolve, 300));
  return evaluateSimulationState(state);
}
