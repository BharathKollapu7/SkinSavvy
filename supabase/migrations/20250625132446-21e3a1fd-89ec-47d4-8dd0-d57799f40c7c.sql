
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

-- Create the policies needed for profile management
CREATE POLICY "Users can insert their own profile during signup" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- CREATE POLICY "Users can delete their own profile" 
--   ON public.profiles 
--   FOR DELETE 
--   USING (auth.uid() = id);
