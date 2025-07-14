
-- Fix missing UPDATE policy for favorites table
CREATE POLICY "Users can update their own favorites" ON public.favorites
  FOR UPDATE USING (auth.uid() = user_id);

-- Add missing DELETE policy for skincare_routines table  
CREATE POLICY "Users can delete their own routines" ON public.skincare_routines
  FOR DELETE USING (auth.uid() = user_id);

-- Add missing DELETE policy for quiz_responses table
CREATE POLICY "Users can delete their own quiz responses" ON public.quiz_responses
  FOR DELETE USING (auth.uid() = user_id);

-- Add RLS policies for products table (currently has no policies)
-- Since products appear to be a reference/catalog table, make it readable by all authenticated users
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view products" ON public.products
  FOR SELECT TO authenticated USING (true);

-- Ensure user_id columns are NOT NULL where they should be for proper RLS
-- This prevents potential security issues with NULL user_id values

-- Check and fix nullable user_id in favorites (should not be nullable for RLS)
ALTER TABLE public.favorites ALTER COLUMN user_id SET NOT NULL;

-- Check and fix nullable user_id in skincare_routines (should not be nullable for RLS)  
ALTER TABLE public.skincare_routines ALTER COLUMN user_id SET NOT NULL;

-- Fix nullable user_id in quiz_responses (should not be nullable for proper RLS)
ALTER TABLE public.quiz_responses ALTER COLUMN user_id SET NOT NULL;

-- Update handle_new_user function to be more robust and handle edge cases
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url, full_name, mobile_number, skin_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'mobile_number', 
    NEW.raw_user_meta_data->>'skin_type'
  )
  ON CONFLICT (id) DO UPDATE SET
    name = COALESCE(EXCLUDED.name, profiles.name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    mobile_number = COALESCE(EXCLUDED.mobile_number, profiles.mobile_number),
    skin_type = COALESCE(EXCLUDED.skin_type, profiles.skin_type),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public;

-- Create trigger for handle_new_user if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
