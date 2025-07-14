
-- Create favorites table for storing user's favorite products
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  brand TEXT,
  price TEXT NOT NULL,
  notable_effects TEXT,
  product_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skincare routines table
CREATE TABLE public.skincare_routines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  routine_type TEXT NOT NULL CHECK (routine_type IN ('morning', 'evening')),
  products TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update existing profiles table to include full_name and mobile_number if they don't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS mobile_number TEXT;

-- Enable Row Level Security on new tables
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skincare_routines ENABLE ROW LEVEL SECURITY;

-- RLS Policies for favorites
CREATE POLICY "Users can view their own favorites" 
  ON public.favorites 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites" 
  ON public.favorites 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
  ON public.favorites 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for skincare routines
CREATE POLICY "Users can view their own routines" 
  ON public.skincare_routines 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own routines" 
  ON public.skincare_routines 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routines" 
  ON public.skincare_routines 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create trigger function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER routines_updated_at
  BEFORE UPDATE ON public.skincare_routines
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
