
-- First, let's drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can create their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can update their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON public.favorites;

DROP POLICY IF EXISTS "Users can view their own routines" ON public.skincare_routines;
DROP POLICY IF EXISTS "Users can create their own routines" ON public.skincare_routines;
DROP POLICY IF EXISTS "Users can update their own routines" ON public.skincare_routines;
DROP POLICY IF EXISTS "Users can delete their own routines" ON public.skincare_routines;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Users can insert their own quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Users can update their own quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Users can delete their own quiz responses" ON public.quiz_responses;

DROP POLICY IF EXISTS "Authenticated users can view products" ON public.products;

-- Ensure user_id columns are NOT NULL for proper RLS security
ALTER TABLE public.favorites ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.skincare_routines ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.quiz_responses ALTER COLUMN user_id SET NOT NULL;

-- Create explicit, secure RLS policies for favorites table
CREATE POLICY "favorites_select_policy" ON public.favorites
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "favorites_insert_policy" ON public.favorites
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "favorites_update_policy" ON public.favorites
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "favorites_delete_policy" ON public.favorites
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Create explicit, secure RLS policies for skincare_routines table
CREATE POLICY "routines_select_policy" ON public.skincare_routines
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- CREATE POLICY "routines_insert_policy" ON public.skincare_routines
--   FOR INSERT 
--   TO authenticated
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "routines_update_policy" ON public.skincare_routines
--   FOR UPDATE 
--   TO authenticated
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "routines_delete_policy" ON public.skincare_routines
--   FOR DELETE 
--   TO authenticated
--   USING (auth.uid() = user_id);

-- Create explicit, secure RLS policies for profiles table
CREATE POLICY "profiles_select_policy" ON public.profiles
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_policy" ON public.profiles
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON public.profiles
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_delete_policy" ON public.profiles
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = id);

-- Create explicit, secure RLS policies for quiz_responses table
CREATE POLICY "quiz_responses_select_policy" ON public.quiz_responses
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "quiz_responses_insert_policy" ON public.quiz_responses
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "quiz_responses_update_policy" ON public.quiz_responses
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "quiz_responses_delete_policy" ON public.quiz_responses
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Create secure RLS policy for products table (catalog/reference table)
CREATE POLICY "products_select_policy" ON public.products
  FOR SELECT 
  TO authenticated
  USING (true);

-- Ensure RLS is enabled on all tables
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skincare_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
