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
  return resources
    .map(resource => {
      let score = 0;
      const reasons: string[] = [];

      // Branch match
      if (profile.branch && resource.branch.includes(profile.branch)) {
        score += WEIGHTS.branch;
        reasons.push('Matches your branch');
      }

      // Career match
      if (profile.career_goal_id && resource.careers.includes(profile.career_goal_id)) {
        score += WEIGHTS.career;
        reasons.push('Relevant to your career goal');
      }

      // Interest match
      if (profile.interests) {
        for (const interest of profile.interests) {
          if (resource.tags.some(t => t.toLowerCase().includes(interest.toLowerCase())) ||
              resource.subject?.toLowerCase().includes(interest.toLowerCase())) {
            score += WEIGHTS.interest;
            reasons.push(`Matches your interest: ${interest}`);
            break;
          }
        }
      }

      // Skill match
      if (profile.skills) {
        for (const skill of profile.skills) {
          if (resource.tags.some(t => t.toLowerCase().includes(skill.toLowerCase())) ||
              resource.title.toLowerCase().includes(skill.toLowerCase())) {
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
  return scholarships
    .map(scholarship => {
      const result = evaluateEligibility(scholarship.eligibility, profile);
      const reasons: string[] = result.matchedRules.map(r => r.label);

      return {
        item: scholarship,
        score: result.score,
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
  return opportunities
    .map(opp => {
      let score = 0;
      const reasons: string[] = [];

      if (profile.branch && opp.branches.includes(profile.branch)) {
        score += WEIGHTS.branch;
        reasons.push('Matches your branch');
      }

      if (profile.career_goal_id && opp.careers.includes(profile.career_goal_id)) {
        score += WEIGHTS.career;
        reasons.push('Relevant to your career goal');
      }

      if (profile.interests) {
        for (const interest of profile.interests) {
          if (opp.tags.some(t => t.toLowerCase().includes(interest.toLowerCase()))) {
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
