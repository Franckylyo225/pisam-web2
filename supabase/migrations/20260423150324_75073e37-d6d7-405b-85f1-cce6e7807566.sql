CREATE UNIQUE INDEX IF NOT EXISTS specialties_name_unique_ci
  ON public.specialties (lower(name));

CREATE UNIQUE INDEX IF NOT EXISTS doctors_name_specialty_unique_ci
  ON public.doctors (lower(name), specialty_id);