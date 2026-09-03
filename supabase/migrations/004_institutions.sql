-- ============================================================
-- 004_institutions.sql
-- Table for educational institutions (Junior colleges, polytechnics, universities, engineering colleges)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.institutions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Maharashtra',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  annual_fee INTEGER,
  course TEXT NOT NULL,
  stream TEXT NOT NULL,
  min_qualification TEXT,
  girls_only BOOLEAN DEFAULT false,
  hostel_available BOOLEAN DEFAULT false,
  government BOOLEAN DEFAULT false,
  scholarship_available BOOLEAN DEFAULT true,
  description TEXT,
  website_url TEXT,
  rating NUMERIC(2,1) DEFAULT 4.5,
  admission_process TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common search queries
CREATE INDEX IF NOT EXISTS idx_institutions_city ON public.institutions (city);
CREATE INDEX IF NOT EXISTS idx_institutions_stream ON public.institutions (stream);
CREATE INDEX IF NOT EXISTS idx_institutions_government ON public.institutions (government);
CREATE INDEX IF NOT EXISTS idx_institutions_girls_only ON public.institutions (girls_only);

-- Enable RLS
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to institutions
CREATE POLICY "Allow public read on institutions"
  ON public.institutions
  FOR SELECT
  USING (true);
