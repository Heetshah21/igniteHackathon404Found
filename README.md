# 🧭 CAREERMitra — Personalized Career & Education Navigation for Bharat

> **Hackathon MVP**: Built to empower rural, tier-2/3, and underserved students in India to discover their educational pathways, eligible scholarships, free multilingual courses, ATS resumes, and AI career guidance.

---

## 🌟 Core Features

1. **Personalized Dashboard & Next Steps Engine**
   - Welcomes students with custom stats, active goals, and a priority checklist (**"YOUR NEXT STEPS"**).
2. **Multi-Pathway Career Roadmaps**
   - 13+ careers (Software Engineer, AI/ML, Doctor, CA, Civil Engineer, etc.) with 2–3 pathways each (e.g. 10th → 12th PCM → B.Tech vs. 10th → Diploma → DSE Direct 2nd Year vs. BCA → MCA).
3. **Personalized Scholarship Finder**
   - Deterministic rule engine evaluating Education Level, State (e.g. Maharashtra, Karnataka), Percentage, Family Income, and Category with transparent **"Why you may qualify"** checkmarks.
4. **100% Free Multilingual Resource Hub**
   - Curated courses, playlists, and notes across branches in **English, Hindi (हिंदी), and Marathi (मराठी)**.
5. **Stream & Career Head-to-Head Comparison**
   - Side-by-side metric tables (AI/ML vs Data Science, B.Tech vs BCA, etc.) + interactive **"Which is better for you?"** fit quiz.
6. **Single-Page ATS Resume Builder**
   - Clean, ATS-compliant resume builder pre-filled from student profile with live preview and instant print/PDF export.
7. **Student Opportunities & Hackathons**
   - Smart India Hackathon, GSoC, fellowships, competitions, and internships with deadline and stipend indicators.
8. **CAREERMitra AI Assistant**
   - Context-aware chatbot customized with student demographics and intelligent guidance for Indian entrance exams & DSE lateral entry.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Database & Auth**: Supabase PostgreSQL + Auth (with instant local demo fallback)
- **AI**: Google Gemini API route with mock fallback

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Type Check
```bash
npm run build
```

---

## 🧭 Judge Demo Walkthrough

1. Open `http://localhost:3000` → Click **"Launch Hackathon Demo (Rahul Sharma)"**.
2. Explore the **Personalized Dashboard** (`/dashboard`).
3. Switch between pathways on **Career Roadmaps** (`/roadmap`).
4. Inspect the match breakdown on **Scholarships** (`/scholarships`).
5. Filter by Hindi/Marathi on **Courses & Resources** (`/resources`).
6. Take the fit quiz on **Compare Streams** (`/compare`).
7. Print an ATS resume on **Resume Builder** (`/resume`).
8. Ask questions like *"Can I become a software engineer after diploma?"* in the **AI Assistant** (`/chat`).
