import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2, Mail, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
}

export default function NewsletterAdmin() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ['newsletter-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as NewsletterSubscription[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter-subscriptions'] });
      toast({
        title: 'Inscription supprimée',
        description: "L'adresse email a été retirée de la liste.",
      });
      setDeleteId(null);
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: "Impossible de supprimer l'inscription.",
        variant: 'destructive',
      });
    },
  });

  const handleExportCSV = () => {
    if (!subscriptions?.length) return;
    
    const csv = [
      ['Email', 'Date d\'inscription'],
      ...subscriptions.map(sub => [
        sub.email,
        format(new Date(sub.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-subscriptions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground">
            {subscriptions?.length || 0} inscrit{(subscriptions?.length || 0) > 1 ? 's' : ''}
          </p>
        </div>
        {subscriptions && subscriptions.length > 0 && (
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
        )}
      </div>

      {subscriptions && subscriptions.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {subscription.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(subscription.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(subscription.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Aucune inscription</h3>
          <p className="text-muted-foreground">
            Les inscriptions à la newsletter apparaîtront ici.
          </p>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette inscription ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'adresse email sera retirée de la liste de diffusion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
