-- VSL FUNNEL BUILDER - DATABASE SCHEMA
-- Project: vsl-funnel-system-builder
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- FUNNELS TABLE
-- Stores all funnel configurations
-- ===========================================
CREATE TABLE funnels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  funnel_type TEXT NOT NULL CHECK (funnel_type IN ('first-time-buyer', 'builder', 'luxury', 'fix-flip', 'referral')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  -- Branding (JSONB for flexibility)
  colors JSONB DEFAULT '{"primary": "#000000", "secondary": "#FFFFFF", "accent1": "#D4AF37", "accent2": "#3B82F6", "neutral": "#F8F9FA", "text": "#6B7280"}'::jsonb,
  fonts JSONB DEFAULT '{"heading": "Inter", "body": "Inter"}'::jsonb,
  
  -- Analytics (JSONB to store multiple tracking IDs)
  analytics_ids JSONB DEFAULT '{}'::jsonb,
  
  -- Settings (JSONB for flexibility)
  settings JSONB DEFAULT '{}'::jsonb
);

-- Create index on slug for fast lookups
CREATE INDEX funnels_slug_idx ON funnels(slug);
CREATE INDEX funnels_status_idx ON funnels(status);

-- ===========================================
-- PAGES TABLE
-- Stores individual pages within funnels
-- ===========================================
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  funnel_id UUID REFERENCES funnels(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Page Information
  page_type TEXT NOT NULL CHECK (page_type IN ('landing', 'vsl', 'confirmation', 'thank-you')),
  order_index INTEGER NOT NULL DEFAULT 0,
  
  -- Content (JSONB for flexibility)
  content JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX pages_funnel_id_idx ON pages(funnel_id);
CREATE INDEX pages_order_idx ON pages(order_index);

-- ===========================================
-- LEADS TABLE
-- Stores all captured leads
-- ===========================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Lead Information
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  
  -- Source Tracking
  funnel_id UUID REFERENCES funnels(id),
  page_id UUID REFERENCES pages(id),
  
  -- UTM Attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  
  -- Status Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'unqualified')),
  
  -- Additional Data (JSONB for flexibility)
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for performance
CREATE INDEX leads_funnel_id_idx ON leads(funnel_id);
CREATE INDEX leads_email_idx ON leads(email);
CREATE INDEX leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX leads_status_idx ON leads(status);

-- ===========================================
-- EVENTS TABLE
-- Stores custom tracking events
-- ===========================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Event Information
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'form_submit', 'video_view', 'course_click')),
  
  -- Relations
  funnel_id UUID REFERENCES funnels(id),
  page_id UUID REFERENCES pages(id),
  lead_id UUID REFERENCES leads(id), -- Nullable for anonymous events
  
  -- Event Data (JSONB for flexibility)
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for analytics queries
CREATE INDEX events_funnel_id_idx ON events(funnel_id);
CREATE INDEX events_created_at_idx ON events(created_at DESC);
CREATE INDEX events_event_type_idx ON events(event_type);

-- ===========================================
-- UPDATED_AT TRIGGER
-- Automatically update updated_at timestamp
-- ===========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to funnels table
CREATE TRIGGER update_funnels_updated_at
  BEFORE UPDATE ON funnels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to pages table
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- INSERT SAMPLE FUNNEL
-- First-Time Home Buyers funnel
-- ===========================================
INSERT INTO funnels (name, slug, funnel_type, status, settings) VALUES (
  'First-Time Home Buyers',
  'first-time-buyers',
  'first-time-buyer',
  'published',
  '{
    "video_url": "https://www.loom.com/embed/YOUR_VIDEO_ID_HERE",
    "course_url": "https://course.kerryleehartly.com/first-time-buyers",
    "headline": "Buying Your First Home Doesn''t Have To Be Confusing",
    "subheadline": "Get the clarity and confidence you need with our free comprehensive guide."
  }'::jsonb
);

-- ===========================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ===========================================
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read access to published funnels
CREATE POLICY "Public can read published funnels" ON funnels
  FOR SELECT USING (status = 'published');

-- Public read access to pages of published funnels
CREATE POLICY "Public can read pages of published funnels" ON pages
  FOR SELECT USING (
    funnel_id IN (SELECT id FROM funnels WHERE status = 'published')
  );

-- Public can insert leads
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Public can insert events
CREATE POLICY "Public can insert events" ON events
  FOR INSERT WITH CHECK (true);

-- ===========================================
-- COMPLETED!
-- ===========================================
-- Your database is now ready for the VSL Funnel Builder!
-- Next steps:
-- 1. Copy your Supabase URL and ANON key
-- 2. Add them to your .env file
-- 3. Test the funnel!
