import { Roadmap } from '@/types';

export const roadmaps: Roadmap[] = [
  // ===== SOFTWARE ENGINEER =====
  {
    id: 'se-path-1',
    career_id: 'software-engineer',
    title: 'B.Tech Computer Science Path',
    description: 'The most common path through 12th Science and B.Tech CSE',
    steps: [
      { id: 'se1-1', title: '10th Standard', description: 'Complete 10th with strong Mathematics and Science scores', duration: 'Completed', requirements: ['Mathematics', 'Science'], tips: ['Focus on building strong fundamentals in Maths'] },
      { id: 'se1-2', title: '12th Science (PCM)', description: 'Choose Physics, Chemistry, Mathematics stream. Prepare for JEE/CET entrance exams.', duration: '2 years', requirements: ['Physics', 'Chemistry', 'Mathematics'], tips: ['Start JEE prep early', 'Practice previous year papers'] },
      { id: 'se1-3', title: 'B.Tech Computer Science', description: 'Complete B.Tech/B.E. in Computer Science from a recognized university. Learn programming, data structures, algorithms.', duration: '4 years', requirements: ['JEE/CET/State Entrance Score', '12th PCM'], tips: ['Build projects alongside coursework', 'Learn Git and open source'] },
      { id: 'se1-4', title: 'Internships & Projects', description: 'Complete 2-3 internships. Build real-world projects. Contribute to open source.', duration: '6-12 months', requirements: ['Programming skills', 'DSA knowledge'], tips: ['Apply on LinkedIn, Internshala', 'Build a portfolio website'] },
      { id: 'se1-5', title: 'Software Engineer', description: 'Apply for full-time software engineer positions at product companies, service companies, or startups.', duration: 'Career Start', requirements: ['B.Tech degree', 'Strong DSA', 'Project portfolio'], tips: ['Practice on LeetCode', 'Prepare for system design'] },
    ],
  },
  {
    id: 'se-path-2',
    career_id: 'software-engineer',
    title: 'Diploma → Direct Second Year Path',
    description: 'Start with Diploma after 10th and enter B.Tech directly in second year',
    steps: [
      { id: 'se2-1', title: '10th Standard', description: 'Complete 10th standard', duration: 'Completed' },
      { id: 'se2-2', title: 'Diploma in Computer Engineering', description: 'Join a 3-year Diploma program in Computer Engineering from a polytechnic college.', duration: '3 years', requirements: ['10th pass'], tips: ['Learn programming alongside diploma', 'Build small projects'] },
      { id: 'se2-3', title: 'Direct Second Year B.Tech', description: 'Enter B.Tech Computer Science directly in 2nd year through lateral entry.', duration: '3 years', requirements: ['Diploma completion', 'Entrance exam'], tips: ['Bridge the gap with self-study', 'Focus on competitive coding'] },
      { id: 'se2-4', title: 'Internship & Placement', description: 'Get campus placement or apply for internships in final year.', duration: '6 months', requirements: ['Good CGPA', 'Programming skills'] },
      { id: 'se2-5', title: 'Software Engineer', description: 'Start your career as a software engineer.', duration: 'Career Start' },
    ],
  },
  {
    id: 'se-path-3',
    career_id: 'software-engineer',
    title: 'BCA → MCA Path',
    description: 'Bachelor of Computer Applications followed by MCA',
    steps: [
      { id: 'se3-1', title: '12th (Any Stream)', description: 'Complete 12th from any stream with Mathematics.', duration: '2 years', requirements: ['Mathematics in 12th'] },
      { id: 'se3-2', title: 'BCA (Bachelor of Computer Applications)', description: 'Study computer science fundamentals, programming, and software development.', duration: '3 years', requirements: ['12th pass with Maths'], tips: ['Learn additional languages like Python, Java', 'Do freelance projects'] },
      { id: 'se3-3', title: 'MCA (Master of Computer Applications)', description: 'Advanced computer science education with specialization options.', duration: '2 years', requirements: ['BCA degree', 'Entrance exam'], tips: ['Specialize in your area of interest', 'Focus on research or industry projects'] },
      { id: 'se3-4', title: 'Software Engineer', description: 'Enter the industry with strong academic and practical skills.', duration: 'Career Start' },
    ],
  },

  // ===== AI/ML ENGINEER =====
  {
    id: 'ai-path-1',
    career_id: 'ai-ml-engineer',
    title: 'B.Tech CSE → AI/ML Specialization',
    description: 'Traditional engineering path with AI/ML focus',
    steps: [
      { id: 'ai1-1', title: '12th Science (PCM)', description: 'Strong foundation in Mathematics is essential for AI/ML.', duration: '2 years', requirements: ['Physics', 'Chemistry', 'Mathematics'] },
      { id: 'ai1-2', title: 'B.Tech CSE / AI&ML', description: 'Many colleges now offer B.Tech in AI&ML or CSE with AI specialization.', duration: '4 years', requirements: ['JEE/CET score'], tips: ['Take electives in Machine Learning, Deep Learning', 'Learn Python, TensorFlow, PyTorch'] },
      { id: 'ai1-3', title: 'ML Internship / Research', description: 'Get hands-on experience with real ML projects. Publish research papers if possible.', duration: '6-12 months', tips: ['Kaggle competitions', 'Research internships at IITs/IIITs'] },
      { id: 'ai1-4', title: 'AI/ML Engineer', description: 'Join as ML Engineer at tech companies or AI startups.', duration: 'Career Start' },
    ],
  },
  {
    id: 'ai-path-2',
    career_id: 'ai-ml-engineer',
    title: 'Self-Learning + Online Certification Path',
    description: 'For those who want to transition into AI/ML through online courses',
    steps: [
      { id: 'ai2-1', title: 'Any Degree with Strong Maths', description: 'Complete any degree. Strong mathematics and statistics background helps.', duration: '3-4 years' },
      { id: 'ai2-2', title: 'Online ML Courses & Certifications', description: 'Complete courses on Coursera (Andrew Ng), fast.ai, or NPTEL. Get certified.', duration: '6-12 months', tips: ['Start with Andrew Ng ML course', 'Practice on Kaggle'] },
      { id: 'ai2-3', title: 'Build AI Projects Portfolio', description: 'Create 3-5 meaningful AI projects. Deploy them. Share on GitHub.', duration: '3-6 months' },
      { id: 'ai2-4', title: 'AI/ML Engineer', description: 'Apply for ML roles with your project portfolio and certifications.', duration: 'Career Start' },
    ],
  },

  // ===== DATA SCIENTIST =====
  {
    id: 'ds-path-1',
    career_id: 'data-scientist',
    title: 'B.Tech/B.Sc → Data Science',
    description: 'Engineering or science degree followed by data science specialization',
    steps: [
      { id: 'ds1-1', title: '12th Science (PCM)', description: 'Focus on Mathematics and Statistics.', duration: '2 years' },
      { id: 'ds1-2', title: 'B.Tech CSE / B.Sc Statistics', description: 'Get a strong foundation in programming and statistics.', duration: '3-4 years', tips: ['Learn Python, R, SQL', 'Study Statistics thoroughly'] },
      { id: 'ds1-3', title: 'Data Science Certification/M.Sc', description: 'Specialize through postgrad or professional certification in Data Science.', duration: '1-2 years' },
      { id: 'ds1-4', title: 'Data Scientist', description: 'Join as Data Analyst or Data Scientist at analytics/tech companies.', duration: 'Career Start' },
    ],
  },

  // ===== DOCTOR =====
  {
    id: 'doc-path-1',
    career_id: 'doctor',
    title: 'NEET → MBBS Path',
    description: 'Standard medical education path through NEET examination',
    steps: [
      { id: 'doc1-1', title: '10th Standard', description: 'Score well in Science and prepare for 12th Biology.', duration: 'Completed' },
      { id: 'doc1-2', title: '12th Science (PCB)', description: 'Choose Physics, Chemistry, Biology. Start NEET preparation.', duration: '2 years', requirements: ['Physics', 'Chemistry', 'Biology'], tips: ['Join NEET coaching', 'Solve NCERT thoroughly'] },
      { id: 'doc1-3', title: 'NEET Examination', description: 'Clear NEET with a competitive score for MBBS admission.', duration: '1 attempt/year', tips: ['Practice mock tests', 'Focus on NCERT + reference books'] },
      { id: 'doc1-4', title: 'MBBS', description: 'Complete MBBS from a recognized medical college. Includes internship.', duration: '5.5 years', requirements: ['NEET qualified'] },
      { id: 'doc1-5', title: 'MD/MS (Optional)', description: 'Specialize in a medical field through postgraduate studies.', duration: '3 years' },
      { id: 'doc1-6', title: 'Doctor', description: 'Practice as a doctor in hospital, clinic, or start your own practice.', duration: 'Career Start' },
    ],
  },

  // ===== CHARTERED ACCOUNTANT =====
  {
    id: 'ca-path-1',
    career_id: 'chartered-accountant',
    title: 'Commerce → CA Path',
    description: 'Traditional CA path after 12th Commerce',
    steps: [
      { id: 'ca1-1', title: '12th Commerce', description: 'Study Commerce with Accountancy, Business Studies, Economics.', duration: '2 years' },
      { id: 'ca1-2', title: 'CA Foundation', description: 'Clear the CA Foundation exam (4 papers). Register with ICAI.', duration: '4 months', tips: ['Self-study or coaching', 'Practice numerical problems daily'] },
      { id: 'ca1-3', title: 'CA Intermediate', description: 'Clear both groups of CA Intermediate (8 papers).', duration: '8-10 months' },
      { id: 'ca1-4', title: 'Articleship Training', description: 'Complete 3 years of practical training under a practicing CA.', duration: '3 years', tips: ['Choose a good firm', 'Learn audit and taxation practically'] },
      { id: 'ca1-5', title: 'CA Final', description: 'Clear both groups of CA Final examination.', duration: '6-8 months' },
      { id: 'ca1-6', title: 'Chartered Accountant', description: 'Become a member of ICAI and practice as a CA.', duration: 'Career Start' },
    ],
  },

  // ===== CIVIL ENGINEER =====
  {
    id: 'ce-path-1',
    career_id: 'civil-engineer',
    title: 'B.Tech Civil Engineering',
    description: 'Standard engineering path for civil engineering',
    steps: [
      { id: 'ce1-1', title: '12th Science (PCM)', description: 'Complete 12th with Physics, Chemistry, Mathematics.', duration: '2 years' },
      { id: 'ce1-2', title: 'B.Tech Civil Engineering', description: 'Study structural engineering, construction, surveying, and project management.', duration: '4 years' },
      { id: 'ce1-3', title: 'Site Experience / Internship', description: 'Get practical experience at construction sites or engineering firms.', duration: '6-12 months' },
      { id: 'ce1-4', title: 'Civil Engineer', description: 'Work at construction companies, government departments, or consultancy firms.', duration: 'Career Start' },
    ],
  },

  // ===== TEACHER =====
  {
    id: 'teach-path-1',
    career_id: 'teacher',
    title: 'B.Ed Path',
    description: 'Graduation followed by B.Ed for teaching career',
    steps: [
      { id: 't1-1', title: '12th (Any Stream)', description: 'Complete 12th from any stream based on subject you want to teach.', duration: '2 years' },
      { id: 't1-2', title: 'Graduation (BA/B.Sc/B.Com)', description: 'Complete graduation in your chosen subject.', duration: '3 years' },
      { id: 't1-3', title: 'B.Ed', description: 'Complete Bachelor of Education to become eligible for teaching.', duration: '2 years' },
      { id: 't1-4', title: 'TET/CTET', description: 'Clear Teacher Eligibility Test for government school appointments.', duration: '3-6 months' },
      { id: 't1-5', title: 'Teacher', description: 'Join as a teacher in school, college, or coaching institute.', duration: 'Career Start' },
    ],
  },

  // ===== DESIGNER =====
  {
    id: 'design-path-1',
    career_id: 'designer',
    title: 'Design Degree / Self-Taught Path',
    description: 'Formal design education or self-taught with portfolio',
    steps: [
      { id: 'd1-1', title: '12th (Any Stream)', description: 'Complete 12th. Arts stream preferred but not required.', duration: '2 years' },
      { id: 'd1-2', title: 'B.Des / Design Course', description: 'Study at NID, NIFT, or take online UX/UI design courses.', duration: '4 years or 6-12 months (online)', tips: ['Learn Figma, Adobe XD', 'Study design principles'] },
      { id: 'd1-3', title: 'Build Design Portfolio', description: 'Create 5-10 case studies. Work on real projects or redesign existing apps.', duration: '3-6 months' },
      { id: 'd1-4', title: 'UI/UX Designer', description: 'Join as a product designer at tech companies or design agencies.', duration: 'Career Start' },
    ],
  },

  // ===== GOVERNMENT OFFICER =====
  {
    id: 'gov-path-1',
    career_id: 'government-officer',
    title: 'UPSC Civil Services Path',
    description: 'Prepare for UPSC CSE after graduation',
    steps: [
      { id: 'g1-1', title: 'Graduation (Any Subject)', description: 'Complete graduation from a recognized university in any subject.', duration: '3-4 years' },
      { id: 'g1-2', title: 'UPSC Preparation', description: 'Prepare for UPSC Civil Services Examination. Study GS, optional subject, CSAT.', duration: '1-2 years', tips: ['Read newspapers daily', 'Follow standard UPSC booklist', 'Answer writing practice'] },
      { id: 'g1-3', title: 'UPSC Prelims + Mains + Interview', description: 'Clear all three stages of UPSC CSE.', duration: '1 year cycle' },
      { id: 'g1-4', title: 'IAS/IPS/IFS Officer', description: 'Join the Indian Administrative, Police, or Foreign Service.', duration: 'Career Start' },
    ],
  },

  // ===== DIGITAL MARKETER =====
  {
    id: 'dm-path-1',
    career_id: 'digital-marketer',
    title: 'Self-Learning + Certification Path',
    description: 'Learn digital marketing through online courses and certifications',
    steps: [
      { id: 'dm1-1', title: '12th / Graduation (Any)', description: 'Complete basic education. No specific stream required.', duration: '2-3 years' },
      { id: 'dm1-2', title: 'Digital Marketing Courses', description: 'Complete Google Digital Garage, HubSpot, Meta Blueprint certifications.', duration: '3-6 months', tips: ['All certifications are free', 'Practice with personal projects'] },
      { id: 'dm1-3', title: 'Build Portfolio & Freelance', description: 'Run campaigns for small businesses. Build case studies.', duration: '3-6 months' },
      { id: 'dm1-4', title: 'Digital Marketer', description: 'Join a marketing agency, startup, or work as a freelancer.', duration: 'Career Start' },
    ],
  },

  // ===== MECHANICAL ENGINEER =====
  {
    id: 'me-path-1',
    career_id: 'mechanical-engineer',
    title: 'B.Tech Mechanical Engineering',
    description: 'Standard engineering path for mechanical engineering',
    steps: [
      { id: 'me1-1', title: '12th Science (PCM)', description: 'Complete 12th with Physics, Chemistry, Mathematics.', duration: '2 years' },
      { id: 'me1-2', title: 'B.Tech Mechanical Engineering', description: 'Study thermodynamics, mechanics, manufacturing, and design.', duration: '4 years' },
      { id: 'me1-3', title: 'Industry Internship', description: 'Gain hands-on experience in manufacturing or automotive industry.', duration: '6 months' },
      { id: 'me1-4', title: 'Mechanical Engineer', description: 'Work in automotive, manufacturing, aerospace, or energy sectors.', duration: 'Career Start' },
    ],
  },

  // ===== ENTREPRENEUR =====
  {
    id: 'ent-path-1',
    career_id: 'entrepreneur',
    title: 'Startup Path',
    description: 'Build skills and launch your own venture',
    steps: [
      { id: 'e1-1', title: 'Education (Any Field)', description: 'Complete education in any field. Learn business fundamentals.', duration: '3-4 years' },
      { id: 'e1-2', title: 'Industry Experience', description: 'Work 1-3 years to understand business operations and market needs.', duration: '1-3 years' },
      { id: 'e1-3', title: 'Ideation & Validation', description: 'Identify a problem, validate your solution, build an MVP.', duration: '3-6 months', tips: ['Talk to potential customers', 'Build lean, test fast'] },
      { id: 'e1-4', title: 'Launch & Scale', description: 'Launch your startup. Apply to incubators, seek funding if needed.', duration: 'Ongoing', tips: ['Apply to Y Combinator, Nasscom, T-Hub', 'Focus on unit economics'] },
    ],
  },
];
