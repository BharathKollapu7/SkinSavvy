
-- Add AI analysis support to the skin type quiz
-- This will store detailed quiz responses and AI analysis results

-- Create a table to store detailed quiz responses
CREATE TABLE IF NOT EXISTS public.quiz_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_type text NOT NULL DEFAULT 'skin_type',
  responses jsonb NOT NULL, -- Store all question-answer pairs
  ai_analysis jsonb, -- Store AI analysis results
  determined_skin_type text,
  confidence_score float,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create trigger for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.quiz_responses
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Add RLS policies
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own quiz responses" ON public.quiz_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own quiz responses" ON public.quiz_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz responses" ON public.quiz_responses
  FOR UPDATE USING (auth.uid() = user_id);

-- Update profiles table to include more detailed skin analysis
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS skin_analysis jsonb,
ADD COLUMN IF NOT EXISTS routine_recommendations text[],
ADD COLUMN IF NOT EXISTS key_ingredients text[];
