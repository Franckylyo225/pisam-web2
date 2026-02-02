-- Fix 1: Add file size limit and allowed MIME types to health-check-images bucket
UPDATE storage.buckets 
SET file_size_limit = 5242880, -- 5MB
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
WHERE id = 'health-check-images';

-- Fix 2: Create a public view for doctors that excludes sensitive contact information
CREATE OR REPLACE VIEW public.doctors_public AS
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
    available_hours
FROM public.doctors
WHERE is_active = true;

-- Grant access to the public view
GRANT SELECT ON public.doctors_public TO anon, authenticated;

-- Drop the existing permissive policy for public viewing of doctors
DROP POLICY IF EXISTS "Anyone can view active doctors" ON public.doctors;

-- Create a new policy that only allows admins to view full doctor records (including email/phone)
-- Public access will go through the doctors_public view instead
CREATE POLICY "Only admins can view doctors table directly"
ON public.doctors
FOR SELECT
USING (is_admin());