-- ============================================
-- CORE TABLES (Schools & Users)
-- ============================================

-- Schools table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  address TEXT,
  region TEXT,
  district TEXT,
  motto TEXT,
  established_year INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  primary_color TEXT DEFAULT '#DC143C',
  secondary_color TEXT DEFAULT '#FFD700',
  student_count INTEGER DEFAULT 0,
  teacher_count INTEGER DEFAULT 0,
  gender_type TEXT CHECK (gender_type IN ('mixed', 'male', 'female')),
  residency_type TEXT CHECK (residency_type IN ('day', 'boarding', 'day/boarding')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('superadmin', 'admin', 'teacher', 'student', 'parent')),
  full_name TEXT NOT NULL,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  profile_image TEXT,
  phone_number TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_school_assignment CHECK (
    (role = 'superadmin' AND school_id IS NULL) OR
    (role != 'superadmin' AND school_id IS NOT NULL)
  )
);

-- ============================================
-- ACADEMIC STRUCTURE
-- ============================================

-- Academic terms
CREATE TABLE academic_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, name)
);

-- Classes
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  academic_term_id UUID REFERENCES academic_terms(id),
  form_teacher_id UUID REFERENCES public.users(id),
  student_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, name, academic_term_id)
);

-- Subjects
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  description TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, code)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Check if user is SuperAdmin
CREATE OR REPLACE FUNCTION is_superadmin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'superadmin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get user's school_id
CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID AS $$
DECLARE
  school_id_var UUID;
BEGIN
  SELECT school_id INTO school_id_var
  FROM public.users
  WHERE id = auth.uid();
  RETURN school_id_var;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RLS POLICIES
-- ============================================

-- SCHOOLS TABLE
CREATE POLICY "SuperAdmin full access" ON schools
  FOR ALL USING (is_superadmin());

CREATE POLICY "Users view own school" ON schools
  FOR SELECT USING (id = get_user_school_id());

-- USERS TABLE
CREATE POLICY "SuperAdmin manages all users" ON public.users
  FOR ALL USING (is_superadmin());

CREATE POLICY "Users view school members" ON public.users
  FOR SELECT USING (
    auth.uid() = id OR 
    school_id = get_user_school_id()
  );

CREATE POLICY "Users update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ACADEMIC TERMS
CREATE POLICY "SuperAdmin full access" ON academic_terms
  FOR ALL USING (is_superadmin());

CREATE POLICY "School members access" ON academic_terms
  FOR ALL USING (school_id = get_user_school_id());

-- CLASSES
CREATE POLICY "SuperAdmin full access" ON classes
  FOR ALL USING (is_superadmin());

CREATE POLICY "School members access" ON classes
  FOR ALL USING (school_id = get_user_school_id());

-- SUBJECTS
CREATE POLICY "SuperAdmin full access" ON subjects
  FOR ALL USING (is_superadmin());

CREATE POLICY "School members access" ON subjects
  FOR ALL USING (school_id = get_user_school_id());

-- ============================================
-- TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schools_updated_at
  BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_users_school_id ON public.users(school_id);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_schools_slug ON schools(slug);
CREATE INDEX idx_classes_school_id ON classes(school_id);
CREATE INDEX idx_subjects_school_id ON subjects(school_id);