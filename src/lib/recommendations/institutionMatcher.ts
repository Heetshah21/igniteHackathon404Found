import { Institution, InstitutionRecommendation, InstitutionPreferenceFilter, StudentProfile, RoadmapStep } from '@/types';

// City Coordinates for Distance Calculations (Lat, Long)
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'nashik': { lat: 19.9975, lng: 73.7898 },
  'pune': { lat: 18.5204, lng: 73.8567 },
  'mumbai': { lat: 19.0760, lng: 72.8777 },
  'navi mumbai': { lat: 19.0330, lng: 73.0297 },
  'thane': { lat: 19.2183, lng: 72.9781 },
  'nagpur': { lat: 21.1458, lng: 79.0882 },
  'aurangabad': { lat: 19.8762, lng: 75.3433 },
  'chhatrapati sambhajinagar': { lat: 19.8762, lng: 75.3433 },
  'kolhapur': { lat: 16.7050, lng: 74.2433 },
  'solapur': { lat: 17.6599, lng: 75.9064 },
  'amravati': { lat: 20.9374, lng: 77.7796 },
  'jalgaon': { lat: 21.0077, lng: 75.5626 },
  'dhule': { lat: 20.9042, lng: 74.7749 },
  'ahmednagar': { lat: 19.0948, lng: 74.7480 },
  'satara': { lat: 17.6805, lng: 74.0183 },
  'sangli': { lat: 16.8524, lng: 74.5815 },
  'nanded': { lat: 19.1383, lng: 77.3210 },
  'delhi': { lat: 28.6139, lng: 77.2090 },
  'new delhi': { lat: 28.6139, lng: 77.2090 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
};

/**
 * Approximate distance in kilometers using the Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Resolve student approximate coordinates from profile location
 */
function getStudentCoordinates(profile?: Partial<StudentProfile>): { lat: number; lng: number } | null {
  if (!profile) return null;
  const locRaw = (profile.location || '').toLowerCase().trim();
  if (!locRaw) return null;

  for (const [cityName, coords] of Object.entries(CITY_COORDINATES)) {
    if (locRaw.includes(cityName)) {
      return coords;
    }
  }
  // Default to Maharashtra center / Nashik if state is Maharashtra
  if ((profile.state || '').toLowerCase().includes('maharashtra')) {
    return CITY_COORDINATES['nashik'];
  }
  return null;
}

/**
 * Determine affordability tier based on student family income and annual college fee
 */
export function determineAffordability(
  fee?: number,
  familyIncome?: string | number
): 'Budget-friendly' | 'Comfortable fit' | 'Moderate' | 'May require financial support' | 'Fee information unavailable' {
  if (fee === undefined || fee === null) {
    return 'Fee information unavailable';
  }

  const incomeStr = String(familyIncome || '').toLowerCase();

  // Low Income Tier (Under ₹2.5L / BPL / EWS)
  const isLowIncome =
    incomeStr.includes('below-1l') ||
    incomeStr.includes('1l-2.5l') ||
    incomeStr.includes('2.5') ||
    incomeStr.includes('ews') ||
    incomeStr.includes('bpl') ||
    incomeStr === '1' ||
    incomeStr === '2';

  if (fee === 0 || fee <= 15000) {
    return 'Budget-friendly';
  }

  if (isLowIncome) {
    if (fee <= 35000) return 'Comfortable fit';
    if (fee <= 75000) return 'Moderate';
    return 'May require financial support';
  }

  // Middle Income Tier
  if (fee <= 60000) return 'Comfortable fit';
  if (fee <= 125000) return 'Moderate';
  return 'May require financial support';
}

/**
 * Classify if a roadmap stage is educational (colleges/polytechnics) or experiential (internships/projects)
 */
