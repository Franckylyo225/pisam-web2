-- Create table for hero slides
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  primary_button_text TEXT,
  primary_button_link TEXT,
  secondary_button_text TEXT,
  secondary_button_link TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active slides"
ON public.hero_slides
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all slides"
ON public.hero_slides
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can manage slides"
ON public.hero_slides
FOR ALL
USING (is_admin());

-- Trigger for updated_at
CREATE TRIGGER update_hero_slides_updated_at
BEFORE UPDATE ON public.hero_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();