// ============================================================
// CAREERMitra — Career Simulation Types
// ============================================================

export type CareerSimulationId = 'software-developer' | 'financial-analyst' | 'lawyer';

export interface SkillInsight {
  name: string;
  score: number; // 0 to 100
  description: string;
}

export interface SimulationTool {
  id: string;
  name: string;
  iconName: string; // Lucide icon name string
  category: string;
  description: string;
  badgeText?: string;
  // Specific data payload to display when tool is opened/inspected
  payload: {
    title: string;
    subtitle?: string;
    metrics?: Array<{ label: string; value: string; trend?: 'up' | 'down' | 'neutral'; status?: 'success' | 'warning' | 'danger' | 'info' }>;
    logs?: Array<{ timestamp: string; level: 'ERROR' | 'WARN' | 'INFO'; message: string; details?: string }>;
    documentContent?: {
      author?: string;
      date?: string;
      sections: Array<{ heading?: string; body: string; highlighted?: boolean }>;
    };
    chartData?: Array<{ label: string; value: number; change?: string; highlight?: boolean }>;
    tableData?: {
      headers: string[];
      rows: Array<Array<string | number>>;
    };
    rawText?: string;
  };
}

export interface SimulationAction {
  id: string;
  label: string;
  description: string;
  outcomeQuality: 'optimal' | 'suboptimal' | 'poor';
  consequenceTitle: string;
  consequenceText: string;
  keyTakeaway: string;
  scoreImpact: {
    problemSolving: number;
    logicalThinking: number;
    evidenceEvaluation: number;
    riskAssessment: number;
    communication: number;
  };
}

export interface SimulationStage {
  id: string; // e.g. 'investigate', 'diagnose', 'resolve'
  stageNumber: number; // 1, 2, 3
  stageName: string; // "01 Investigate"
  shortName: string; // "Investigate"
  objective: string;
  description: string;
  availableTools: SimulationTool[];
  availableActions?: SimulationAction[];
  requiresReasoning: boolean;
  reasoningPrompt?: string;
}

export interface SimulationScenario {
  id: CareerSimulationId;
  careerTitle: string;
  roleTitle: string;
  scenarioTitle: string;
  badge: string;
  estimatedTime: string;
  shortDescription: string;
  fullOverview: string;
  whatYouWillDo: string[];
  skillsObserved: string[];
  iconName: string;
  themeColor: {
    primary: string;
    border: string;
    bgSoft: string;
    accent: string;
  };
  stages: SimulationStage[];
  defaultSkills: Array<{ name: string; baseScore: number }>;
}

export interface UserReasoningRecord {
  stageId: string;
  actionId?: string;
  inspectedTools: string[];
  reasoningText: string;
  confidence: 'not_sure' | 'somewhat_confident' | 'very_confident';
  timestamp: string;
}

export interface SimulationState {
  scenarioId: CareerSimulationId;
  currentStageIndex: number;
  activeToolId: string | null;
  inspectedToolIds: string[];
  selectedActionId: string | null;
  reasoningRecords: UserReasoningRecord[];
  isCompleted: boolean;
  startTime: number;
}

export interface SimulationEvaluationResult {
  scenarioId: CareerSimulationId;
  careerTitle: string;
  completionTimeFormatted: string;
  overallScore: number;
  skillInsights: SkillInsight[];
  strengths: string[];
  areasToDevelop: string[];
  whatThisMeans: string;
  actionTaken: SimulationAction | null;
  reasoningSummary: string;
}
