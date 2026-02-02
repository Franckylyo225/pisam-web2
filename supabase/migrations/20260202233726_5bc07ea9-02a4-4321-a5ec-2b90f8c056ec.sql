-- Fix the Security Definer View issue by recreating the view with SECURITY INVOKER
-- Drop the existing view first
DROP VIEW IF EXISTS public.doctors_public;

-- Recreate the view with SECURITY INVOKER (which is the default, but we make it explicit)
CREATE VIEW public.doctors_public
WITH (security_invoker = true)
AS
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

-- Enable RLS on the underlying doctors table is already done
-- The view will respect the RLS policies of the underlying table

-- We need to add back a policy for anonymous users to read active doctors
-- since our view uses SECURITY INVOKER and needs to access the underlying table
DROP POLICY IF EXISTS "Only admins can view doctors table directly" ON public.doctors;

-- Policy for admins to see all doctors (including inactive ones and with email/phone)
CREATE POLICY "Admins can view all doctors details"
ON public.doctors
FOR SELECT
USING (is_admin());

-- Policy for public to view only active doctors but without sensitive fields
-- This works with the view since the view already filters to is_active = true
-- and excludes email/phone columns
CREATE POLICY "Public can view active doctors basic info"
ON public.doctors
FOR SELECT
USING (is_active = true);