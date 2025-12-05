import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export function ImageUploader({ value, onChange, bucket = 'article-images' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Erreur lors de l'upload");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    onChange(publicUrl);
    toast.success('Image uploadée');
    setUploading(false);
  };

  const handleRemove = async () => {
    if (value) {
      // Extract filename from URL
      const urlParts = value.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      await supabase.storage.from(bucket).remove([fileName]);
      onChange('');
      toast.success('Image supprimée');
    }
  };

  return (
    <div className="space-y-2">
      <Label>Image principale</Label>
      
      {value ? (
        <div className="relative group">
          <img 
            src={value} 
            alt="Image principale" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button 
              type="button" 
              variant="secondary" 
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Changer
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-10 w-10 mx-auto text-muted-foreground animate-spin" />
          ) : (
            <>
              <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Cliquez pour ajouter une image
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP (max 5 Mo)
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />

      <div className="flex gap-2">
        <Input
          placeholder="Ou collez une URL d'image..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs"
        />
      </div>
    </div>
  );
}
