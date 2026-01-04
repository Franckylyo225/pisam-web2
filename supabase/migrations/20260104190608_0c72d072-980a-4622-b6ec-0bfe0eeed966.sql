-- Create a table for insurance partner logos
CREATE TABLE public.insurance_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.insurance_partners ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active insurance partners" 
ON public.insurance_partners 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all insurance partners" 
ON public.insurance_partners 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can manage insurance partners" 
ON public.insurance_partners 
FOR ALL 
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_insurance_partners_updated_at
BEFORE UPDATE ON public.insurance_partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();