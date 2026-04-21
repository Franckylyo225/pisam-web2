ALTER TABLE public.doctors
ADD COLUMN IF NOT EXISTS availability JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.doctors.availability IS 'Per-day availability slots. Example: {"Lundi": [{"start": "08:00", "end": "12:00"}, {"start": "14:00", "end": "17:00"}]}';