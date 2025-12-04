import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

interface Specialty {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty_id: string | null;
  image_url: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  available_days: string[];
  available_hours: string | null;
  is_active: boolean;
  specialties?: Specialty | null;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default function DoctorsAdmin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    specialty_id: '',
    image_url: '',
    bio: '',
    phone: '',
    email: '',
    available_days: [] as string[],
    available_hours: '',
    is_active: true,
  });

  const fetchData = async () => {
    const [doctorsRes, specialtiesRes] = await Promise.all([
      supabase.from('doctors').select('*, specialties(id, name)').order('name'),
      supabase.from('specialties').select('id, name').eq('is_active', true).order('name'),
    ]);

    if (doctorsRes.data) setDoctors(doctorsRes.data);
    if (specialtiesRes.data) setSpecialties(specialtiesRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      specialty_id: '',
      image_url: '',
      bio: '',
      phone: '',
      email: '',
      available_days: [],
      available_hours: '',
      is_active: true,
    });
    setEditingDoctor(null);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty_id: doctor.specialty_id || '',
      image_url: doctor.image_url || '',
      bio: doctor.bio || '',
      phone: doctor.phone || '',
      email: doctor.email || '',
      available_days: doctor.available_days || [],
      available_hours: doctor.available_hours || '',
      is_active: doctor.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      name: formData.name,
      specialty_id: formData.specialty_id || null,
      image_url: formData.image_url || null,
      bio: formData.bio || null,
      phone: formData.phone || null,
      email: formData.email || null,
      available_days: formData.available_days,
      available_hours: formData.available_hours || null,
      is_active: formData.is_active,
    };

    let error;
    if (editingDoctor) {
      const res = await supabase.from('doctors').update(data).eq('id', editingDoctor.id);
      error = res.error;
    } else {
      const res = await supabase.from('doctors').insert(data);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      toast.error('Erreur lors de la sauvegarde');
      return;
    }

    toast.success(editingDoctor ? 'Médecin modifié' : 'Médecin ajouté');
    setDialogOpen(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce médecin ?')) return;

    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Médecin supprimé');
    fetchData();
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      available_days: prev.available_days.includes(day)
        ? prev.available_days.filter(d => d !== day)
        : [...prev.available_days, day]
    }));
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Médecins</h1>
          <p className="text-muted-foreground">Gérer les profils des médecins</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Ajouter un médecin</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDoctor ? 'Modifier le médecin' : 'Ajouter un médecin'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Spécialité</Label>
                  <Select
                    value={formData.specialty_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, specialty_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Jours de disponibilité</Label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map(day => (
                    <Button
                      key={day}
                      type="button"
                      variant={formData.available_days.includes(day) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleDay(day)}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="available_hours">Horaires</Label>
                <Input
                  id="available_hours"
                  value={formData.available_hours}
                  onChange={(e) => setFormData(prev => ({ ...prev, available_hours: e.target.value }))}
                  placeholder="Ex: 08h00 - 17h00"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label>Actif</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {editingDoctor ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucun médecin enregistré
                  </TableCell>
                </TableRow>
              ) : (
                doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialties?.name || '-'}</TableCell>
                    <TableCell>{doctor.email || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${doctor.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {doctor.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(doctor)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(doctor.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
