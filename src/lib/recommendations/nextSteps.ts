import { StudentProfile, NextStep, Career } from '@/types';

export function generateNextSteps(profile: Partial<StudentProfile>, careersList?: Career[]): NextStep[] {
  const steps: NextStep[] = [];
  const career = careersList?.find(c => c.id === profile.career_goal_id);
  const careerName = career?.title || profile.career_goal || 'your dream career';

  // Step 1: Based on education level
  if (profile.education_level === '10th' || profile.education_level === '12th') {
    steps.push({
      id: 'ns-1',
      title: `Explore ${careerName} pathways`,
      description: `View different education paths that can lead you to becoming a ${careerName}.`,
      action_url: '/roadmap',
      action_label: 'View Roadmap',
      icon: '🧭',
      priority: 1,
    });
  }

  // Step 2: Skill development
  const hasSkills = profile.skills && profile.skills.length > 0;
  if (!hasSkills) {
    steps.push({
      id: 'ns-2',
      title: 'Start learning foundational skills',
      description: `Begin with beginner-friendly courses related to ${careerName}. We have free resources in English, Hindi, and Marathi.`,
      action_url: '/resources',
      action_label: 'Browse Resources',
      icon: '📚',
      priority: 2,
    });
  } else {
    steps.push({
      id: 'ns-2b',
      title: 'Level up your skills',
      description: `You know ${profile.skills?.slice(0, 3).join(', ')}. Now explore intermediate and advanced courses.`,
      action_url: '/resources',
      action_label: 'Find Courses',
      icon: '🚀',
      priority: 2,
    });
  }

  // Step 3: Build projects
  steps.push({
    id: 'ns-3',
    title: 'Build a small project',
    description: 'Practical projects make your profile stronger. Start with a beginner-level project.',
    action_url: '/resources',
    action_label: 'Find Projects',
    icon: '🛠️',
    priority: 3,
  });

  // Step 4: Hackathons / Competitions
  steps.push({
    id: 'ns-4',
    title: 'Participate in competitions',
    description: 'Join hackathons, quizzes, and competitions to stand out and gain experience.',
    action_url: '/opportunities',
    action_label: 'View Opportunities',
    icon: '🏆',
    priority: 4,
  });

  // Step 5: Scholarships
  steps.push({
    id: 'ns-5',
    title: 'Check scholarships you qualify for',
    description: 'We found scholarships that may match your profile. Check your eligibility now.',
    action_url: '/scholarships',
    action_label: 'View Scholarships',
    icon: '🎓',
    priority: 5,
  });

  // Step 6: Resume
  steps.push({
    id: 'ns-6',
    title: 'Create your resume',
    description: 'Build a professional resume to apply for internships and opportunities.',
    action_url: '/resume',
    action_label: 'Build Resume',
    icon: '📄',
    priority: 6,
  });

  return steps.sort((a, b) => a.priority - b.priority);
}
