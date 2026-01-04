import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from './ImageUploader';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';

interface CEOMessage {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
  title: string;
  intro_paragraph: string | null;
  main_content: string | null;
  highlight_items: string[];
  bottom_left_content: string | null;
  bottom_right_content: string | null;
  is_active: boolean;
}

export function CEOMessageManager() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Omit<CEOMessage, 'id' | 'is_active'>>({
    name: '',
    position: '',
    image_url: null,
    title: '',
    intro_paragraph: null,
    main_content: null,
    highlight_items: [],
    bottom_left_content: null,
    bottom_right_content: null,
  });
  const [newHighlightItem, setNewHighlightItem] = useState('');

  const { data: ceoMessage, isLoading } = useQuery({
    queryKey: ['ceo-message-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ceo_message')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as CEOMessage | null;
    },
  });

  useEffect(() => {
    if (ceoMessage) {
      setFormData({
        name: ceoMessage.name,
        position: ceoMessage.position,
        image_url: ceoMessage.image_url,
        title: ceoMessage.title,
        intro_paragraph: ceoMessage.intro_paragraph,
        main_content: ceoMessage.main_content,
        highlight_items: Array.isArray(ceoMessage.highlight_items) 
          ? ceoMessage.highlight_items 
          : [],
        bottom_left_content: ceoMessage.bottom_left_content,
        bottom_right_content: ceoMessage.bottom_right_content,
      });
    }
  }, [ceoMessage]);

  const updateMutation = useMutation({
    mutationFn: async (data: Omit<CEOMessage, 'id' | 'is_active'>) => {
      if (ceoMessage) {
        const { error } = await supabase
          .from('ceo_message')
          .update({
            name: data.name,
            position: data.position,
            image_url: data.image_url,
            title: data.title,
            intro_paragraph: data.intro_paragraph,
            main_content: data.main_content,
            highlight_items: data.highlight_items,
            bottom_left_content: data.bottom_left_content,
            bottom_right_content: data.bottom_right_content,
          })
          .eq('id', ceoMessage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('ceo_message')
          .insert({
            name: data.name,
            position: data.position,
            image_url: data.image_url,
            title: data.title,
            intro_paragraph: data.intro_paragraph,
            main_content: data.main_content,
            highlight_items: data.highlight_items,
            bottom_left_content: data.bottom_left_content,
            bottom_right_content: data.bottom_right_content,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ceo-message-admin'] });
      queryClient.invalidateQueries({ queryKey: ['ceo-message'] });
      toast.success('Message du PDG mis à jour avec succès');
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title) {
      toast.error('Le nom et le titre sont obligatoires');
      return;
    }
    updateMutation.mutate(formData);
  };

  const addHighlightItem = () => {
    if (newHighlightItem.trim()) {
      setFormData({
        ...formData,
        highlight_items: [...formData.highlight_items, newHighlightItem.trim()],
      });
      setNewHighlightItem('');
    }
  };

  const removeHighlightItem = (index: number) => {
    setFormData({
      ...formData,
      highlight_items: formData.highlight_items.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column: Photo */}
        <div className="space-y-4">
          <Label>Photo du PDG</Label>
          <ImageUploader
            value={formData.image_url || ''}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            bucket="article-images"
          />
        </div>

        {/* Right column: Name and Position */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du PDG *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: M. ERIC DJIBO"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Fonction *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Ex: Président Directeur Général"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre de la section *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Le mot du Président"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="intro_paragraph">Paragraphe d'introduction</Label>
        <Textarea
          id="intro_paragraph"
          value={formData.intro_paragraph || ''}
          onChange={(e) => setFormData({ ...formData, intro_paragraph: e.target.value })}
          placeholder="Bienvenue sur le site internet de la PISAM..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="main_content">Contenu principal</Label>
        <Textarea
          id="main_content"
          value={formData.main_content || ''}
          onChange={(e) => setFormData({ ...formData, main_content: e.target.value })}
          placeholder="Depuis sa création en 1985..."
          rows={5}
        />
      </div>

      <div className="space-y-4">
        <Label>Points clés (liste à puces)</Label>
        <div className="space-y-2">
          {formData.highlight_items.map((item, index) => (
            <div key={index} className="flex items-start gap-2 bg-muted/50 p-3 rounded-lg">
              <span className="flex-1 text-sm">{item}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => removeHighlightItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newHighlightItem}
            onChange={(e) => setNewHighlightItem(e.target.value)}
            placeholder="Ajouter un point clé..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addHighlightItem();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addHighlightItem}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bottom_left_content">Contenu bas gauche</Label>
          <Textarea
            id="bottom_left_content"
            value={formData.bottom_left_content || ''}
            onChange={(e) => setFormData({ ...formData, bottom_left_content: e.target.value })}
            placeholder="La PISAM est aussi à ce jour..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bottom_right_content">Contenu bas droite</Label>
          <Textarea
            id="bottom_right_content"
            value={formData.bottom_right_content || ''}
            onChange={(e) => setFormData({ ...formData, bottom_right_content: e.target.value })}
            placeholder="Pour les années à venir..."
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Enregistrer les modifications
        </Button>
      </div>
    </form>
  );
}