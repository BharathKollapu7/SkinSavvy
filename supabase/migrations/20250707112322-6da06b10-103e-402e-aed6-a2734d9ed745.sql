
-- Add OTP verification fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN otp_code VARCHAR(6),
ADD COLUMN otp_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN otp_attempts INTEGER DEFAULT 0;

-- Create index for faster OTP lookups
CREATE INDEX idx_profiles_otp_code ON public.profiles(otp_code) WHERE otp_code IS NOT NULL;

-- Update the handle_new_user function to support Google OAuth data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    mobile_number, 
    skin_type,
    avatar_url,
    email_verified
  )
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name', 
      NEW.raw_user_meta_data->>'name',
      ''
    ),
    NEW.raw_user_meta_data->>'mobile_number',
    NEW.raw_user_meta_data->>'skin_type',
    NEW.raw_user_meta_data->>'avatar_url',
    CASE 
      WHEN NEW.raw_user_meta_data->>'provider' = 'google' THEN TRUE
      ELSE FALSE
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    mobile_number = COALESCE(EXCLUDED.mobile_number, profiles.mobile_number),
    skin_type = COALESCE(EXCLUDED.skin_type, profiles.skin_type),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    email_verified = CASE 
      WHEN NEW.raw_user_meta_data->>'provider' = 'google' THEN TRUE
      ELSE profiles.email_verified
    END,
    updated_at = now();
  RETURN NEW;
END;
$$;
