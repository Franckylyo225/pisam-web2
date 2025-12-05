import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, Loader2, Shield, AlertTriangle, UserCheck, UserX, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type AppRole = 'super_admin' | 'admin' | 'editor';

interface AdminUser {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  email?: string;
  full_name?: string | null;
}

interface PendingUser {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  is_approved: boolean;
}

const roleLabels: Record<AppRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrateur',
  editor: 'Rédacteur',
};

const roleBadgeColors: Record<AppRole, string> = {
  super_admin: 'bg-red-500',
  admin: 'bg-blue-500',
  editor: 'bg-green-500',
};

export default function AdminsAdmin() {
  const { user, isSuperAdmin, isAdmin } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('editor');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const fetchAdmins = async () => {
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('id, user_id, role, created_at')
      .order('created_at');

    if (rolesError || !roles) {
      setLoading(false);
      return;
    }

    const userIds = roles.map(r => r.user_id);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, email, full_name')
      .in('user_id', userIds);

    const adminsWithProfiles = roles.map(role => {
      const profile = profiles?.find(p => p.user_id === role.user_id);
      return {
        ...role,
        role: role.role as AppRole,
        email: profile?.email,
        full_name: profile?.full_name,
      };
    });

    setAdmins(adminsWithProfiles);
    setLoading(false);
  };

  const fetchPendingUsers = async () => {
    // Use raw query to access new columns
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Filter pending users (is_approved = false)
      const pending = (data as any[]).filter(p => p.is_approved === false);
      setPendingUsers(pending.map(p => ({
        id: p.id,
        user_id: p.user_id,
        email: p.email,
        full_name: p.full_name,
        created_at: p.created_at,
        is_approved: p.is_approved,
      })));
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchPendingUsers();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (profileError || !profile) {
      toast.error('Utilisateur non trouvé avec cet email');
      setSaving(false);
      return;
    }

    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', profile.user_id)
      .maybeSingle();

    if (existingRole) {
      toast.error('Cet utilisateur a déjà un rôle assigné');
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: profile.user_id, role: selectedRole });

    if (error) {
      toast.error('Erreur lors de l\'ajout');
      setSaving(false);
      return;
    }

    // Also approve the user using raw update
    await supabase
      .from('profiles')
      .update({ 
        is_approved: true, 
        approved_at: new Date().toISOString() 
      } as any)
      .eq('user_id', profile.user_id);

    toast.success('Utilisateur ajouté avec succès');
    setDialogOpen(false);
    setEmail('');
    setSelectedRole('editor');
    setSaving(false);
    fetchAdmins();
    fetchPendingUsers();
  };

  const handleApproveUser = async (pendingUser: PendingUser, role: AppRole) => {
    setSaving(true);

    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: pendingUser.user_id, role });

    if (roleError) {
      toast.error('Erreur lors de l\'attribution du rôle');
      setSaving(false);
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        is_approved: true, 
        approved_at: new Date().toISOString(),
        approved_by: user?.id 
      } as any)
      .eq('user_id', pendingUser.user_id);

    if (profileError) {
      toast.error('Erreur lors de l\'approbation');
      setSaving(false);
      return;
    }

    toast.success('Utilisateur approuvé');
    setSaving(false);
    fetchAdmins();
    fetchPendingUsers();
  };

  const handleRejectUser = async (pendingUser: PendingUser) => {
    if (!confirm('Rejeter cette demande d\'inscription ?')) return;

    // Delete the profile
    await supabase
      .from('profiles')
      .delete()
      .eq('user_id', pendingUser.user_id);

    toast.success('Demande rejetée');
    fetchPendingUsers();
  };

  const handleUpdateRole = async () => {
    if (!editingUser) return;
    setSaving(true);

    const { error } = await supabase
      .from('user_roles')
      .update({ role: selectedRole })
      .eq('id', editingUser.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
      setSaving(false);
      return;
    }

    toast.success('Rôle mis à jour');
    setEditDialogOpen(false);
    setEditingUser(null);
    setSaving(false);
    fetchAdmins();
  };

  const handleRemoveAdmin = async (roleId: string, adminUserId: string) => {
    if (adminUserId === user?.id) {
      toast.error('Vous ne pouvez pas retirer vos propres droits');
      return;
    }

    if (!confirm('Retirer ce rôle ?')) return;

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Rôle retiré');
    fetchAdmins();
  };

  const openEditDialog = (adminUser: AdminUser) => {
    setEditingUser(adminUser);
    setSelectedRole(adminUser.role);
    setEditDialogOpen(true);
  };

  if (!isAdmin) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Vous devez être administrateur pour accéder à cette page.
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérer les accès et les rôles</p>
        </div>
        {isSuperAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Ajouter un utilisateur</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un utilisateur</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email de l'utilisateur</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="utilisateur@pisam.ci"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    L'utilisateur doit avoir un compte existant
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Rédacteur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Ajouter
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Utilisateurs actifs</TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger value="pending">
              En attente
              {pendingUsers.length > 0 && (
                <Badge variant="destructive" className="ml-2">{pendingUsers.length}</Badge>
              )}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Liste des utilisateurs
              </CardTitle>
              <CardDescription>
                Utilisateurs ayant accès au tableau de bord
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Ajouté le</TableHead>
                    {isSuperAdmin && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        Aucun utilisateur
                      </TableCell>
                    </TableRow>
                  ) : (
                    admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                          {admin.full_name || 'Sans nom'}
                          {admin.user_id === user?.id && (
                            <span className="ml-2 text-xs text-muted-foreground">(vous)</span>
                          )}
                        </TableCell>
                        <TableCell>{admin.email || '-'}</TableCell>
                        <TableCell>
                          <Badge className={roleBadgeColors[admin.role]}>
                            {roleLabels[admin.role]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(admin.created_at), 'dd MMM yyyy', { locale: fr })}
                        </TableCell>
                        {isSuperAdmin && (
                          <TableCell className="text-right space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditDialog(admin)}
                              disabled={admin.user_id === user?.id}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveAdmin(admin.id, admin.user_id)}
                              disabled={admin.user_id === user?.id}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {isSuperAdmin && (
          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Demandes en attente
                </CardTitle>
                <CardDescription>
                  Utilisateurs en attente de validation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date d'inscription</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Aucune demande en attente
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingUsers.map((pendingUser) => (
                        <TableRow key={pendingUser.id}>
                          <TableCell className="font-medium">
                            {pendingUser.full_name || 'Sans nom'}
                          </TableCell>
                          <TableCell>{pendingUser.email}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(pendingUser.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Select onValueChange={(role) => handleApproveUser(pendingUser, role as AppRole)}>
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue placeholder="Approuver..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="editor">Rédacteur</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="super_admin">Super Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRejectUser(pendingUser)}
                              >
                                <UserX className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le rôle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Utilisateur</Label>
              <p className="text-sm text-muted-foreground">{editingUser?.email}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editRole">Nouveau rôle</Label>
              <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Rédacteur</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleUpdateRole} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
