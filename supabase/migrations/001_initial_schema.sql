-- ============================================================
-- CAREERMitra Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  state TEXT DEFAULT 'Maharashtra',
  gender TEXT,
  education_level TEXT,
  school_college TEXT,
  branch TEXT,
  percentage NUMERIC,
  family_income TEXT,
  category TEXT,
  rural_urban TEXT DEFAULT 'rural',
  interests JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  career_goal TEXT,
  career_goal_id TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Careers Catalog
CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  branch JSONB DEFAULT '[]'::jsonb,
  icon TEXT,
  avg_salary TEXT,
  growth TEXT,
  difficulty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Roadmaps & Steps
CREATE TABLE IF NOT EXISTS roadmaps (
  id TEXT PRIMARY KEY,
  career_id TEXT REFERENCES careers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Educational Resources & Courses
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'youtube' | 'notes' | 'course' | 'website' | 'playlist'
  subject TEXT,
  branch JSONB DEFAULT '[]'::jsonb,
  careers JSONB DEFAULT '[]'::jsonb,
  level TEXT DEFAULT 'beginner',
  language TEXT DEFAULT 'English',
  free BOOLEAN DEFAULT true,
  url TEXT NOT NULL,
  provider TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Scholarships
CREATE TABLE IF NOT EXISTS scholarships (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  description TEXT NOT NULL,
  amount TEXT,
  eligibility JSONB DEFAULT '[]'::jsonb,
  deadline DATE,
  application_url TEXT NOT NULL,
  states JSONB DEFAULT '[]'::jsonb,
  education_levels JSONB DEFAULT '[]'::jsonb,
  branches JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Student Opportunities & Hackathons
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'hackathon' | 'internship' | 'competition' | 'project' | 'workshop'
  description TEXT NOT NULL,
  organizer TEXT NOT NULL,
  deadline DATE,
  url TEXT NOT NULL,
  branches JSONB DEFAULT '[]'::jsonb,
  careers JSONB DEFAULT '[]'::jsonb,
  level TEXT DEFAULT 'intermediate',
  location TEXT DEFAULT 'Online',
  stipend TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Resumes
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Allow public read for catalog tables
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public careers read" ON careers FOR SELECT USING (true);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public roadmaps read" ON roadmaps FOR SELECT USING (true);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public resources read" ON resources FOR SELECT USING (true);

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public scholarships read" ON scholarships FOR SELECT USING (true);

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public opportunities read" ON opportunities FOR SELECT USING (true);
