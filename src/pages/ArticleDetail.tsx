import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: relatedArticles } = useQuery({
    queryKey: ['related-articles', article?.category, article?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, image_url, published_at')
        .eq('is_published', true)
        .eq('category', article?.category)
        .neq('id', article?.id)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: !!article?.category && !!article?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-64 mb-8" />
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta_title || article.title,
    "description": article.meta_description || article.excerpt,
    "image": article.image_url,
    "datePublished": article.published_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Organization",
      "name": "PISAM"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PISAM - Polyclinique Internationale Sainte Anne-Marie",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pisam.ci/logo-pisam.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pisam.ci/blog/${article.slug}`
    },
    "keywords": article.keywords?.join(", ")
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.meta_title || article.title} | PISAM</title>
        <meta name="description" content={article.meta_description || article.excerpt || ''} />
        <meta name="keywords" content={article.keywords?.join(", ") || ''} />
        <link rel="canonical" href={`https://pisam.ci/blog/${article.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.meta_title || article.title} />
        <meta property="og:description" content={article.meta_description || article.excerpt || ''} />
        <meta property="og:image" content={article.image_url || ''} />
        <meta property="og:url" content={`https://pisam.ci/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.published_at || ''} />
        <meta property="article:modified_time" content={article.updated_at} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.meta_title || article.title} />
        <meta name="twitter:description" content={article.meta_description || article.excerpt || ''} />
        <meta name="twitter:image" content={article.image_url || ''} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />
      
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb & Back */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
          </div>

          {/* Header */}
          <header className="mb-8">
            {article.category && (
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                {article.category}
              </Badge>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {article.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {article.published_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.published_at}>
                    {format(new Date(article.published_at), "d MMMM yyyy", { locale: fr })}
                  </time>
                </div>
              )}
              {article.reading_time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.reading_time} min de lecture</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>PISAM</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none 
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:mb-2
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          {/* Keywords */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Mots-clés :</h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 max-w-6xl mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {related.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.image_url}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.published_at && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {format(new Date(related.published_at), "d MMMM yyyy", { locale: fr })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
