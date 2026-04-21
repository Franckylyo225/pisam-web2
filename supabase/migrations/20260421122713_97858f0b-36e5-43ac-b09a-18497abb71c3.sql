DROP VIEW IF EXISTS public.doctors_public;

CREATE VIEW public.doctors_public
WITH (security_invoker=on) AS
SELECT
  id,
  specialty_id,
  is_active,
  created_at,
  updated_at,
  name,
  image_url,
  bio,
  available_days,
  available_hours,
  availability
FROM public.doctors
WHERE is_active = true;

GRANT SELECT ON public.doctors_public TO anon, authenticated;