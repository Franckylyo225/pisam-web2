DROP POLICY IF EXISTS "Anyone can view active doctors public fields" ON public.doctors;

CREATE POLICY "Anyone can view active doctors public fields"
ON public.doctors
FOR SELECT
TO anon, authenticated
USING (is_active = true);

REVOKE ALL ON public.doctors FROM anon, authenticated;
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
  available_hours
) ON public.doctors TO anon, authenticated;

GRANT SELECT ON public.doctors_public TO anon, authenticated;
GRANT SELECT ON public.specialties TO anon, authenticated;