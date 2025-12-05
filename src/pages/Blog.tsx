import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowUpRight, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  published_at: string | null;
  reading_time: number | null;
}

const categories = [
  { id: "all", label: "Tous" },
  { id: "Actualités", label: "Actualités" },
  { id: "Santé", label: "Santé" },
  { id: "Innovation", label: "Innovation" },
  { id: "Événements", label: "Événements" },
  { id: "Conseils", label: "Conseils" },
];

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, image_url, category, published_at, reading_time')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (data) {
        setArticles(data as Article[]);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog & Actualités | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta 
          name="description" 
          content="Découvrez les dernières actualités, événements et conseils santé de la PISAM. Restez informé sur nos innovations et services médicaux." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary via-pisam-teal to-pisam-turquoise py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                  Blog & Actualités
                </h1>
                <p className="text-lg md:text-xl text-white/85">
                  Restez informé des dernières nouvelles, événements et conseils santé de la PISAM
                </p>
              </div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="py-8 border-b border-border bg-card sticky top-0 z-40">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className="rounded-full"
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    Aucun article trouvé pour cette recherche.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-8">
                    {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""} trouvé{filteredArticles.length > 1 ? "s" : ""}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                      <article
                        key={article.id}
                        className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-pisam-lg transition-all duration-300"
                      >
                        {/* Image */}
                        {article.image_url && (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {article.category && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                  {article.category}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                          {!article.image_url && article.category && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                              {article.category}
                            </span>
                          )}

                          {/* Title */}
                          <h2 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h2>

                          {/* Excerpt */}
                          {article.excerpt && (
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {article.excerpt}
                            </p>
                          )}

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            {article.published_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(article.published_at), 'dd MMM yyyy', { locale: fr })}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.reading_time || 3} min</span>
                            </div>
                          </div>

                          {/* Read more link */}
                          <Link
                            to={`/blog/${article.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                          >
                            Lire l'article
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