export function isEducationStage(step: RoadmapStep): boolean {
  const text = `${step.title || ''} ${step.description || ''}`.toLowerCase();
  return (
    text.includes('10th') ||
    text.includes('11th') ||
    text.includes('12th') ||
    text.includes('science') ||
    text.includes('commerce') ||
    text.includes('arts') ||
    text.includes('diploma') ||
    text.includes('polytechnic') ||
    text.includes('b.tech') ||
    text.includes('btech') ||
    text.includes('bca') ||
    text.includes('b.sc') ||
    text.includes('bsc') ||
    text.includes('mca') ||
    text.includes('m.tech') ||
    text.includes('degree') ||
    text.includes('college') ||
    text.includes('undergraduate') ||
    text.includes('dse') ||
    text.includes('lateral entry') ||
    text.includes('ca foundation') ||
    text.includes('mbbs') ||
    text.includes('upsc') ||
    text.includes('entrance')
  );
}

/**
 * Filter and Rank Top 2-3 Educational Institutions for a given Roadmap Stage
 */
export function matchInstitutionsForStage(
  institutions: Institution[],
  step: RoadmapStep,
  profile: Partial<StudentProfile>,
  filters: InstitutionPreferenceFilter = {}
): InstitutionRecommendation[] {
  const safeInstitutions = institutions ?? [];
  const studentCoords = getStudentCoordinates(profile);
  const studentLocationName = profile?.location || 'Your city';
  const stageText = `${step.title || ''} ${step.description || ''}`.toLowerCase();

  // 1. Identify stage target domain
  const isPolytechnic = stageText.includes('diploma') || stageText.includes('polytechnic');
  const is12thScience = stageText.includes('12th') && (stageText.includes('science') || stageText.includes('pcm') || stageText.includes('pcb'));
  const is12thCommerce = stageText.includes('12th') && stageText.includes('commerce');
  const isEngineering = stageText.includes('b.tech') || stageText.includes('btech') || stageText.includes('engineering') || stageText.includes('dse');
  const isBCA = stageText.includes('bca') || stageText.includes('computer application');
  const isCivilServices = stageText.includes('upsc') || stageText.includes('mpsc') || stageText.includes('civil service');
  const isCA = stageText.includes('ca') || stageText.includes('chartered') || stageText.includes('foundation');

  const candidates = safeInstitutions.filter((inst) => {
    // Girls Only Filter
    if (filters.girlsOnly && !inst.girls_only) {
      return false;
    }

    // Government Only Filter
    if (filters.governmentOnly && !inst.government) {
      return false;
    }

    // Hostel Filter
    if (filters.hostelAvailable && !inst.hostel_available) {
      return false;
    }

    // Low Fees Filter
    if (filters.lowFees && (inst.annual_fee ?? 0) > 25000) {
      return false;
    }

    // Scholarship Friendly Filter
    if (filters.scholarshipFriendly && !inst.scholarship_available) {
      return false;
    }

    return true;
  });

  const scoredList = candidates.map((inst) => {
    let score = 50;
    const matchReasons: string[] = [];
    const highlights: string[] = [];

    // Compute approximate distance
    let distanceKm = 12;
    if (studentCoords && inst.latitude && inst.longitude) {
      distanceKm = calculateDistanceKm(
        studentCoords.lat,
        studentCoords.lng,
        inst.latitude,
        inst.longitude
      );
    } else if (inst.city.toLowerCase() === (profile?.location || '').toLowerCase()) {
      distanceKm = 6;
    } else {
      distanceKm = 85;
    }

    // Distance Label
    let distanceLabel = `${distanceKm} km from you`;
    if (distanceKm <= 10) {
      distanceLabel = `${distanceKm} km (In ${inst.city})`;
    } else if (distanceKm <= 50) {
      distanceLabel = `${distanceKm} km nearby`;
    } else {
      distanceLabel = `${distanceKm} km (${inst.city})`;
    }

    // 1. Stage & Stream Affinity
    const instStream = (inst.stream || '').toLowerCase();
    const instType = (inst.type || '').toLowerCase();

    if (isPolytechnic) {
      if (instType.includes('polytechnic')) {
        score += 45;
        matchReasons.push('Direct Polytechnic Diploma pathway with state DSE eligibility');
      }
    } else if (isEngineering) {
      if (instType.includes('engineering') || instStream.includes('engineering')) {
        score += 45;
        matchReasons.push('Accredited B.Tech curriculum matching your tech career aspiration');
      }
    } else if (isBCA) {
      if (instStream.includes('computer application') || instType.includes('university') || instType.includes('degree')) {
        score += 45;
        matchReasons.push('BCA degree program with hands-on coding and software fundamentals');
      }
    } else if (is12thScience) {
      if (instStream.includes('science') || instType.includes('junior')) {
        score += 45;
        matchReasons.push('Recognized junior college with PCM lab infrastructure');
      }
    } else if (is12thCommerce || isCA) {
      if (instStream.includes('commerce') || instType.includes('degree') || instType.includes('junior')) {
        score += 45;
        matchReasons.push('Strong commerce faculty with CA Foundation support batches');
      }
    } else if (isCivilServices) {
      if (instStream.includes('civil') || instType.includes('training')) {
        score += 45;
        matchReasons.push('Free government administrative coaching with residential facilities');
      }
    } else {
      score += 25;
      matchReasons.push('Curriculum directly aligned with this roadmap stage');
    }

    // 2. Proximity Scoring
    if (distanceKm <= 15) {
      score += 35;
      highlights.push(`Close to ${studentLocationName}`);
      matchReasons.push(`Located locally in ${inst.city}, minimizing daily travel costs`);
    } else if (distanceKm <= 80) {
      score += 20;
      highlights.push(`Within ${inst.city} region`);
    } else if (inst.hostel_available) {
      score += 15;
      highlights.push('Hostel available');
      matchReasons.push('Offers on-campus hostel facilities for outstation students');
    }

    // 3. Government / Aided advantage
    if (inst.government) {
      score += 25;
      highlights.push('Government / Aided');
      matchReasons.push('Government-aided institute with subsidized fees & state scholarship quotas');
    }

    // 4. Girls only
    if (inst.girls_only) {
      highlights.push('Girls-only Campus');
      if (filters.girlsOnly) {
        score += 30;
        matchReasons.push('Safe, dedicated women education campus with zero-tuition support');
      }
    }

    // 5. Affordability
    const affordabilityBadge = determineAffordability(inst.annual_fee, profile?.family_income);
    if (affordabilityBadge === 'Budget-friendly' || affordabilityBadge === 'Comfortable fit') {
      score += 20;
      highlights.push(affordabilityBadge);
      matchReasons.push('Fits comfortably within your family estimated annual education budget');
    }

    // 6. Closest preference
    if (filters.closestToMe) {
      score += Math.max(0, 50 - distanceKm);
    }

    // Ensure at least 2 clear reasons
    if (matchReasons.length < 2) {
      matchReasons.push('Recognized board/university degree accepted by industry recruiters');
    }

    return {
      institution: inst,
      distanceKm,
      distanceLabel,
      affordabilityBadge,
      matchScore: score,
      matchReasons: matchReasons.slice(0, 3),
      highlights: highlights.slice(0, 3),
    };
  });

  // Sort by highest match score and return top 3
  scoredList.sort((a, b) => b.matchScore - a.matchScore);
  return scoredList.slice(0, 3);
}

