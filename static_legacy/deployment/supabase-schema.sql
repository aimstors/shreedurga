-- ══════════════════════════════════════════════════════════════
-- Shree Durga Interior · Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ══════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENQUIRIES table ──
CREATE TABLE IF NOT EXISTS enquiries (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  city          TEXT,
  services      TEXT[] DEFAULT '{}',
  project_type  TEXT,
  budget        TEXT,
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'contacted', 'in_progress', 'closed', 'spam')),
  notes         TEXT,
  source        TEXT DEFAULT 'website',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ
);

-- Index for status filtering (admin dashboard)
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON enquiries(phone);

-- ── NEWSLETTER table ──
CREATE TABLE IF NOT EXISTS newsletter (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           TEXT UNIQUE NOT NULL,
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  active          BOOLEAN DEFAULT true
);

-- ── PROJECTS table ──
CREATE TABLE IF NOT EXISTS projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  category        TEXT NOT NULL,  -- kitchen, living, bedroom, office, ceiling, full
  location        TEXT,
  budget_display  TEXT,           -- e.g. "₹4.5 Lakhs"
  duration        TEXT,           -- e.g. "3 weeks"
  year            INTEGER,
  description     TEXT,
  image_url       TEXT,
  image_urls      TEXT[] DEFAULT '{}',
  featured        BOOLEAN DEFAULT false,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- ── Row Level Security ──
-- Allow anonymous INSERT for enquiries (public form submission)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous enquiry insert"
  ON enquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role full access (backend uses service key)
CREATE POLICY "Service role full access enquiries"
  ON enquiries FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Newsletter: allow public insert
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow newsletter subscribe"
  ON newsletter FOR INSERT
  TO anon
  WITH CHECK (true);
CREATE POLICY "Service role full access newsletter"
  ON newsletter FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Projects: allow public read
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read projects"
  ON projects FOR SELECT
  TO anon
  USING (true);
CREATE POLICY "Service role full access projects"
  ON projects FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- ── SEED sample data ──
INSERT INTO projects (title, category, location, budget_display, duration, year, featured, sort_order) VALUES
  ('Modern Modular Kitchen', 'kitchen', 'Duliajan, Assam', '₹4.5 Lakhs', '3 weeks', 2024, true, 1),
  ('Luxury Living Room', 'living', 'Dibrugarh, Assam', '₹3.2 Lakhs', '2 weeks', 2024, true, 2),
  ('Corporate Office Renovation', 'office', 'Guwahati, Assam', '₹8.5 Lakhs', '5 weeks', 2024, true, 3),
  ('Master Bedroom Suite', 'bedroom', 'Jorhat, Assam', '₹2.1 Lakhs', '2 weeks', 2024, false, 4),
  ('POP False Ceiling Design', 'ceiling', 'Tinsukia, Assam', '₹1.8 Lakhs', '10 days', 2023, false, 5),
  ('Full Home Renovation', 'full', 'Assam', '₹18 Lakhs', '8 weeks', 2023, true, 6);

-- ══════════════════════════════════════════════════════════════
-- SETUP COMPLETE
-- After running: go to Supabase Dashboard → API → copy your keys
-- ══════════════════════════════════════════════════════════════
