import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Plus, Trash2, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
  full_name?: string | null;
}

export default function AdminsAdmin() {
  const { user, isAdmin } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState('');

  const fetchAdmins = async () => {
    // First get admin roles
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('id, user_id, role, created_at')
      .eq('role', 'admin')
      .order('created_at');

    if (rolesError || !roles) {
      setLoading(false);
      return;
    }

    // Then get profiles for those users
    const userIds = roles.map(r => r.user_id);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, email, full_name')
      .in('user_id', userIds);

    // Combine data
    const adminsWithProfiles = roles.map(role => {
      const profile = profiles?.find(p => p.user_id === role.user_id);
      return {
        ...role,
        email: profile?.email,
        full_name: profile?.full_name,
      };
    });

    setAdmins(adminsWithProfiles);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Find user by email
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

    // Check if already admin
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', profile.user_id)
      .eq('role', 'admin')
      .maybeSingle();

    if (existingRole) {
      toast.error('Cet utilisateur est déjà administrateur');
      setSaving(false);
      return;
    }

    // Add admin role
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: profile.user_id, role: 'admin' });

    setSaving(false);

    if (error) {
      toast.error('Erreur lors de l\'ajout');
      return;
    }

    toast.success('Administrateur ajouté');
    setDialogOpen(false);
    setEmail('');
    fetchAdmins();
  };

  const handleRemoveAdmin = async (roleId: string, adminUserId: string) => {
    if (adminUserId === user?.id) {
      toast.error('Vous ne pouvez pas retirer vos propres droits admin');
      return;
    }

    if (!confirm('Retirer les droits administrateur ?')) return;

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', roleId);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Droits administrateur retirés');
    fetchAdmins();
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
          <h1 className="text-3xl font-bold">Administrateurs</h1>
          <p className="text-muted-foreground">Gérer les accès administrateur</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Ajouter un admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un administrateur</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email de l'utilisateur</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pisam.ci"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  L'utilisateur doit avoir un compte existant
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Ajouter
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Liste des administrateurs
          </CardTitle>
          <CardDescription>
            Les administrateurs ont un accès complet au tableau de bord
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Ajouté le</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Aucun administrateur
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
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(admin.created_at), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveAdmin(admin.id, admin.user_id)}
                        disabled={admin.user_id === user?.id}
                      >
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
