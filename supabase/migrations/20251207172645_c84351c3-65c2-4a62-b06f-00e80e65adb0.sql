-- Add social media columns to leadership_team table
ALTER TABLE public.leadership_team 
ADD COLUMN facebook_url TEXT,
ADD COLUMN linkedin_url TEXT,
ADD COLUMN twitter_url TEXT;