import { StudentProfile, Resource, Scholarship, Opportunity, ScoredItem } from '@/types';
import { evaluateEligibility } from '@/lib/eligibility/engine';

// ===== WEIGHTS =====
const WEIGHTS = {
  branch: 5,
  career: 5,
  education: 3,
  interest: 2,
  skill: 1,
  language: 1,
};

// ===== RESOURCE MATCHER =====
export function matchResources(
  resources: Resource[],
  profile: Partial<StudentProfile>
): ScoredItem<Resource>[] {
  const safeResources = resources ?? [];
  const safeProfile = profile ?? {};

  return safeResources
    .map(resource => {
      if (!resource) return { item: resource, score: 0, reasons: [] };
      let score = 0;
      const reasons: string[] = [];

      // Branch match
      if (safeProfile.branch && (resource.branch ?? []).includes(safeProfile.branch)) {
        score += WEIGHTS.branch;
        reasons.push('Matches your branch');
      }

      // Career match
      if (safeProfile.career_goal_id && (resource.careers ?? []).includes(safeProfile.career_goal_id)) {
        score += WEIGHTS.career;
        reasons.push('Relevant to your career goal');
      }

      // Interest match
      if (safeProfile.interests) {
        for (const interest of safeProfile.interests) {
          if ((resource.tags ?? []).some(t => t?.toLowerCase().includes(interest.toLowerCase())) ||
              resource.subject?.toLowerCase().includes(interest.toLowerCase())) {
            score += WEIGHTS.interest;
            reasons.push(`Matches your interest: ${interest}`);
            break;
          }
        }
      }

      // Skill match
      if (safeProfile.skills) {
        for (const skill of safeProfile.skills) {
          if ((resource.tags ?? []).some(t => t?.toLowerCase().includes(skill.toLowerCase())) ||
              resource.title?.toLowerCase().includes(skill.toLowerCase())) {
            score += WEIGHTS.skill;
            reasons.push(`Related to your skill: ${skill}`);
            break;
          }
        }
      }

      // Bonus for free
      if (resource.free) {
        score += 1;
      }

      return { item: resource, score, reasons };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ===== SCHOLARSHIP MATCHER =====
export function matchScholarships(
  scholarships: Scholarship[],
  profile: Partial<StudentProfile>
): ScoredItem<Scholarship>[] {
  const safeScholarships = scholarships ?? [];
  const safeProfile = profile ?? {};

  return safeScholarships
    .map(scholarship => {
      if (!scholarship) return { item: scholarship, score: 0, reasons: [] };
      const result = evaluateEligibility(scholarship.eligibility ?? [], safeProfile);
      const reasons: string[] = (result?.matchedRules ?? []).map(r => r?.label ?? '');

      return {
        item: scholarship,
        score: result?.score ?? 0,
        reasons,
        eligibilityResult: result,
      };
    })
    .sort((a, b) => b.score - a.score);
}

// ===== OPPORTUNITY MATCHER =====
export function matchOpportunities(
  opportunities: Opportunity[],
  profile: Partial<StudentProfile>
): ScoredItem<Opportunity>[] {
  const safeOpportunities = opportunities ?? [];
  const safeProfile = profile ?? {};

  return safeOpportunities
    .map(opp => {
      if (!opp) return { item: opp, score: 0, reasons: [] };
      let score = 0;
      const reasons: string[] = [];

      if (safeProfile.branch && (opp.branches ?? []).includes(safeProfile.branch)) {
        score += WEIGHTS.branch;
        reasons.push('Matches your branch');
      }

      if (safeProfile.career_goal_id && (opp.careers ?? []).includes(safeProfile.career_goal_id)) {
        score += WEIGHTS.career;
        reasons.push('Relevant to your career goal');
      }

      if (safeProfile.interests) {
        for (const interest of safeProfile.interests) {
          if ((opp.tags ?? []).some(t => t?.toLowerCase().includes(interest.toLowerCase()))) {
            score += WEIGHTS.interest;
            reasons.push(`Matches your interest: ${interest}`);
            break;
          }
        }
      }

      return { item: opp, score, reasons };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

