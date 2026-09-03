import { NextRequest, NextResponse } from 'next/server';
import { StudentProfile } from '@/types';

// Mock Knowledge Base fallback when no Gemini/OpenAI API key is configured
function generateMockResponse(query: string, profile?: Partial<StudentProfile>): string {
  const q = query.toLowerCase();
  const name = profile?.name || 'Student';
  const state = profile?.state || 'Maharashtra';
  const branch = profile?.branch || 'science';
  const edu = profile?.education_level || '12th';
  const goal = profile?.career_goal || 'Software Engineer';

  if (q.includes('diploma') && (q.includes('software engineer') || q.includes('engineer') || q.includes('dse'))) {
    return `Hello ${name}! 👋

**Yes, you can absolutely become a Software Engineer after completing a Diploma!**

Here is the exact **Direct Second Year Engineering (DSE)** pathway in ${state}:

1. **Step 1: Complete 3-Year Diploma**
   - Finish your Diploma in Computer Engineering / Information Technology / Electronics from a recognized Polytechnic.
2. **Step 2: DSE Lateral Entry (Direct 2nd Year B.Tech)**
   - In ${state}, Diploma holders with 45%+ marks (40% for reserved categories) are eligible for direct admission into the **2nd year of B.Tech / B.E. Computer Science**.
   - You skip the 1st year of engineering completely!
3. **Step 3: B.Tech 2nd to 4th Year**
   - Study 3 years in engineering college, build projects, and practice Data Structures & Algorithms.
4. **Step 4: Campus Placements & Internships**
   - Apply for software engineer roles in top IT and product companies.

💡 **Pro-Tip:** Focus on building hands-on coding skills in **Python, Java, or C++** during your Diploma so you have an edge over regular 12th-entry students!`;
  }

  if (q.includes('after 10th') || q.includes('10th nantar') || q.includes('10th ke baad')) {
    return `Hello ${name}! Here are the main educational paths after **10th Standard**:

### 1. 11th & 12th (Higher Secondary)
- **Science (PCM):** Best for Engineering (B.Tech), Architecture, Defense (NDA).
- **Science (PCB):** Best for MBBS (Doctor), Pharmacy, Nursing, Agriculture.
- **Commerce:** Best for CA, CS, B.Com, BBA, Banking & Finance.
- **Arts / Humanities:** Best for UPSC/MPSC Civil Services, Law (BA LLB), Journalism, Design.

### 2. Polytechnic Diploma (3 Years)
- Computer Engineering, Mechanical, Civil, Electrical.
- Direct entry into 2nd year B.Tech after completion (**DSE route**).

### 3. ITI & Vocational Courses (1-2 Years)
- Electrician, Fitter, Welder, COPA (Computer Operator) for fast employment.

🎯 **Recommendation for you:** Since your goal is **${goal}**, going for **12th Science (PCM)** or a **3-year Diploma in Computer Engineering** are the two best routes!`;
  }

  if (q.includes('bca') || q.includes('b.tech') || q.includes('btech')) {
    return `Great question, ${name}! Here is the direct comparison between **B.Tech CSE** and **BCA**:

| Feature | B.Tech Computer Science | BCA (Bachelor of Computer Applications) |
| :--- | :--- | :--- |
| **Duration** | 4 Years | 3 Years |
| **Eligibility** | 12th PCM + Entrance Exam (JEE/CET) | 12th (Any stream with Maths) |
| **Curriculum Depth** | Deep engineering, hardware, algorithms | Application development, web, databases |
| **Average Fees** | ₹1.5L - ₹8L total | ₹60K - ₹2L total |
| **Typical Starting Package** | ₹5 - 15 LPA | ₹3 - 7 LPA |
| **Higher Education** | M.Tech, MS, MBA | MCA (2 years), MBA, MS |

🎯 **Verdict:**
- If you have 12th PCM and want high placement packages and core engineering roles → **Choose B.Tech CSE**.
- If you want a more affordable, 3-year faster path into IT → **Choose BCA + MCA**.`;
  }

  if (q.includes('scholarship') || q.includes('mahadbt') || q.includes('nsp') || q.includes('money')) {
    return `Hello ${name}! Based on your profile (${edu} ${branch}, ${state}, Category: ${profile?.category || 'General'}):

Here are top scholarships you should check right away:
1. **Maharashtra EBC Scholarship (Rajarshi Shahu Maharaj Scheme):** 50% tuition fee waiver for family income under ₹8 Lakh/year.
2. **AICTE Pragati Scholarship:** ₹50,000/year for female students in technical degree/diploma courses.
3. **National Scholarship Portal (NSP Post-Matric):** Central scheme for merit-cum-means assistance.
4. **Mahatma Jyotiba Phule Scheme:** Full reimbursement for OBC/SC/ST students pursuing professional degrees.

👉 You can view your full matched eligibility list on our **Scholarships page**!`;
  }

  if (q.includes('skill') || q.includes('ai') || q.includes('machine learning') || q.includes('python')) {
    return `For becoming a **${goal}**, here is your recommended skill checklist:

1. **Foundational Programming:**
   - Python (Syntax, OOPs, standard libraries)
   - C++ or Java (for Data Structures & Algorithms)
2. **Core Mathematics:**
   - Linear Algebra (Vectors, Matrices)
   - Probability & Statistics
   - Calculus
3. **Data & AI Tools:**
   - NumPy, Pandas, Matplotlib
   - Scikit-Learn (Traditional ML)
   - PyTorch or TensorFlow (Deep Learning)
4. **Practical Projects:**
   - Build 2-3 end-to-end GitHub projects and participate in Kaggle competitions.

💡 Check out our **Free Resources** section to access top courses in English, Hindi, and Marathi!`;
  }

  // Default contextual response
  return `Hello ${name} 👋

I am your **CAREERMitra AI Assistant**, customized for your current background:
- **Education:** ${edu} (${branch})
- **Location:** ${state}
- **Target Career:** ${goal}
- **Interests:** ${profile?.interests?.join(', ') || 'Technology'}

Here is how I can assist you:
1. Provide step-by-step guidance on **roadmaps after 10th, 12th, or Diploma**.
2. Explain the **DSE (Direct Second Year)** lateral entry process.
3. Help you pick the best **free courses & scholarships** matching your state.
4. Answer specific doubts about exams like **JEE, CET, NEET, UPSC, and GATE**.

Feel free to ask any question like:
- *"Can I become a software engineer after diploma?"*
- *"Should I choose BCA or B.Tech?"*
- *"Which scholarships can I apply for in ${state}?"*`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, profile } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    try {
      const studentContext = `
You are CAREERMitra AI, a compassionate, highly knowledgeable educational and career guidance assistant dedicated to helping rural, Tier-2/3, and underserved students in India (especially Maharashtra and Bharat).
Your tone is friendly, inspiring, structured, clear, and easy to understand.
Always provide realistic timelines, state-specific entrance paths (like DSE lateral entry in Maharashtra), and mention free learning resources when relevant.

Current Student Context:
- Name: ${profile?.name || 'Student'}
- Education: ${profile?.education_level || '12th'}
- Branch: ${profile?.branch || 'Science'}
- Percentage: ${profile?.percentage || 80}%
- Location/State: ${profile?.location || 'Nashik'}, ${profile?.state || 'Maharashtra'}
- Family Income: ${profile?.family_income || '1-2.5 Lakh'}
- Category: ${profile?.category || 'General'}
- Career Goal: ${profile?.career_goal || 'Software Engineer'}
- Interests: ${profile?.interests?.join(', ') || 'Technology'}
- Skills: ${profile?.skills?.join(', ') || 'Python basics'}
`;

      const ollamaResponse = await fetch(
        `${process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434'}/api/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: process.env.OLLAMA_MODEL || 'qwen2.5:7b',
            stream: false,
            messages: [
              {
                role: 'system',
                content: `${studentContext}
Answer clearly and practically. Focus on Indian education, careers, scholarships, exams, and Maharashtra pathways.`,
              },
              { role: 'user', content: message },
            ],
          }),
        }
      );

      if (!ollamaResponse.ok) {
        throw new Error(`Ollama request failed: ${ollamaResponse.status}`);
      }

      const data = await ollamaResponse.json();
      const reply = data?.message?.content || generateMockResponse(message, profile);

      return NextResponse.json({ reply });
    } catch (aiErr) {
      console.warn('Ollama API failed, falling back to mock response engine', aiErr);
      const reply = generateMockResponse(message, profile);
      return NextResponse.json({ reply });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
