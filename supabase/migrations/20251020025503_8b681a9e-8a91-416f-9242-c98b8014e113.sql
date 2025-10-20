-- Fix security warnings by setting search_path on functions

-- Check if user is SuperAdmin (with security definer and search_path)
CREATE OR REPLACE FUNCTION is_superadmin()
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'superadmin'
  );
END;
$$;

-- Get user's school_id (with security definer and search_path)
CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  school_id_var UUID;
BEGIN
  SELECT school_id INTO school_id_var
  FROM public.users
  WHERE id = auth.uid();
  RETURN school_id_var;
END;
$$;

-- Update updated_at timestamp (with search_path)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;