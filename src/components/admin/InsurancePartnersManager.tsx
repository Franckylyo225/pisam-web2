import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUploader } from './ImageUploader';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, GripVertical, ExternalLink, Loader2 } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface InsurancePartner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
}

interface InsuranceFormData {
  name: string;
  logo_url: string;
  website_url: string;
  is_active: boolean;
}

interface SortablePartnerCardProps {
  partner: InsurancePartner;
  onEdit: (partner: InsurancePartner) => void;
  onDelete: (partner: InsurancePartner) => void;
  onToggleActive: (id: string, is_active: boolean) => void;
}

function SortablePartnerCard({ partner, onEdit, onDelete, onToggleActive }: SortablePartnerCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: partner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative ${!partner.is_active ? 'opacity-60' : ''} ${isDragging ? 'shadow-lg' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 cursor-grab active:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="w-full h-16 bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              {partner.logo_url ? (
                <img 
                  src={partner.logo_url} 
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain p-2"
                />
              ) : (
                <span className="text-xs text-muted-foreground">Pas de logo</span>
              )}
            </div>
            
            <h4 className="font-medium text-sm truncate">{partner.name}</h4>
            
            {partner.website_url && (
              <a 
                href={partner.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
              >
                <ExternalLink className="h-3 w-3" />
                Site web
              </a>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Switch
              checked={partner.is_active}
              onCheckedChange={(checked) => onToggleActive(partner.id, checked)}
              className="scale-75"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(partner)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(partner)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InsurancePartnersManager() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<InsurancePartner | null>(null);
  const [formData, setFormData] = useState<InsuranceFormData>({
    name: '',
    logo_url: '',
    website_url: '',
    is_active: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: partners, isLoading } = useQuery({
    queryKey: ['insurance-partners-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insurance_partners')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as InsurancePartner[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsuranceFormData) => {
      const maxOrder = partners?.reduce((max, p) => Math.max(max, p.display_order), -1) ?? -1;
      const { error } = await supabase
        .from('insurance_partners')
        .insert({
          name: data.name,
          logo_url: data.logo_url,
          website_url: data.website_url || null,
          is_active: data.is_active,
          display_order: maxOrder + 1,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['insurance-partners'] });
      toast.success('Partenaire ajouté avec succès');
      resetForm();
    },
    onError: (error) => {
      toast.error('Erreur lors de l\'ajout: ' + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsuranceFormData }) => {
      const { error } = await supabase
        .from('insurance_partners')
        .update({
          name: data.name,
          logo_url: data.logo_url,
          website_url: data.website_url || null,
          is_active: data.is_active,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['insurance-partners'] });
      toast.success('Partenaire mis à jour avec succès');
      resetForm();
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour: ' + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('insurance_partners')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['insurance-partners'] });
      toast.success('Partenaire supprimé avec succès');
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression: ' + error.message);
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (reorderedPartners: { id: string; display_order: number }[]) => {
      const updates = reorderedPartners.map(({ id, display_order }) =>
        supabase
          .from('insurance_partners')
          .update({ display_order })
          .eq('id', id)
      );
      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);
      if (errors.length > 0) throw errors[0].error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['insurance-partners'] });
      toast.success('Ordre mis à jour');
    },
    onError: (error) => {
      toast.error('Erreur lors de la réorganisation: ' + error.message);
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('insurance_partners')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-partners-admin'] });
      queryClient.invalidateQueries({ queryKey: ['insurance-partners'] });
    },
    onError: (error) => {
      toast.error('Erreur: ' + error.message);
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && partners) {
      const oldIndex = partners.findIndex((p) => p.id === active.id);
      const newIndex = partners.findIndex((p) => p.id === over.id);

      const reordered = arrayMove(partners, oldIndex, newIndex);
      const updates = reordered.map((p, index) => ({
        id: p.id,
        display_order: index,
      }));

      // Optimistic update
      queryClient.setQueryData(['insurance-partners-admin'], reordered);
      reorderMutation.mutate(updates);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', logo_url: '', website_url: '', is_active: true });
    setEditingPartner(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (partner: InsurancePartner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url,
      website_url: partner.website_url || '',
      is_active: partner.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo_url) {
      toast.error('Le nom et le logo sont obligatoires');
      return;
    }

    if (editingPartner) {
      updateMutation.mutate({ id: editingPartner.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (partner: InsurancePartner) => {
    if (confirm(`Voulez-vous vraiment supprimer "${partner.name}" ?`)) {
      deleteMutation.mutate(partner.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {partners?.length || 0} partenaire(s) configuré(s) • Glissez-déposez pour réorganiser
        </p>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else setIsDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un partenaire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? 'Modifier le partenaire' : 'Ajouter un partenaire'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'assurance *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: NSIA Assurances"
                  required
                />
              </div>

              <ImageUploader
                value={formData.logo_url}
                onChange={(url) => setFormData({ ...formData, logo_url: url })}
                bucket="article-images"
              />

              <div className="space-y-2">
                <Label htmlFor="website_url">Site web (optionnel)</Label>
                <Input
                  id="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://www.example.com"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Actif</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingPartner ? 'Mettre à jour' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {partners && partners.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={partners.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <SortablePartnerCard
                  key={partner.id}
                  partner={partner}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleActive={(id, is_active) => toggleActiveMutation.mutate({ id, is_active })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">
            Aucun partenaire configuré pour le moment
          </p>
          <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter votre premier partenaire
          </Button>
        </div>
      )}
    </div>
  );
}
