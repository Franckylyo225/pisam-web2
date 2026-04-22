-- Create site_settings table for global site configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed to know if maintenance mode is on)
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
USING (is_admin());

-- Trigger to auto-update timestamp
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default maintenance mode setting (disabled by default)
INSERT INTO public.site_settings (key, value)
VALUES (
  'maintenance_mode',
  '{
    "enabled": false,
    "message": "Notre site est en cours de maintenance. Nous serons de retour très bientôt. Merci de votre patience.",
    "emergency_phone": "+225 27 22 48 31 12",
    "info_phone": "+225 27 22 55 00 00"
  }'::jsonb
);