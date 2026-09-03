-- ============================================================
-- CAREERMitra SQL Seed Data
-- Reproducible SQL file for seeding catalog tables
-- ============================================================

-- Careers catalog
INSERT INTO careers (id, title, slug, description, branch, icon, avg_salary, growth, difficulty) VALUES
('software-engineer', 'Software Engineer', 'software-engineer', 'Design, develop, and maintain software applications and systems.', '["science", "computer", "engineering"]'::jsonb, '💻', '₹6-25 LPA', 'Very High', 'Medium-High'),
('ai-ml-engineer', 'AI/ML Engineer', 'ai-ml-engineer', 'Build intelligent systems using artificial intelligence and machine learning.', '["science", "computer", "engineering"]'::jsonb, '🤖', '₹8-35 LPA', 'Very High', 'High'),
('data-scientist', 'Data Scientist', 'data-scientist', 'Analyze complex data sets to find patterns and insights.', '["science", "computer", "engineering", "commerce"]'::jsonb, '📊', '₹7-30 LPA', 'Very High', 'High'),
('doctor', 'Doctor (MBBS)', 'doctor', 'Diagnose and treat patients, conduct medical research.', '["science", "medical"]'::jsonb, '🩺', '₹8-25 LPA', 'High', 'Very High'),
('chartered-accountant', 'Chartered Accountant', 'chartered-accountant', 'Manage financial accounting, auditing, taxation, and financial reporting.', '["commerce"]'::jsonb, '💼', '₹7-20 LPA', 'High', 'High'),
('civil-engineer', 'Civil Engineer', 'civil-engineer', 'Design and supervise construction of infrastructure.', '["science", "engineering"]'::jsonb, '🏗️', '₹4-12 LPA', 'Medium-High', 'Medium-High'),
('mechanical-engineer', 'Mechanical Engineer', 'mechanical-engineer', 'Design and manufacture mechanical systems and machinery.', '["science", "engineering"]'::jsonb, '⚙️', '₹4-14 LPA', 'Medium', 'Medium-High'),
('electrical-engineer', 'Electrical Engineer', 'electrical-engineer', 'Design and develop electrical systems, power grids, and electronics.', '["science", "engineering"]'::jsonb, '⚡', '₹4-15 LPA', 'High', 'High'),
('digital-marketer', 'Digital Marketer', 'digital-marketer', 'Promote products and services through digital channels.', '["commerce", "arts", "any"]'::jsonb, '🎯', '₹3.5-12 LPA', 'Very High', 'Medium'),
('entrepreneur', 'Entrepreneur / Business Owner', 'entrepreneur', 'Start and build your own business or venture.', '["any"]'::jsonb, '🚀', 'Variable', 'High Risk / High Reward', 'Very High')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  avg_salary = EXCLUDED.avg_salary,
  growth = EXCLUDED.growth,
  difficulty = EXCLUDED.difficulty;
