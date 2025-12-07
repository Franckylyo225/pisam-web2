import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Users, Stethoscope } from 'lucide-react';

interface Specialty {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  is_active: boolean;
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
  
  // Doctor dialog state
  const [doctorDialogOpen, setDoctorDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [savingDoctor, setSavingDoctor] = useState(false);
  
  // Specialty dialog state
  const [specialtyDialogOpen, setSpecialtyDialogOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);
  const [savingSpecialty, setSavingSpecialty] = useState(false);

  // Doctor form state
  const [doctorFormData, setDoctorFormData] = useState({
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

  // Specialty form state
  const [specialtyFormData, setSpecialtyFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '#1a6b8a',
    is_active: true,
  });

  const fetchData = async () => {
    const [doctorsRes, specialtiesRes] = await Promise.all([
      supabase.from('doctors').select('*, specialties(id, name, description, icon, color, is_active)').order('name'),
      supabase.from('specialties').select('*').order('name'),
    ]);

    if (doctorsRes.data) setDoctors(doctorsRes.data);
    if (specialtiesRes.data) setSpecialties(specialtiesRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Doctor functions
  const resetDoctorForm = () => {
    setDoctorFormData({
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

  const openEditDoctorDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setDoctorFormData({
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
    setDoctorDialogOpen(true);
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDoctor(true);

    const data = {
      name: doctorFormData.name,
      specialty_id: doctorFormData.specialty_id || null,
      image_url: doctorFormData.image_url || null,
      bio: doctorFormData.bio || null,
      phone: doctorFormData.phone || null,
      email: doctorFormData.email || null,
      available_days: doctorFormData.available_days,
      available_hours: doctorFormData.available_hours || null,
      is_active: doctorFormData.is_active,
    };

    let error;
    if (editingDoctor) {
      const res = await supabase.from('doctors').update(data).eq('id', editingDoctor.id);
      error = res.error;
    } else {
      const res = await supabase.from('doctors').insert(data);
      error = res.error;
    }

    setSavingDoctor(false);

    if (error) {
      toast.error('Erreur lors de la sauvegarde');
      return;
    }

    toast.success(editingDoctor ? 'Médecin modifié' : 'Médecin ajouté');
    setDoctorDialogOpen(false);
    resetDoctorForm();
    fetchData();
  };

  const handleDoctorDelete = async (id: string) => {
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
    setDoctorFormData(prev => ({
      ...prev,
      available_days: prev.available_days.includes(day)
        ? prev.available_days.filter(d => d !== day)
        : [...prev.available_days, day]
    }));
  };

  // Specialty functions
  const resetSpecialtyForm = () => {
    setSpecialtyFormData({ name: '', description: '', icon: '', color: '#1a6b8a', is_active: true });
    setEditingSpecialty(null);
  };

  const openEditSpecialtyDialog = (specialty: Specialty) => {
    setEditingSpecialty(specialty);
    setSpecialtyFormData({
      name: specialty.name,
      description: specialty.description || '',
      icon: specialty.icon || '',
      color: specialty.color || '#1a6b8a',
      is_active: specialty.is_active,
    });
    setSpecialtyDialogOpen(true);
  };

  const handleSpecialtySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSpecialty(true);

    const data = {
      name: specialtyFormData.name,
      description: specialtyFormData.description || null,
      icon: specialtyFormData.icon || null,
      color: specialtyFormData.color,
      is_active: specialtyFormData.is_active,
    };

    let error;
    if (editingSpecialty) {
      const res = await supabase.from('specialties').update(data).eq('id', editingSpecialty.id);
      error = res.error;
    } else {
      const res = await supabase.from('specialties').insert(data);
      error = res.error;
    }

    setSavingSpecialty(false);

    if (error) {
      toast.error(error.message.includes('duplicate') ? 'Cette spécialité existe déjà' : 'Erreur lors de la sauvegarde');
      return;
    }

    toast.success(editingSpecialty ? 'Spécialité modifiée' : 'Spécialité ajoutée');
    setSpecialtyDialogOpen(false);
    resetSpecialtyForm();
    fetchData();
  };

  const handleSpecialtyDelete = async (id: string) => {
    if (!confirm('Supprimer cette spécialité ?')) return;

    const { error } = await supabase.from('specialties').delete().eq('id', id);
    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Spécialité supprimée');
    fetchData();
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const activeSpecialties = specialties.filter(s => s.is_active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Médecins & Spécialités</h1>
        <p className="text-muted-foreground">Gérer les profils des médecins et les spécialités médicales</p>
      </div>

      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Médecins
          </TabsTrigger>
          <TabsTrigger value="specialties" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Spécialités
          </TabsTrigger>
        </TabsList>

        {/* Doctors Tab */}
        <TabsContent value="doctors" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={doctorDialogOpen} onOpenChange={(open) => { setDoctorDialogOpen(open); if (!open) resetDoctorForm(); }}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" />Ajouter un médecin</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingDoctor ? 'Modifier le médecin' : 'Ajouter un médecin'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleDoctorSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={doctorFormData.name}
                        onChange={(e) => setDoctorFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Spécialité</Label>
                      <Select
                        value={doctorFormData.specialty_id}
                        onValueChange={(value) => setDoctorFormData(prev => ({ ...prev, specialty_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          {activeSpecialties.map(s => (
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
                      value={doctorFormData.image_url}
                      onChange={(e) => setDoctorFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={doctorFormData.email}
                        onChange={(e) => setDoctorFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={doctorFormData.phone}
                        onChange={(e) => setDoctorFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea
                      id="bio"
                      value={doctorFormData.bio}
                      onChange={(e) => setDoctorFormData(prev => ({ ...prev, bio: e.target.value }))}
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
                          variant={doctorFormData.available_days.includes(day) ? 'default' : 'outline'}
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
                      value={doctorFormData.available_hours}
                      onChange={(e) => setDoctorFormData(prev => ({ ...prev, available_hours: e.target.value }))}
                      placeholder="Ex: 08h00 - 17h00"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={doctorFormData.is_active}
                      onCheckedChange={(checked) => setDoctorFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label>Actif</Label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setDoctorDialogOpen(false)}>Annuler</Button>
                    <Button type="submit" disabled={savingDoctor}>
                      {savingDoctor ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
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
                          <Button variant="ghost" size="icon" onClick={() => openEditDoctorDialog(doctor)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDoctorDelete(doctor.id)}>
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
        </TabsContent>

        {/* Specialties Tab */}
        <TabsContent value="specialties" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={specialtyDialogOpen} onOpenChange={(open) => { setSpecialtyDialogOpen(open); if (!open) resetSpecialtyForm(); }}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" />Ajouter une spécialité</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingSpecialty ? 'Modifier la spécialité' : 'Ajouter une spécialité'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSpecialtySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty_name">Nom *</Label>
                    <Input
                      id="specialty_name"
                      value={specialtyFormData.name}
                      onChange={(e) => setSpecialtyFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty_description">Description</Label>
                    <Textarea
                      id="specialty_description"
                      value={specialtyFormData.description}
                      onChange={(e) => setSpecialtyFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty_icon">Icône (nom Lucide)</Label>
                      <Input
                        id="specialty_icon"
                        value={specialtyFormData.icon}
                        onChange={(e) => setSpecialtyFormData(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="Ex: Heart, Brain..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty_color">Couleur</Label>
                      <div className="flex gap-2">
                        <Input
                          id="specialty_color"
                          type="color"
                          value={specialtyFormData.color}
                          onChange={(e) => setSpecialtyFormData(prev => ({ ...prev, color: e.target.value }))}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={specialtyFormData.color}
                          onChange={(e) => setSpecialtyFormData(prev => ({ ...prev, color: e.target.value }))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={specialtyFormData.is_active}
                      onCheckedChange={(checked) => setSpecialtyFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label>Active</Label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setSpecialtyDialogOpen(false)}>Annuler</Button>
                    <Button type="submit" disabled={savingSpecialty}>
                      {savingSpecialty ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {editingSpecialty ? 'Modifier' : 'Ajouter'}
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
                    <TableHead>Couleur</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specialties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Aucune spécialité enregistrée
                      </TableCell>
                    </TableRow>
                  ) : (
                    specialties.map((specialty) => (
                      <TableRow key={specialty.id}>
                        <TableCell>
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: specialty.color || '#1a6b8a' }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{specialty.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{specialty.description || '-'}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${specialty.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {specialty.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEditSpecialtyDialog(specialty)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleSpecialtyDelete(specialty.id)}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}