-- Add SEO and keywords columns to articles
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS keywords text[];
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reading_time integer;

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('article-images', 'article-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for article images
CREATE POLICY "Anyone can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Admins can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'article-images' AND is_admin());

CREATE POLICY "Admins can update article images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'article-images' AND is_admin());

CREATE POLICY "Admins can delete article images"
ON storage.objects FOR DELETE
USING (bucket_id = 'article-images' AND is_admin());