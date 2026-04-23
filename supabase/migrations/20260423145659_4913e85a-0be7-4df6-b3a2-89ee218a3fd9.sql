INSERT INTO storage.buckets (id, name, public)
VALUES ('doctor-images', 'doctor-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Doctor images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'doctor-images');

CREATE POLICY "Admins can upload doctor images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'doctor-images' AND public.is_admin());

CREATE POLICY "Admins can update doctor images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'doctor-images' AND public.is_admin());

CREATE POLICY "Admins can delete doctor images"
ON storage.objects FOR DELETE
USING (bucket_id = 'doctor-images' AND public.is_admin());