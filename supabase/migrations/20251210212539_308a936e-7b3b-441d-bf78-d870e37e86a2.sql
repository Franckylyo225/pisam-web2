-- Add overlay opacity column to hero_slides table
ALTER TABLE public.hero_slides 
ADD COLUMN overlay_opacity numeric DEFAULT 0.6 CHECK (overlay_opacity >= 0 AND overlay_opacity <= 1);