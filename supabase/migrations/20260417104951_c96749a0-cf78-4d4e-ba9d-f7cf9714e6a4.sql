-- 1. Drop overly permissive doctors public policy (PII exposure)
DROP POLICY IF EXISTS "Public can view active doctors basic info" ON public.doctors;

-- 2. Lock down article-images bucket: remove non-admin write/delete policies
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Public can read images" ON storage.objects;

-- 3. Restrict health-check-images SELECT to admins only (fix public listing).
-- Files are still accessible via signed URLs / known public URLs in the bucket itself; 
-- but we prevent anonymous listing/enumeration via the API.
DROP POLICY IF EXISTS "Anyone can view health check images" ON storage.objects;
CREATE POLICY "Admins can view health check images"
ON storage.objects FOR SELECT
USING (bucket_id = 'health-check-images' AND public.is_admin());

-- 4. Restrict health-check uploads to limit anonymous abuse:
-- Keep public uploads but add path safety check (no traversal).
DROP POLICY IF EXISTS "Anyone can upload health check images" ON storage.objects;
CREATE POLICY "Public can upload health check images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'health-check-images'
  AND (storage.foldername(name))[1] IS DISTINCT FROM '..'
);