
-- Update the skin concerns in the database to match the new list
-- First, let's add a new table to store the detailed routine information
CREATE TABLE public.routine_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  concern_name TEXT NOT NULL UNIQUE,
  skincare_steps JSONB NOT NULL,
  food_recommendations TEXT[],
  home_remedies TEXT[],
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on the routine templates table
ALTER TABLE public.routine_templates ENABLE ROW LEVEL SECURITY;

-- Create policy for reading routine templates (public read access)
CREATE POLICY "routine_templates_select_policy" 
  ON public.routine_templates 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Insert the routine data for each concern
INSERT INTO public.routine_templates (concern_name, skincare_steps, food_recommendations, home_remedies, icon) VALUES
('tan', 
 '["Face wash: Use a gentle one with glycolic acid to remove dead skin", "Scrub: Use a soft scrub with lactic acid 2 times a week", "Brightening Serum: Use vitamin C serum in the morning", "Moisturizer: Use a light one with hyaluronic acid to keep skin soft", "Sunscreen: Use SPF 50 every day, even if you are indoors"]'::jsonb,
 ARRAY['Oranges, berries, spinach – these fight skin damage'],
 ARRAY['Aloe vera gel or a turmeric + yogurt face pack once a week'],
 '🌞'),

('acne', 
 '["Face wash: Use one with salicylic acid to clean pores", "Spot treatment: Use benzoyl peroxide or retinoid cream on pimples", "Moisturizer: Use oil-free or non-comedogenic types", "Sunscreen: Choose oil-free sunscreen to avoid more breakouts"]'::jsonb,
 ARRAY['Fish, flaxseeds (omega-3s), and avoid junk food and too much milk'],
 ARRAY['Dab tea tree oil or green tea water on pimples'],
 '🧴'),

('sensitivity', 
 '["Face wash: Use fragrance-free, very gentle cleanser", "Moisturizer: Look for ones with ceramides – they heal your skin barrier", "Sunscreen: Use mineral sunscreens with zinc or titanium (gentler on skin)"]'::jsonb,
 ARRAY['Ginger, turmeric, and fatty fish – all calm the skin'],
 ARRAY['Oatmeal paste or chamomile tea compresses help calm redness'],
 '🌿'),

('dark_spots', 
 '["Face wash: Gentle, non-irritating type", "Serum: Use one with niacinamide, vitamin C, or alpha arbutin", "Scrub: Try mild chemical exfoliants like glycolic acid once a week", "Sunscreen: Never skip SPF 50 – sun makes spots worse"]'::jsonb,
 ARRAY['Citrus fruits, almonds – they help skin repair'],
 ARRAY['Apply licorice extract or aloe vera gel at night'],
 '🌑'),

('redness', 
 '["Face wash: Use very soft, non-foaming cleanser", "Moisturizer: Use fragrance-free, calming lotion", "Sunscreen: Go for gentle mineral-based sunscreens"]'::jsonb,
 ARRAY['Leafy greens, berries – avoid spicy food and alcohol'],
 ARRAY['Green tea compresses or cool cucumber slices'],
 '🔴'),

('dryness', 
 '["Face wash: Pick a hydrating, soap-free cleanser", "Moisturizer: Use thick creams with hyaluronic acid or ceramides", "Sunscreen: Use one that also moisturizes your skin"]'::jsonb,
 ARRAY['Drink lots of water, eat salmon, chia seeds'],
 ARRAY['Dab on coconut oil or try a honey mask'],
 '💧'),

('aging', 
 '["Face wash: Use gentle cleansers that don not dry the skin", "Serum: Use retinol or peptides at night", "Moisturizer: Pick ones with vitamin C or E to boost glow", "Sunscreen: Daily SPF 50 is a must to prevent early aging"]'::jsonb,
 ARRAY['Berries, green tea, nuts – all fight aging from inside'],
 ARRAY['Use rosehip oil or aloe vera gel to keep skin firm'],
 '⏳'),

('pores', 
 '["Face wash: Use salicylic acid to clean deep into pores", "Scrub: Use glycolic acid twice a week to remove dead skin", "Treatment: Retinoids help make pores look smaller", "Sunscreen: Use a non-clogging type"]'::jsonb,
 ARRAY['Carrots, spinach, pumpkin – rich in vitamin A and zinc'],
 ARRAY['Clay masks or rub an ice cube over your face before makeup'],
 '⚪'),

('hyperpigmentation', 
 '["Face wash: Mild, suitable for all skin types", "Serum: Use vitamin C, kojic acid, or azelaic acid", "Scrub: Use mild acids to renew skin", "Sunscreen: SPF 50 daily is non-negotiable"]'::jsonb,
 ARRAY['Dark leafy greens, berries – help skin heal faster'],
 ARRAY['Licorice extract and aloe vera can fade spots over time'],
 '🌫'),

('blackheads_whiteheads', 
 '["Face wash: Use salicylic acid to clean oily areas", "Exfoliate: Gently exfoliate with glycolic acid or BHA", "Treatment: Retinoids keep pores clear", "Sunscreen: Use one that doesn not clog pores"]'::jsonb,
 ARRAY['Cut down dairy & sugar. Eat walnuts, chia seeds for clearer skin'],
 ARRAY['Clay masks weekly or steam your face before cleansing'],
 '⚫');

-- Create a trigger to update the updated_at timestamp
CREATE TRIGGER routine_templates_updated_at
  BEFORE UPDATE ON public.routine_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create a table for combo routines
CREATE TABLE public.combo_routines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  concerns TEXT[] NOT NULL,
  morning_suggestion TEXT NOT NULL,
  night_suggestion TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on combo routines
ALTER TABLE public.combo_routines ENABLE ROW LEVEL SECURITY;

-- Create policy for reading combo routines (public read access)
CREATE POLICY "combo_routines_select_policy" 
  ON public.combo_routines 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Insert combo routine data
INSERT INTO public.combo_routines (concerns, morning_suggestion, night_suggestion) VALUES
(ARRAY['acne', 'dark_spots'], 'Salicylic cleanser + Vitamin C + SPF', 'Retinoid + Niacinamide + Moisturizer'),
(ARRAY['dryness', 'aging'], 'Hydrating cleanser + Hyaluronic acid + SPF', 'Peptide serum + Ceramide moisturizer'),
(ARRAY['sensitivity', 'redness'], 'Gentle cleanser + Niacinamide + Mineral SPF', 'Oat moisturizer + Chamomile serum'),
(ARRAY['tan', 'hyperpigmentation'], 'Glycolic acid face wash + Vitamin C + SPF', 'Azelaic acid or Kojic serum + Aloe moisturizer');
