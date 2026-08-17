CREATE TABLE public.imaging_exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  modality text NOT NULL CHECK (modality IN ('RADIO','ECHOGRAPHIE','SCANNER','IRM')),
  description text,
  preparation text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.imaging_exams TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.imaging_exams TO authenticated;
GRANT ALL ON public.imaging_exams TO service_role;

ALTER TABLE public.imaging_exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active imaging exams"
ON public.imaging_exams FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can view all imaging exams"
ON public.imaging_exams FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can manage imaging exams"
ON public.imaging_exams FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE UNIQUE INDEX imaging_exams_name_modality_key
ON public.imaging_exams (lower(name), modality);

CREATE INDEX imaging_exams_modality_idx ON public.imaging_exams (modality, display_order);

CREATE TRIGGER update_imaging_exams_updated_at
BEFORE UPDATE ON public.imaging_exams
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();