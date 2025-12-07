import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2, Loader2, Mail, AlertTriangle, Eye, Archive, MailOpen, RefreshCw, Reply, Send } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export default function MessagesAdmin() {
  const { isAdmin } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      toast.error('Erreur lors du chargement des messages');
    }
    
    if (data) {
      setMessages(data as ContactMessage[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setDialogOpen(true);
    setReplyMode(false);
    setReplyContent('');
    
    if (!message.is_read) {
      await supabase
        .from('contact_messages')
        .update({ is_read: true } as any)
        .eq('id', message.id);
      
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, is_read: true } : m
      ));
    }
  };

  const toggleArchive = async (message: ContactMessage) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_archived: !message.is_archived } as any)
      .eq('id', message.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
      return;
    }

    setMessages(prev => prev.map(m => 
      m.id === message.id ? { ...m, is_archived: !m.is_archived } : m
    ));
    
    if (selectedMessage?.id === message.id) {
      setSelectedMessage(prev => prev ? { ...prev, is_archived: !prev.is_archived } : null);
    }
    
    toast.success(message.is_archived ? 'Message restauré' : 'Message archivé');
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Supprimer définitivement ce message ?')) return;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    setMessages(prev => prev.filter(m => m.id !== id));
    setDialogOpen(false);
    toast.success('Message supprimé');
  };

  const handleReply = () => {
    if (!selectedMessage) return;
    
    // Generate default reply content
    const defaultReply = `Bonjour ${selectedMessage.name},\n\nMerci pour votre message concernant "${selectedMessage.subject}".\n\n\n\nCordialement,\nL'équipe PISAM`;
    setReplyContent(defaultReply);
    setReplyMode(true);
  };

  const sendReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;
    
    // Open mailto link with pre-filled content
    const subject = encodeURIComponent(`Re: ${selectedMessage.subject}`);
    const body = encodeURIComponent(replyContent);
    window.open(`mailto:${selectedMessage.email}?subject=${subject}&body=${body}`, '_blank');
    
    toast.success('Client email ouvert pour envoyer la réponse');
    setReplyMode(false);
    setReplyContent('');
  };

  const unreadMessages = messages.filter(m => !m.is_read && !m.is_archived);
  const inboxMessages = messages.filter(m => !m.is_archived);
  const archivedMessages = messages.filter(m => m.is_archived);

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

  const MessageTable = ({ messageList }: { messageList: ContactMessage[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30px]"></TableHead>
          <TableHead>Expéditeur</TableHead>
          <TableHead>Sujet</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messageList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              Aucun message
            </TableCell>
          </TableRow>
        ) : (
          messageList.map((message) => (
            <TableRow 
              key={message.id} 
              className={`cursor-pointer ${!message.is_read ? 'bg-primary/5 font-medium' : ''}`}
              onClick={() => openMessage(message)}
            >
              <TableCell>
                {!message.is_read ? (
                  <Mail className="h-4 w-4 text-primary" />
                ) : (
                  <MailOpen className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell>
                <div>
                  <p className={!message.is_read ? 'font-semibold' : ''}>{message.name}</p>
                  <p className="text-xs text-muted-foreground">{message.email}</p>
                </div>
              </TableCell>
              <TableCell className={!message.is_read ? 'font-semibold' : ''}>
                {message.subject}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(message.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
              </TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleArchive(message)}
                  title={message.is_archived ? 'Restaurer' : 'Archiver'}
                >
                  {message.is_archived ? (
                    <RefreshCw className="h-4 w-4" />
                  ) : (
                    <Archive className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => deleteMessage(message.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Gérer les messages du formulaire de contact</p>
        </div>
        <Button variant="outline" onClick={fetchMessages}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">
            Boîte de réception
            {unreadMessages.length > 0 && (
              <Badge variant="destructive" className="ml-2">{unreadMessages.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">Archives</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Messages reçus
              </CardTitle>
              <CardDescription>
                {inboxMessages.length} message(s), {unreadMessages.length} non lu(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MessageTable messageList={inboxMessages} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Messages archivés
              </CardTitle>
              <CardDescription>
                {archivedMessages.length} message(s) archivé(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MessageTable messageList={archivedMessages} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          setReplyMode(false);
          setReplyContent('');
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">De</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedMessage.email}`} className="font-medium text-primary hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <p className="text-muted-foreground">Téléphone</p>
                    <a href={`tel:${selectedMessage.phone}`} className="font-medium text-primary hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedMessage.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-muted-foreground text-sm mb-2">Message</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              {replyMode ? (
                <div className="border-t pt-4 space-y-3">
                  <Label htmlFor="reply" className="flex items-center gap-2">
                    <Reply className="h-4 w-4" />
                    Répondre à {selectedMessage.name}
                  </Label>
                  <Textarea
                    id="reply"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={8}
                    placeholder="Votre réponse..."
                    className="resize-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setReplyMode(false)}>
                      Annuler
                    </Button>
                    <Button onClick={sendReply} disabled={!replyContent.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between gap-2 pt-4 border-t">
                  <Button onClick={handleReply} className="bg-primary">
                    <Reply className="h-4 w-4 mr-2" />
                    Répondre
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => toggleArchive(selectedMessage)}>
                      {selectedMessage.is_archived ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Restaurer
                        </>
                      ) : (
                        <>
                          <Archive className="h-4 w-4 mr-2" />
                          Archiver
                        </>
                      )}
                    </Button>
                    <Button variant="destructive" onClick={() => deleteMessage(selectedMessage.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
