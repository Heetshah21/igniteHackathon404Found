import { MultilingualText } from '@/types/speech';
import { StudentProfile } from '@/types';

/**
 * Generates bilingual speech text for the student's profile summary.
 */
export function getProfileSummarySpeech(profile: Partial<StudentProfile>): MultilingualText {
  const name = profile.name || 'Student';
  const edu = profile.education_level || '12th Standard';
  const branch = profile.branch || 'Science';
  const state = profile.state || 'Maharashtra';
  const goal = profile.career_goal || 'Software Engineer';
  const percentage = profile.percentage ? `${profile.percentage} percent` : 'good marks';

  return {
    en: `Hello ${name}. You are currently in ${edu}, studying ${branch} in ${state}, with ${percentage}. Your primary career goal is to become a ${goal}. You have active personalized recommendations for roadmaps, scholarships, and free learning resources.`,
    hi: `नमस्ते ${name}! आप वर्तमान में ${state} में ${branch} वर्ग में ${edu} की पढ़ाई कर रहे हैं, और आपके अंक ${profile.percentage || 80} प्रतिशत हैं। आपका मुख्य लक्ष्य ${goal} बनना है। आपके लिए व्यक्तिगत रोडमैप, छात्रवृत्तियां और मुफ्त अध्ययन संसाधन उपलब्ध हैं।`,
  };
}

/**
 * Generates bilingual speech text for the "Next Best Action" steps.
 */
export function getNextStepsSpeech(
  steps: Array<{ title: string; description: string }>
): MultilingualText {
  const enSteps = steps
    .slice(0, 5)
    .map((s, idx) => `Step ${idx + 1}: ${s.title}. ${s.description}`)
    .join(' ');

  const hiSteps = steps
    .slice(0, 5)
    .map((s, idx) => `कदम ${idx + 1}: ${s.title}। ${s.description}`)
    .join(' ');

  return {
    en: `Here are your personalized next steps to achieve your career goal. ${enSteps}`,
    hi: `आपके करियर लक्ष्य को पूरा करने के लिए आपके अगले महत्वपूर्ण कदम इस प्रकार हैं। ${hiSteps}`,
  };
}

/**
 * Generates bilingual speech text for an entire Career Roadmap.
 */
export function getRoadmapSpeech(
  careerTitle: string,
  pathwayTitle: string,
  steps: Array<{ title: string; description: string; duration?: string }>
): MultilingualText {
  const enSteps = steps
    .map(
      (s, idx) =>
        `Stage ${idx + 1}: ${s.title}${s.duration ? `, duration ${s.duration}` : ''}. ${s.description}`
    )
    .join('. ');

  const hiSteps = steps
    .map(
      (s, idx) =>
        `चरण ${idx + 1}: ${s.title}${s.duration ? `, समय अवधि ${s.duration}` : ''}। ${s.description}`
    )
    .join('। ');

  return {
    en: `Career roadmap for ${careerTitle}, following the ${pathwayTitle}. ${enSteps}. You will then begin your professional career as a ${careerTitle}.`,
    hi: `${careerTitle} बनने के लिए करियर रोडमैप, ${pathwayTitle} के अनुसार। ${hiSteps}। इसके बाद आप ${careerTitle} के रूप में अपना पेशेवर करियर शुरू कर सकते हैं।`,
  };
}

/**
 * Generates bilingual speech text for a Scholarship card.
 */
export function getScholarshipSpeech(
  name: string,
  provider: string,
  amount?: string,
  deadline?: string,
  matchedReasons?: string[]
): MultilingualText {
  const amountText = amount ? `Amount: ${amount}.` : '';
  const deadlineText = deadline ? `Application deadline is ${deadline}.` : '';
  const reasonsText =
    matchedReasons && matchedReasons.length > 0
      ? `You may qualify because ${matchedReasons.join(', and ')}.`
      : '';

  return {
    en: `${name}, provided by ${provider}. ${amountText} ${reasonsText} ${deadlineText}`,
    hi: `${name}, प्रदाता ${provider}। ${amount ? `छात्रवृत्ति राशि: ${amount}।` : ''} ${
      matchedReasons && matchedReasons.length > 0
        ? `आप इसके पात्र हो सकते हैं क्योंकि ${matchedReasons.join(', और ')}।`
        : ''
    } ${deadline ? `आवेदन की अंतिम तिथि ${deadline} है।` : ''}`,
  };
}

/**
 * Generates bilingual speech text for an Opportunity card.
 */
export function getOpportunitySpeech(
  title: string,
  organizer: string,
  type: string,
  description: string,
  stipend?: string,
  deadline?: string
): MultilingualText {
  return {
    en: `${title}. A ${type} organized by ${organizer}. ${
      stipend ? `Stipend or prize: ${stipend}.` : ''
    } ${description}. ${deadline ? `Deadline: ${deadline}.` : ''}`,
    hi: `${title}। ${organizer} द्वारा आयोजित ${type}। ${
      stipend ? `इनाम या छात्रवृत्ति: ${stipend}।` : ''
    } ${description}। ${deadline ? `अंतिम तिथि: ${deadline}।` : ''}`,
  };
}
