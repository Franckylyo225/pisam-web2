-- Grant column-level SELECT on doctors so the security_invoker view doctors_public works for anon
GRANT SELECT (
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
) ON public.doctors TO anon;

GRANT SELECT (
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
) ON public.doctors TO authenticated;

GRANT SELECT ON public.doctors_public TO anon, authenticated;