-- Create notification settings table
CREATE TABLE public.notification_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_type text NOT NULL UNIQUE,
  email_addresses text[] NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage notification settings
CREATE POLICY "Admins can manage notification settings"
ON public.notification_settings
FOR ALL
USING (is_admin());

-- Insert default settings for each subject type
INSERT INTO public.notification_settings (subject_type, email_addresses) VALUES
  ('Plainte & Réclamation', '{}'),
  ('Bilan de Santé', '{}'),
  ('Demande de renseignement', '{}'),
  ('Autres', '{}');

-- Add trigger for updated_at
CREATE TRIGGER update_notification_settings_updated_at
  BEFORE UPDATE ON public.notification_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();