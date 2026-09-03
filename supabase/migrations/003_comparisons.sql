-- ============================================================
-- CAREERMitra Comparisons Catalog Table
-- ============================================================

CREATE TABLE IF NOT EXISTS comparisons (
  id TEXT PRIMARY KEY,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  categories JSONB DEFAULT '[]'::jsonb,
  quiz JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;

-- Allow public read for catalog
DROP POLICY IF EXISTS "Public comparisons read" ON comparisons;
CREATE POLICY "Public comparisons read" ON comparisons FOR SELECT USING (true);