/**
 * Recommendation data for non-college experiential stages (e.g. Internships, Projects, Certifications)
 */
export interface PracticalStageGuide {
  title: string;
  subtitle: string;
  recommendedActions: Array<{
    title: string;
    description: string;
    tag: string;
    url?: string;
  }>;
  freePlatforms: string[];
  documentsOrPrerequisites: string[];
  firstGenStudentTip: string;
}

export function getPracticalStageGuide(step: RoadmapStep, careerTitle?: string): PracticalStageGuide {
  const text = `${step.title || ''} ${step.description || ''}`.toLowerCase();

  if (text.includes('internship') || text.includes('practical experience') || text.includes('industrial training')) {
    return {
      title: 'Real-World Experience & Internships',
      subtitle: 'Gain practical industry proof without needing expensive coaching or connections.',
      recommendedActions: [
        {
          title: 'Smart India Hackathon (SIH) & National Contests',
          description: 'Team up with college friends to solve real government/industry problem statements. Top teams get direct interview calls.',
          tag: '100% Free • High Resume Value',
          url: 'https://sih.gov.in',
        },
        {
          title: 'Google Summer of Code (GSoC) / Linux Foundation Mentorship',
          description: 'Contribute to global open-source codebases. Offers generous student stipends (~$1,500 - $3,000) and world-class developer mentors.',
          tag: 'Remote • Stipend Included',
          url: 'https://summerofcode.withgoogle.com',
        },
        {
          title: 'AICTE / Internshala Rural Student Internship Portal',
          description: 'Apply for verified virtual internships with verified companies with monthly stipends.',
          tag: 'Virtual • Beginner Friendly',
          url: 'https://internship.aicte-india.org',
        },
      ],
      freePlatforms: ['GitHub', 'Internshala', 'AICTE Internship Portal', 'Unstop Competitions'],
      documentsOrPrerequisites: [
        'College Bonafide / NOC Certificate',
        'Updated 1-Page ATS Resume (make in CareerMitra)',
        'GitHub profile link with at least 2 working projects',
      ],
      firstGenStudentTip: 'Never pay any company for an internship. Legitimate tech internships are always free to join and often provide stipends.',
    };
  }

  if (text.includes('project') || text.includes('portfolio') || text.includes('skills') || text.includes('full-stack') || text.includes('data structures')) {
    return {
      title: 'Build Proof-of-Work Projects',
      subtitle: 'Employers and recruiters value what you have actually built more than test scores.',
      recommendedActions: [
        {
          title: 'Full-Stack Practical Web Application',
          description: 'Build a portal that solves a rural/local problem (e.g. Village Crop Price Tracker, Local Hospital Bed Finder, or Bus Timetable app).',
          tag: 'Recommended Capstone Project',
        },
        {
          title: 'Data Structures & Algorithmic Foundations',
          description: 'Practice 50 essential problem-solving questions in Python, Java, or C++ to pass standard technical screening tests.',
          tag: 'Core Interview Skill',
          url: 'https://leetcode.com',
        },
        {
          title: 'Deploy Live on Vercel / Render / GitHub Pages',
          description: 'Ensure your project has a live working link that any interviewer can open on their mobile phone or laptop.',
          tag: 'Essential for Resume',
        },
      ],
      freePlatforms: ['FreeCodeCamp', 'GitHub', 'LeetCode (Free tier)', 'Supabase (Free DB tier)'],
      documentsOrPrerequisites: [
        'Working laptop or access to college computer lab',
        'Free GitHub account',
        'Clean README with screenshots and project demo link',
      ],
      firstGenStudentTip: 'A simple project that is live and working with real users is 10x more impressive than 5 incomplete clone tutorials.',
    };
  }

  // Default Entry-Level Job / Entrance Exam Stage Guide
  return {
    title: 'Career Readiness & Gateway Checklist',
    subtitle: `Step-by-step action items to transition successfully into your ${careerTitle || 'target'} role.`,
    recommendedActions: [
      {
        title: 'Master Technical & Core Subject Fundamentals',
        description: 'Review standard textbooks and free video playlists for core conceptual clarity and interview FAQs.',
        tag: 'High Priority',
      },
      {
        title: 'Mock Interview & Aptitude Practice',
        description: 'Practice quantitative aptitude, reasoning tests, and communication with AI mentor or peer study groups.',
        tag: 'Weekly Practice',
      },
      {
        title: 'State Scholarship & Government Financial Aid Check',
        description: 'Verify MahaDBT, NSP, and central fee reimbursement schemes before semester deadlines.',
        tag: 'Financial Support',
      },
    ],
    freePlatforms: ['NPTEL Swayam (IIT Lectures)', 'GeeksforGeeks', 'CareerMitra AI Assistant'],
    documentsOrPrerequisites: [
      '10th/12th/Degree Marksheets',
      'Domicile & Caste Certificate (if applicable for quota/fee concession)',
      'Income Certificate (Tehsildar signed for current financial year)',
    ],
    firstGenStudentTip: 'Keep all your educational certificates scanned in a Google Drive folder with DigiLocker linked to your Aadhaar for rapid online applications.',
  };
}
