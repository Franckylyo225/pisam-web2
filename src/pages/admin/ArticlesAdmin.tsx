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
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { SEOScoreCard } from '@/components/admin/SEOScoreCard';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { KeywordsInput } from '@/components/admin/KeywordsInput';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string[] | null;
  reading_time?: number | null;
}

const CATEGORIES = ['Actualités', 'Santé', 'Innovation', 'Événements', 'Conseils'];

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    is_published: false,
    meta_title: '',
    meta_description: '',
    keywords: [] as string[],
  });

  const fetchData = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data as Article[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const calculateReadingTime = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      slug: '', 
      excerpt: '', 
      content: '', 
      image_url: '', 
      category: '', 
      is_published: false,
      meta_title: '',
      meta_description: '',
      keywords: [],
    });
    setEditingArticle(null);
  };

  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content || '',
      image_url: article.image_url || '',
      category: article.category || '',
      is_published: article.is_published,
      meta_title: article.meta_title || '',
      meta_description: article.meta_description || '',
      keywords: article.keywords || [],
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = formData.slug || generateSlug(formData.title);
    const readingTime = calculateReadingTime(formData.content);

    const data = {
      title: formData.title,
      slug,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      image_url: formData.image_url || null,
      category: formData.category || null,
      is_published: formData.is_published,
      published_at: formData.is_published ? new Date().toISOString() : null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      keywords: formData.keywords.length > 0 ? formData.keywords : null,
      reading_time: readingTime,
    };

    let error;
    if (editingArticle) {
      const res = await supabase.from('articles').update(data as any).eq('id', editingArticle.id);
      error = res.error;
    } else {
      const res = await supabase.from('articles').insert(data as any);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      toast.error(error.message.includes('duplicate') ? 'Ce slug existe déjà' : 'Erreur lors de la sauvegarde');
      return;
    }

    toast.success(editingArticle ? 'Article modifié' : 'Article créé');
    setDialogOpen(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      toast.error('Erreur lors de la suppression');
      return;
    }

    toast.success('Article supprimé');
    fetchData();
  };

  const togglePublish = async (article: Article) => {
    const { error } = await supabase
      .from('articles')
      .update({ 
        is_published: !article.is_published,
        published_at: !article.is_published ? new Date().toISOString() : null
      })
      .eq('id', article.id);

    if (error) {
      toast.error('Erreur');
      return;
    }

    toast.success(article.is_published ? 'Article dépublié' : 'Article publié');
    fetchData();
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground">Gérer les actualités et articles du blog</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Nouvel article</Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main content - 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                  <Tabs defaultValue="content">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content">Contenu</TabsTrigger>
                      <TabsTrigger value="seo">SEO</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titre de l'article *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => {
                            setFormData(prev => ({ 
                              ...prev, 
                              title: e.target.value,
                              slug: prev.slug || generateSlug(e.target.value),
                              meta_title: prev.meta_title || e.target.value.slice(0, 60),
                            }));
                          }}
                          placeholder="Titre accrocheur pour votre article"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Extrait / Résumé</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => {
                            setFormData(prev => ({ 
                              ...prev, 
                              excerpt: e.target.value,
                              meta_description: prev.meta_description || e.target.value.slice(0, 160),
                            }));
                          }}
                          rows={2}
                          placeholder="Court résumé qui apparaîtra dans les aperçus..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Contenu de l'article</Label>
                        <RichTextEditor
                          content={formData.content}
                          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                          placeholder="Rédigez votre article ici..."
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meta_title">
                          Titre SEO (Meta Title)
                          <span className="text-xs text-muted-foreground ml-2">
                            {formData.meta_title.length}/60
                          </span>
                        </Label>
                        <Input
                          id="meta_title"
                          value={formData.meta_title}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                          placeholder="Titre optimisé pour les moteurs de recherche"
                          maxLength={70}
                        />
                        <p className="text-xs text-muted-foreground">
                          Idéalement entre 30 et 60 caractères
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meta_description">
                          Description SEO (Meta Description)
                          <span className="text-xs text-muted-foreground ml-2">
                            {formData.meta_description.length}/160
                          </span>
                        </Label>
                        <Textarea
                          id="meta_description"
                          value={formData.meta_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                          placeholder="Description qui apparaîtra dans les résultats de recherche"
                          rows={3}
                          maxLength={170}
                        />
                        <p className="text-xs text-muted-foreground">
                          Idéalement entre 120 et 160 caractères
                        </p>
                      </div>

                      <KeywordsInput
                        value={formData.keywords}
                        onChange={(keywords) => setFormData(prev => ({ ...prev, keywords }))}
                      />

                      <div className="space-y-2">
                        <Label htmlFor="slug">URL de l'article (slug)</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">/blog/</span>
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="mon-article"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <ImageUploader
                        value={formData.image_url}
                        onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                      />

                      <div className="flex items-center justify-between pt-2 border-t">
                        <Label htmlFor="publish">Publier maintenant</Label>
                        <Switch
                          id="publish"
                          checked={formData.is_published}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <SEOScoreCard
                    title={formData.title}
                    metaTitle={formData.meta_title}
                    metaDescription={formData.meta_description}
                    content={formData.content}
                    keywords={formData.keywords}
                    imageUrl={formData.image_url}
                  />

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                      Annuler
                    </Button>
                    <Button type="submit" disabled={saving} className="flex-1">
                      {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      {editingArticle ? 'Modifier' : 'Créer'}
                    </Button>
                  </div>
                </div>
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
                <TableHead>Article</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucun article
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {article.image_url && (
                          <img 
                            src={article.image_url} 
                            alt="" 
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium line-clamp-1">{article.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {article.reading_time || 1} min de lecture
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{article.category || '-'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(article.created_at), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${article.is_published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {article.is_published ? 'Publié' : 'Brouillon'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => togglePublish(article)} title={article.is_published ? 'Dépublier' : 'Publier'}>
                        {article.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
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
