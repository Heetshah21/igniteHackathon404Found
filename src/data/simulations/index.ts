import { CareerSimulationId, SimulationScenario } from '@/types/simulation';
import { softwareDeveloperSimulation } from './softwareDeveloper';
import { financialAnalystSimulation } from './financialAnalyst';
import { lawyerSimulation } from './lawyer';

export const simulationScenarios: Record<CareerSimulationId, SimulationScenario> = {
  'software-developer': softwareDeveloperSimulation,
  'financial-analyst': financialAnalystSimulation,
  lawyer: lawyerSimulation,
};

export const getAllSimulations = (): SimulationScenario[] => {
  return Object.values(simulationScenarios);
};

export const getSimulationById = (id: string): SimulationScenario | undefined => {
  return simulationScenarios[id as CareerSimulationId];
};
