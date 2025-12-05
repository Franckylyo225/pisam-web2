-- Add approval columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_approved boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS approved_by uuid;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;

-- Update RLS policy for profiles to allow admins to update approval status
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
CREATE POLICY "Admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (is_admin());