import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, GripVertical, Loader2, Image as ImageIcon } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  primary_button_text: string | null;
  primary_button_link: string | null;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  display_order: number;
  is_active: boolean;
  overlay_opacity: number | null;
  created_at: string;
  updated_at: string;
}

interface SlideFormData {
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  is_active: boolean;
  overlay_opacity: number;
}

const defaultFormData: SlideFormData = {
  title: '',
  subtitle: '',
  description: '',
  image_url: '',
  primary_button_text: '',
  primary_button_link: '',
  secondary_button_text: '',
  secondary_button_link: '',
  is_active: true,
  overlay_opacity: 0.6,
};

export function HeroSlidesManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<SlideFormData>(defaultFormData);
  const queryClient = useQueryClient();

  const { data: slides, isLoading } = useQuery({
    queryKey: ['hero-slides-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: SlideFormData) => {
      const maxOrder = slides?.length ? Math.max(...slides.map(s => s.display_order)) + 1 : 0;
      const { error } = await supabase
        .from('hero_slides')
        .insert({
          ...data,
          display_order: maxOrder,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides-admin'] });
      toast({ title: 'Slide créé avec succès' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: SlideFormData }) => {
      const { error } = await supabase
        .from('hero_slides')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides-admin'] });
      toast({ title: 'Slide mis à jour avec succès' });
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides-admin'] });
      toast({ title: 'Slide supprimé avec succès' });
    },
    onError: (error) => {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase
        .from('hero_slides')
        .update({ display_order: newOrder })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-slides-admin'] });
    },
  });

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingSlide(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      image_url: slide.image_url || '',
      primary_button_text: slide.primary_button_text || '',
      primary_button_link: slide.primary_button_link || '',
      secondary_button_text: slide.secondary_button_text || '',
      secondary_button_link: slide.secondary_button_link || '',
      is_active: slide.is_active,
      overlay_opacity: slide.overlay_opacity ?? 0.6,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleMoveUp = (index: number) => {
    if (!slides || index === 0) return;
    const currentSlide = slides[index];
    const prevSlide = slides[index - 1];
    reorderMutation.mutate({ id: currentSlide.id, newOrder: prevSlide.display_order });
    reorderMutation.mutate({ id: prevSlide.id, newOrder: currentSlide.display_order });
  };

  const handleMoveDown = (index: number) => {
    if (!slides || index === slides.length - 1) return;
    const currentSlide = slides[index];
    const nextSlide = slides[index + 1];
    reorderMutation.mutate({ id: currentSlide.id, newOrder: nextSlide.display_order });
    reorderMutation.mutate({ id: nextSlide.id, newOrder: currentSlide.display_order });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {slides?.length || 0} slide(s) configuré(s)
        </p>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? 'Modifier le slide' : 'Nouveau slide'}
              </DialogTitle>
              <DialogDescription>
                Configurez le contenu et les boutons d'action du slide
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Ex: PISAM, l'excellence depuis 1985"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Ex: Votre santé, notre priorité"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description courte affichée sous le titre..."
                  rows={3}
                />
              </div>

              <ImageUploader
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                bucket="article-images"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_button_text">Texte bouton principal</Label>
                  <Input
                    id="primary_button_text"
                    value={formData.primary_button_text}
                    onChange={(e) => setFormData({ ...formData, primary_button_text: e.target.value })}
                    placeholder="Ex: En savoir plus"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_button_link">Lien bouton principal</Label>
                  <Input
                    id="primary_button_link"
                    value={formData.primary_button_link}
                    onChange={(e) => setFormData({ ...formData, primary_button_link: e.target.value })}
                    placeholder="Ex: /pisam"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondary_button_text">Texte bouton secondaire</Label>
                  <Input
                    id="secondary_button_text"
                    value={formData.secondary_button_text}
                    onChange={(e) => setFormData({ ...formData, secondary_button_text: e.target.value })}
                    placeholder="Ex: Prendre rendez-vous"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_button_link">Lien bouton secondaire</Label>
                  <Input
                    id="secondary_button_link"
                    value={formData.secondary_button_link}
                    onChange={(e) => setFormData({ ...formData, secondary_button_link: e.target.value })}
                    placeholder="Ex: /contact"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overlay_opacity">Opacité du masque : {Math.round(formData.overlay_opacity * 100)}%</Label>
                <input
                  type="range"
                  id="overlay_opacity"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formData.overlay_opacity}
                  onChange={(e) => setFormData({ ...formData, overlay_opacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-muted-foreground">
                  0% = pas de masque, 100% = masque opaque
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Slide actif</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingSlide ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {slides?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Aucun slide configuré. Ajoutez votre premier slide pour commencer.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {slides?.map((slide, index) => (
            <Card key={slide.id} className={!slide.is_active ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      <GripVertical className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === slides.length - 1}
                    >
                      <GripVertical className="h-4 w-4 rotate-90" />
                    </Button>
                  </div>

                  {slide.image_url ? (
                    <img
                      src={slide.image_url}
                      alt={slide.title}
                      className="h-16 w-24 object-cover rounded"
                    />
                  ) : (
                    <div className="h-16 w-24 bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{slide.title}</h3>
                    {slide.subtitle && (
                      <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                    )}
                    <div className="flex gap-2 mt-1">
                      {slide.primary_button_text && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {slide.primary_button_text}
                        </span>
                      )}
                      {slide.secondary_button_text && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                          {slide.secondary_button_text}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!slide.is_active && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Inactif</span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(slide)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer ce slide ?')) {
                          deleteMutation.mutate(slide.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
