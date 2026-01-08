-- Create table for health check registrations
CREATE TABLE public.health_check_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.health_check_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit health check registration"
ON public.health_check_registrations
FOR INSERT
WITH CHECK (true);

-- Only admins can view registrations
CREATE POLICY "Admins can view health check registrations"
ON public.health_check_registrations
FOR SELECT
USING (public.is_admin());

-- Only admins can update registrations
CREATE POLICY "Admins can update health check registrations"
ON public.health_check_registrations
FOR UPDATE
USING (public.is_admin());

-- Only admins can delete registrations
CREATE POLICY "Admins can delete health check registrations"
ON public.health_check_registrations
FOR DELETE
USING (public.is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_health_check_registrations_updated_at
BEFORE UPDATE ON public.health_check_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for health check images
INSERT INTO storage.buckets (id, name, public) VALUES ('health-check-images', 'health-check-images', true);

-- Storage policies for health check images
CREATE POLICY "Anyone can upload health check images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'health-check-images');

CREATE POLICY "Anyone can view health check images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'health-check-images');

CREATE POLICY "Admins can delete health check images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'health-check-images' AND public.is_admin());