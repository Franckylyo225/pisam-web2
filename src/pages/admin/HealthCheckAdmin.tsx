import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Search, 
  Eye, 
  Trash2, 
  Loader2, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  MessageSquare,
  Image,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

interface HealthCheckRegistration {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  message: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
}

const HealthCheckAdmin = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRegistration, setSelectedRegistration] = useState<HealthCheckRegistration | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: registrations, isLoading } = useQuery({
    queryKey: ['health-check-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health_check_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as HealthCheckRegistration[];
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('health_check_registrations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-check-registrations'] });
      toast.success("Statut mis à jour");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('health_check_registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-check-registrations'] });
      toast.success("Inscription supprimée");
      setIsViewDialogOpen(false);
    },
    onError: () => {
      toast.error("Erreur lors de la suppression");
    }
  });

  const filteredRegistrations = registrations?.filter(reg => {
    const matchesSearch = 
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Confirmé</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Annulé</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><CheckCircle className="w-3 h-3 mr-1" />Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = {
    total: registrations?.length || 0,
    pending: registrations?.filter(r => r.status === 'pending').length || 0,
    confirmed: registrations?.filter(r => r.status === 'confirmed').length || 0,
    completed: registrations?.filter(r => r.status === 'completed').length || 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bilan de Santé</h1>
        <p className="text-muted-foreground mt-1">Gérez les demandes de rendez-vous pour le bilan de santé</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total demandes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-muted-foreground">En attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <p className="text-sm text-muted-foreground">Confirmées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <p className="text-sm text-muted-foreground">Terminées</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Demandes de rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmé</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredRegistrations?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucune demande trouvée
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations?.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.full_name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {registration.email}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="w-3 h-3" /> {registration.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(registration.created_at), "dd MMM yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRegistration(registration);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nom complet</p>
                    <p className="font-medium">{selectedRegistration.full_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <a href={`tel:${selectedRegistration.phone}`} className="font-medium text-primary hover:underline">
                      {selectedRegistration.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${selectedRegistration.email}`} className="font-medium text-primary hover:underline">
                      {selectedRegistration.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date de demande</p>
                    <p className="font-medium">
                      {format(new Date(selectedRegistration.created_at), "dd MMMM yyyy à HH:mm", { locale: fr })}
                    </p>
                  </div>
                </div>
                {selectedRegistration.message && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Message</p>
                      <p className="font-medium">{selectedRegistration.message}</p>
                    </div>
                  </div>
                )}
                {selectedRegistration.image_url && (
                  <div className="flex items-start gap-3">
                    <Image className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Document joint</p>
                      <a href={selectedRegistration.image_url} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={selectedRegistration.image_url} 
                          alt="Document" 
                          className="max-h-40 rounded-lg border hover:opacity-80 transition-opacity"
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Changer le statut</p>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <Button
                      key={status}
                      variant={selectedRegistration.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        updateStatusMutation.mutate({ id: selectedRegistration.id, status });
                        setSelectedRegistration({ ...selectedRegistration, status });
                      }}
                      disabled={updateStatusMutation.isPending}
                    >
                      {status === 'pending' && 'En attente'}
                      {status === 'confirmed' && 'Confirmé'}
                      {status === 'completed' && 'Terminé'}
                      {status === 'cancelled' && 'Annulé'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
                      deleteMutation.mutate(selectedRegistration.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthCheckAdmin;
