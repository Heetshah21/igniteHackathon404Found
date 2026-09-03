// ============================================================
// CAREERMitra — Core Type Definitions
// ============================================================

// Student Profile
export interface StudentProfile {
  id: string;
  user_id?: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  state?: string;
  gender?: string;
  education_level?: string;
  school_college?: string;
  branch?: string;
  percentage?: number;
  family_income?: string;
  category?: string;
  rural_urban?: string;
  interests: string[];
  skills: string[];
  career_goal?: string;
  career_goal_id?: string;
  marksheet_filename?: string;
  marksheet_url?: string;
  onboarding_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

// Career
export interface Career {
  id: string;
  title: string;
  slug: string;
  description: string;
  branch: string[];
  icon: string;
  avg_salary?: string;
  growth?: string;
  difficulty?: string;
}

// Roadmap
export interface Roadmap {
  id: string;
  career_id: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  requirements?: string[];
  tips?: string[];
}

// Resource
export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'youtube' | 'notes' | 'course' | 'website' | 'playlist';
  subject?: string;
  branch: string[];
  careers: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  free: boolean;
  url: string;
  provider?: string;
  tags: string[];
}

// Scholarship
export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  description: string;
  amount?: string;
  eligibility: EligibilityRule[];
  deadline?: string;
  application_url: string;
  states?: string[];
  education_levels?: string[];
  branches?: string[];
  tags: string[];
}

export interface EligibilityRule {
  field: string;
  operator: 'eq' | 'neq' | 'gte' | 'lte' | 'in' | 'contains';
  value: string | number | string[];
  label: string;
}

export interface EligibilityResult {
  eligible: boolean;
  matchedRules: EligibilityRule[];
  failedRules: EligibilityRule[];
  score: number;
}

// Opportunity
export interface Opportunity {
  id: string;
  title: string;
  type: 'hackathon' | 'internship' | 'competition' | 'project' | 'workshop';
  description: string;
  organizer: string;
  deadline?: string;
  url: string;
  branches: string[];
  careers: string[];
  level: string;
  location?: string;
  stipend?: string;
  tags: string[];
}

// Comparison
export interface ComparisonData {
  id: string;
  option_a: string;
  option_b: string;
  slug: string;
  categories: ComparisonCategory[];
  quiz: ComparisonQuiz[];
}

export interface ComparisonCategory {
  label: string;
  option_a_value: string;
  option_b_value: string;
}

export interface ComparisonQuiz {
  question: string;
  option_a_text?: string;
  option_b_text?: string;
  option_a_points: number;
  option_b_points: number;
  option_a_reason?: string;
  option_b_reason?: string;
}

// Resume
export interface ResumeData {
  id?: string;
  student_id?: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  career_objective: string;
  education: ResumeEducation[];
  skills: string[];
  projects: ResumeProject[];
  certifications: string[];
  achievements: string[];
  interests: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  year: string;
  score?: string;
}

export interface ResumeProject {
  title: string;
  description: string;
  technologies?: string[];
}

// Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Next Steps
export interface NextStep {
  id: string;
  title: string;
  description: string;
  action_url?: string;
  action_label?: string;
  icon: string;
  priority: number;
}

// Recommendation Score
export interface ScoredItem<T> {
  item: T;
  score: number;
  reasons: string[];
  eligibilityResult?: EligibilityResult;
}

// Educational Institution & College
export interface Institution {
  id: string;
  name: string;
  slug: string;
  type: string;
  city: string;
  district: string;
  state: string;
  latitude?: number;
  longitude?: number;
  annual_fee?: number;
  course: string;
  stream: string;
  min_qualification?: string;
  girls_only: boolean;
  hostel_available: boolean;
  government: boolean;
  scholarship_available: boolean;
  description?: string;
  website_url?: string;
  rating?: number;
  admission_process?: string;
}

export interface InstitutionPreferenceFilter {
  girlsOnly?: boolean;
  governmentOnly?: boolean;
  hostelAvailable?: boolean;
  lowFees?: boolean;
  scholarshipFriendly?: boolean;
  closestToMe?: boolean;
}

export interface InstitutionRecommendation {
  institution: Institution;
  distanceKm: number;
  distanceLabel: string;
  affordabilityBadge: 'Budget-friendly' | 'Comfortable fit' | 'Moderate' | 'May require financial support' | 'Fee information unavailable';
  matchScore: number;
  matchReasons: string[];
  highlights: string[];
}

