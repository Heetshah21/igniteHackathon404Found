import { Resource } from '@/types';

export const resources: Resource[] = [
  // ===== COMPUTER SCIENCE / PROGRAMMING =====
  {
    id: 'res-1', title: 'Python for Beginners - Full Course', description: 'Learn Python programming from scratch with practical examples and projects.', type: 'youtube', subject: 'Programming', branch: ['science', 'computer', 'engineering'], careers: ['software-engineer', 'ai-ml-engineer', 'data-scientist'], level: 'beginner', language: 'English', free: true, url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', provider: 'freeCodeCamp', tags: ['python', 'programming', 'beginner'],
  },
  {
    id: 'res-2', title: 'Python Tutorial in Hindi', description: 'Complete Python programming course in Hindi for beginners.', type: 'playlist', subject: 'Programming', branch: ['science', 'computer', 'engineering'], careers: ['software-engineer', 'ai-ml-engineer', 'data-scientist'], level: 'beginner', language: 'Hindi', free: true, url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt', provider: 'CodeWithHarry', tags: ['python', 'programming', 'hindi'],
  },
  {
    id: 'res-3', title: 'Web Development Full Course', description: 'Learn HTML, CSS, JavaScript, React - complete web development course.', type: 'youtube', subject: 'Web Development', branch: ['computer', 'engineering'], careers: ['software-engineer', 'designer'], level: 'beginner', language: 'English', free: true, url: 'https://www.youtube.com/watch?v=zJSY8tbf_ys', provider: 'freeCodeCamp', tags: ['web', 'html', 'css', 'javascript'],
  },
  {
    id: 'res-4', title: 'DSA in Java - Full Course (Hindi)', description: 'Complete Data Structures and Algorithms course in Java, explained in Hindi.', type: 'playlist', subject: 'DSA', branch: ['computer', 'engineering'], careers: ['software-engineer'], level: 'intermediate', language: 'Hindi', free: true, url: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop', provider: 'Apna College', tags: ['dsa', 'java', 'algorithms', 'placement'],
  },
  {
    id: 'res-5', title: 'CS50 - Introduction to Computer Science', description: 'Harvard\'s famous introductory course in Computer Science.', type: 'course', subject: 'Computer Science', branch: ['computer', 'science', 'engineering'], careers: ['software-engineer', 'ai-ml-engineer'], level: 'beginner', language: 'English', free: true, url: 'https://cs50.harvard.edu/x/', provider: 'Harvard/edX', tags: ['cs', 'fundamentals', 'harvard'],
  },

  // ===== AI / ML =====
  {
    id: 'res-6', title: 'Machine Learning by Andrew Ng', description: 'The most popular ML course. Covers linear regression, neural networks, and more.', type: 'course', subject: 'Machine Learning', branch: ['computer', 'science', 'engineering'], careers: ['ai-ml-engineer', 'data-scientist'], level: 'intermediate', language: 'English', free: true, url: 'https://www.coursera.org/learn/machine-learning', provider: 'Coursera / Stanford', tags: ['ml', 'ai', 'neural-networks'],
  },
  {
    id: 'res-7', title: 'Deep Learning Specialization', description: '5-course specialization covering neural networks, CNNs, RNNs, and more.', type: 'course', subject: 'Deep Learning', branch: ['computer', 'engineering'], careers: ['ai-ml-engineer'], level: 'advanced', language: 'English', free: true, url: 'https://www.coursera.org/specializations/deep-learning', provider: 'Coursera / deeplearning.ai', tags: ['deep-learning', 'ai', 'neural-networks'],
  },
  {
    id: 'res-8', title: 'AI/ML Complete Roadmap in Hindi', description: 'Complete AI and Machine Learning roadmap and tutorial in Hindi.', type: 'youtube', subject: 'AI/ML', branch: ['computer', 'engineering'], careers: ['ai-ml-engineer', 'data-scientist'], level: 'beginner', language: 'Hindi', free: true, url: 'https://www.youtube.com/watch?v=JxgmHe2NyeY', provider: 'CampusX', tags: ['ai', 'ml', 'roadmap', 'hindi'],
  },

  // ===== MATHEMATICS & SCIENCE =====
  {
    id: 'res-9', title: 'NCERT Mathematics Solutions (Class 11-12)', description: 'Complete NCERT Mathematics solutions with step-by-step explanations.', type: 'notes', subject: 'Mathematics', branch: ['science'], careers: ['software-engineer', 'ai-ml-engineer', 'civil-engineer', 'mechanical-engineer'], level: 'intermediate', language: 'English', free: true, url: 'https://www.mathongo.com/ncert-solutions', provider: 'MathOnGo', tags: ['maths', 'ncert', '11th', '12th'],
  },
  {
    id: 'res-10', title: 'Physics Wallah - 12th Physics', description: 'Complete 12th Physics lectures by Alakh Pandey.', type: 'playlist', subject: 'Physics', branch: ['science', 'engineering'], careers: ['civil-engineer', 'mechanical-engineer', 'electrical-engineer'], level: 'intermediate', language: 'Hindi', free: true, url: 'https://www.youtube.com/c/PhysicsWallah', provider: 'Physics Wallah', tags: ['physics', '12th', 'jee'],
  },
  {
    id: 'res-11', title: 'Khan Academy - Mathematics', description: 'World-class math education from basic arithmetic to calculus.', type: 'website', subject: 'Mathematics', branch: ['science', 'commerce', 'engineering'], careers: ['software-engineer', 'data-scientist', 'chartered-accountant'], level: 'beginner', language: 'English', free: true, url: 'https://www.khanacademy.org/math', provider: 'Khan Academy', tags: ['maths', 'fundamentals'],
  },

  // ===== COMMERCE =====
  {
    id: 'res-12', title: 'Accountancy Full Course - Class 12', description: 'Complete Class 12 Accountancy lessons for Commerce students.', type: 'playlist', subject: 'Accountancy', branch: ['commerce'], careers: ['chartered-accountant'], level: 'intermediate', language: 'Hindi', free: true, url: 'https://www.youtube.com/playlist?list=PLVLoWQFkZbhXM-bOzF3rNM1sVbRdERiSM', provider: 'Rajat Arora', tags: ['accountancy', 'commerce', '12th'],
  },
  {
    id: 'res-13', title: 'CA Foundation Complete Course', description: 'Full preparation course for CA Foundation examination.', type: 'course', subject: 'CA Foundation', branch: ['commerce'], careers: ['chartered-accountant'], level: 'intermediate', language: 'English', free: true, url: 'https://www.icai.org/post/ca-foundation', provider: 'ICAI', tags: ['ca', 'foundation', 'commerce'],
  },

  // ===== COMPETITIVE EXAMS =====
  {
    id: 'res-14', title: 'JEE Main & Advanced - Complete Preparation', description: 'Free JEE preparation lectures covering Physics, Chemistry, and Mathematics.', type: 'playlist', subject: 'JEE', branch: ['science', 'engineering'], careers: ['software-engineer', 'civil-engineer', 'mechanical-engineer', 'electrical-engineer'], level: 'advanced', language: 'Hindi', free: true, url: 'https://www.youtube.com/c/PhysicsWallah', provider: 'Physics Wallah', tags: ['jee', 'entrance', 'engineering'],
  },
  {
    id: 'res-15', title: 'NEET Preparation - Biology', description: 'Complete NEET Biology preparation course.', type: 'playlist', subject: 'Biology', branch: ['science', 'medical'], careers: ['doctor'], level: 'advanced', language: 'Hindi', free: true, url: 'https://www.youtube.com/results?search_query=neet+biology', provider: 'Various', tags: ['neet', 'biology', 'medical'],
  },
  {
    id: 'res-16', title: 'UPSC IAS Preparation Guide', description: 'Complete UPSC CSE preparation strategy, booklist, and free resources.', type: 'website', subject: 'UPSC', branch: ['science', 'commerce', 'arts'], careers: ['government-officer'], level: 'advanced', language: 'English', free: true, url: 'https://www.insightsonindia.com/', provider: 'Insights on India', tags: ['upsc', 'ias', 'government'],
  },

  // ===== CAREER GUIDANCE =====
  {
    id: 'res-17', title: 'Career Guidance After 10th - All Options', description: 'Comprehensive guide on what to do after 10th standard in India.', type: 'youtube', subject: 'Career Guidance', branch: ['science', 'commerce', 'arts', 'engineering'], careers: ['software-engineer', 'doctor', 'chartered-accountant', 'teacher'], level: 'beginner', language: 'Hindi', free: true, url: 'https://www.youtube.com/watch?v=career-after-10th', provider: 'Various', tags: ['career', 'guidance', '10th'],
  },
  {
    id: 'res-18', title: 'What to do after 12th? Complete Guide (Marathi)', description: '12वी नंतर काय करावे? सर्व पर्याय समजून घ्या.', type: 'youtube', subject: 'Career Guidance', branch: ['science', 'commerce', 'arts'], careers: ['software-engineer', 'doctor', 'chartered-accountant', 'teacher', 'government-officer'], level: 'beginner', language: 'Marathi', free: true, url: 'https://www.youtube.com/results?search_query=12th+nantar+kay+karave+marathi', provider: 'Various', tags: ['career', 'guidance', '12th', 'marathi'],
  },

  // ===== INTERVIEW PREP =====
  {
    id: 'res-19', title: 'Interview Preparation - Coding', description: 'Top 150 coding interview questions with solutions. Practice for FAANG interviews.', type: 'website', subject: 'Interview Prep', branch: ['computer', 'engineering'], careers: ['software-engineer', 'ai-ml-engineer'], level: 'intermediate', language: 'English', free: true, url: 'https://neetcode.io/', provider: 'NeetCode', tags: ['interview', 'coding', 'placement'],
  },
  {
    id: 'res-20', title: 'Soft Skills & Communication', description: 'Learn essential soft skills, communication, and presentation skills for interviews.', type: 'course', subject: 'Soft Skills', branch: ['science', 'commerce', 'arts', 'engineering', 'computer'], careers: ['software-engineer', 'digital-marketer', 'teacher', 'entrepreneur'], level: 'beginner', language: 'English', free: true, url: 'https://www.coursera.org/learn/communication-skills', provider: 'Coursera', tags: ['soft-skills', 'communication', 'interview'],
  },

  // ===== DIGITAL MARKETING =====
  {
    id: 'res-21', title: 'Google Digital Garage', description: 'Free digital marketing certification by Google. Learn SEO, SEM, social media marketing.', type: 'course', subject: 'Digital Marketing', branch: ['commerce', 'arts', 'computer'], careers: ['digital-marketer', 'entrepreneur'], level: 'beginner', language: 'English', free: true, url: 'https://learndigital.withgoogle.com/digitalgarage', provider: 'Google', tags: ['digital-marketing', 'seo', 'google'],
  },

  // ===== DESIGN =====
  {
    id: 'res-22', title: 'UI/UX Design Full Course', description: 'Learn UI/UX design from scratch. Covers Figma, design principles, prototyping.', type: 'youtube', subject: 'Design', branch: ['arts', 'computer'], careers: ['designer'], level: 'beginner', language: 'English', free: true, url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', provider: 'freeCodeCamp', tags: ['design', 'ui', 'ux', 'figma'],
  },

  // ===== PROJECTS =====
  {
    id: 'res-23', title: 'Build 10 Projects with Python', description: 'Hands-on Python projects from beginner to intermediate level.', type: 'youtube', subject: 'Projects', branch: ['computer', 'engineering'], careers: ['software-engineer', 'ai-ml-engineer'], level: 'intermediate', language: 'English', free: true, url: 'https://www.youtube.com/watch?v=8ext9G7xspg', provider: 'freeCodeCamp', tags: ['projects', 'python', 'hands-on'],
  },

  // ===== MARATHI RESOURCES =====
  {
    id: 'res-24', title: 'MPSC Preparation (Marathi)', description: 'MPSC परीक्षा तयारी - संपूर्ण मार्गदर्शन मराठीत.', type: 'playlist', subject: 'MPSC', branch: ['science', 'commerce', 'arts'], careers: ['government-officer'], level: 'intermediate', language: 'Marathi', free: true, url: 'https://www.youtube.com/results?search_query=mpsc+preparation+marathi', provider: 'Various', tags: ['mpsc', 'government', 'marathi'],
  },
  {
    id: 'res-25', title: 'Programming Basics in Marathi', description: 'प्रोग्रामिंग बेसिक्स मराठीत शिका. C, Python, Java.', type: 'playlist', subject: 'Programming', branch: ['computer', 'engineering'], careers: ['software-engineer'], level: 'beginner', language: 'Marathi', free: true, url: 'https://www.youtube.com/results?search_query=programming+marathi', provider: 'Various', tags: ['programming', 'marathi', 'beginner'],
  },

  // ===== ENTREPRENEURSHIP =====
  {
    id: 'res-26', title: 'Startup India - Entrepreneur Resources', description: 'Government resources and support for starting a business in India.', type: 'website', subject: 'Entrepreneurship', branch: ['science', 'commerce', 'arts', 'engineering', 'computer'], careers: ['entrepreneur'], level: 'beginner', language: 'English', free: true, url: 'https://www.startupindia.gov.in/', provider: 'Government of India', tags: ['startup', 'entrepreneur', 'business'],
  },

  // ===== ELECTRICAL ENGINEERING =====
  {
    id: 'res-27', title: 'Electrical Engineering Basics (NPTEL)', description: 'Free NPTEL course on electrical engineering fundamentals from IIT professors.', type: 'course', subject: 'Electrical Engineering', branch: ['engineering'], careers: ['electrical-engineer'], level: 'intermediate', language: 'English', free: true, url: 'https://nptel.ac.in/courses/108/102/108102146/', provider: 'NPTEL / IIT', tags: ['electrical', 'nptel', 'engineering'],
  },

  // ===== DATA SCIENCE =====
  {
    id: 'res-28', title: 'Data Science with Python (Hindi)', description: 'Complete Data Science course in Hindi covering Pandas, NumPy, Matplotlib.', type: 'playlist', subject: 'Data Science', branch: ['computer', 'science', 'engineering'], careers: ['data-scientist', 'ai-ml-engineer'], level: 'intermediate', language: 'Hindi', free: true, url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agK1JkRQMhJEcT7SLmwHWFz', provider: 'CodeWithHarry', tags: ['data-science', 'python', 'hindi'],
  },

  // ===== FREELANCING =====
  {
    id: 'res-29', title: 'Freelancing Guide for Students', description: 'How to start freelancing as a student. Earn while you learn.', type: 'youtube', subject: 'Freelancing', branch: ['computer', 'arts', 'commerce'], careers: ['software-engineer', 'designer', 'digital-marketer'], level: 'beginner', language: 'English', free: true, url: 'https://www.youtube.com/watch?v=freelancing-guide', provider: 'Various', tags: ['freelancing', 'income', 'student'],
  },

  // ===== GIT / TOOLS =====
  {
    id: 'res-30', title: 'Git & GitHub for Beginners', description: 'Learn Git version control and GitHub collaboration - essential for developers.', type: 'youtube', subject: 'Tools', branch: ['computer', 'engineering'], careers: ['software-engineer', 'ai-ml-engineer', 'data-scientist'], level: 'beginner', language: 'English', free: true, url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', provider: 'freeCodeCamp', tags: ['git', 'github', 'tools'],
  },
];
