-- ==============================================================================
-- SAHICHAYAN.COM - Supabase Production Database Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  education_level TEXT DEFAULT 'Undergraduate', -- '10th', '12th', 'Undergraduate', 'Postgraduate', 'Working'
  stream TEXT DEFAULT 'Computer Science',       -- 'Science PCM', 'Science PCB', 'Commerce', 'Arts/Humanities'
  bio TEXT,
  target_year TEXT,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile automatically on auth.users sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. QUIZ ASSESSMENTS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  trait_scores JSONB NOT NULL,
  top_careers JSONB NOT NULL,
  dominant_trait TEXT,
  average_score NUMERIC(4,2),
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVED CAREERS / BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.saved_careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  career_id TEXT NOT NULL,
  career_name TEXT NOT NULL,
  category TEXT,
  match_score NUMERIC(5,2),
  status TEXT DEFAULT 'exploring', -- 'exploring', 'shortlisted', 'pursuing', 'target'
  notes TEXT,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, career_id)
);

-- 5. CAREER CATALOG TABLE (Pre-populated career catalog)
CREATE TABLE IF NOT EXISTS public.career_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  average_salary_inr TEXT,
  average_salary_usd TEXT,
  growth_rate TEXT,
  skills TEXT[] DEFAULT '{}',
  roadmap JSONB DEFAULT '[]',
  resources JSONB DEFAULT '[]',
  trait_weights JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RESOURCE HUB TABLE (Curated articles, videos, roadmaps)
CREATE TABLE IF NOT EXISTS public.resource_hub (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('video', 'roadmap', 'course', 'guide')),
  url TEXT NOT NULL,
  embed_id TEXT, -- e.g., YouTube video ID
  description TEXT,
  duration TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AI CONVERSATIONS & CHAT HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_context TEXT DEFAULT 'general',
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_hub ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile; public can view basic details
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Quiz Assessments: Users can only see and manage their own assessments
CREATE POLICY "Users can view their own assessments" ON public.quiz_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" ON public.quiz_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Saved Careers: Users can only see and manage their saved careers
CREATE POLICY "Users can view own saved careers" ON public.saved_careers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved careers" ON public.saved_careers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved careers" ON public.saved_careers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved careers" ON public.saved_careers
  FOR DELETE USING (auth.uid() = user_id);

-- Career Catalog & Resources: Public Read-Only
CREATE POLICY "Career catalog is readable by everyone" ON public.career_catalog
  FOR SELECT USING (true);

CREATE POLICY "Resource hub is readable by everyone" ON public.resource_hub
  FOR SELECT USING (true);

-- AI Conversations: Users can see and update their own chats
CREATE POLICY "Users can view their own AI conversations" ON public.ai_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI conversations" ON public.ai_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI conversations" ON public.ai_conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_quiz_user ON public.quiz_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_careers_user ON public.saved_careers(user_id);
CREATE INDEX IF NOT EXISTS idx_career_catalog_cat ON public.career_catalog(category);
CREATE INDEX IF NOT EXISTS idx_resource_hub_type ON public.resource_hub(type);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON public.ai_conversations(user_id);
