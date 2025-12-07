-- Politique pour permettre aux utilisateurs authentifiés d'uploader des images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');

-- Politique pour permettre aux utilisateurs authentifiés de supprimer leurs images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'article-images');

-- Politique pour permettre aux utilisateurs authentifiés de mettre à jour les images
CREATE POLICY "Authenticated users can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'article-images');

-- Politique pour lecture publique (bucket est déjà public)
CREATE POLICY "Public can read images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'article-images');