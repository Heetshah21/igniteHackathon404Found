import { EligibilityRule, EligibilityResult, StudentProfile } from '@/types';

export function evaluateEligibility(
  rules: EligibilityRule[],
  profile: Partial<StudentProfile>
): EligibilityResult {
  const matchedRules: EligibilityRule[] = [];
  const failedRules: EligibilityRule[] = [];

  for (const rule of rules) {
    const profileValue = getProfileField(profile, rule.field);
    
    if (profileValue === undefined || profileValue === null || profileValue === '') {
      // If field not provided, we can't evaluate — skip (don't count as failed)
      continue;
    }

    const passed = evaluateRule(rule, profileValue);
    if (passed) {
      matchedRules.push(rule);
    } else {
      failedRules.push(rule);
    }
  }

  const totalEvaluated = matchedRules.length + failedRules.length;
  const score = totalEvaluated > 0 ? (matchedRules.length / rules.length) * 100 : 0;

  return {
    eligible: failedRules.length === 0 && matchedRules.length > 0,
    matchedRules,
    failedRules,
    score,
  };
}

function getProfileField(profile: Partial<StudentProfile>, field: string): unknown {
  const fieldMap: Record<string, unknown> = {
    education_level: profile.education_level,
    branch: profile.branch,
    percentage: profile.percentage,
    state: profile.state,
    gender: profile.gender,
    family_income: parseIncomeValue(profile.family_income),
    category: profile.category,
    rural_urban: profile.rural_urban,
    interests: profile.interests,
    skills: profile.skills,
  };
  return fieldMap[field];
}

function parseIncomeValue(income?: string): number | undefined {
  if (!income) return undefined;
  const map: Record<string, number> = {
    'below-1-lakh': 100000,
    '1-2.5-lakh': 175000,
    '2.5-5-lakh': 375000,
    '5-8-lakh': 650000,
    '8-15-lakh': 1150000,
    'above-15-lakh': 2000000,
  };
  return map[income] ?? undefined;
}

function evaluateRule(rule: EligibilityRule, value: unknown): boolean {
  switch (rule.operator) {
    case 'eq':
      return String(value).toLowerCase() === String(rule.value).toLowerCase();
    case 'neq':
      return String(value).toLowerCase() !== String(rule.value).toLowerCase();
    case 'gte':
      return Number(value) >= Number(rule.value);
    case 'lte':
      return Number(value) <= Number(rule.value);
    case 'in':
      if (Array.isArray(rule.value)) {
        return rule.value.some(v => 
          String(v).toLowerCase() === String(value).toLowerCase()
        );
      }
      return false;
    case 'contains':
      if (Array.isArray(value)) {
        return value.some(v => 
          String(v).toLowerCase() === String(rule.value).toLowerCase()
        );
      }
      return String(value).toLowerCase().includes(String(rule.value).toLowerCase());
    default:
      return false;
  }
}
