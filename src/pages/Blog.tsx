import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "Tous" },
  { id: "innovation", label: "Innovation" },
  { id: "evenement", label: "Événement" },
  { id: "actualite", label: "Actualité" },
  { id: "sante", label: "Santé" },
  { id: "prevention", label: "Prévention" },
];

const allArticles = [
  {
    id: 1,
    title: "Nouvelle unité de cardiologie interventionnelle à la PISAM",
    excerpt: "La PISAM inaugure son nouveau service de cardiologie interventionnelle équipé des dernières technologies pour une prise en charge optimale des patients cardiaques.",
    category: "innovation",
    categoryLabel: "Innovation",
    date: "28 Nov 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Campagne de dépistage gratuit du diabète",
    excerpt: "Dans le cadre de la Journée Mondiale du Diabète, la PISAM organise une campagne de dépistage gratuit pour sensibiliser la population aux risques de cette maladie.",
    category: "evenement",
    categoryLabel: "Événement",
    date: "14 Nov 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "La PISAM certifiée ISO 9001 pour la qualité de ses services",
    excerpt: "Notre établissement obtient la certification ISO 9001, reconnaissant l'excellence de notre système de management de la qualité et notre engagement envers les patients.",
    category: "actualite",
    categoryLabel: "Actualité",
    date: "05 Nov 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Nouveau scanner haute définition pour des diagnostics précis",
    excerpt: "La PISAM s'équipe d'un scanner de dernière génération permettant des examens plus rapides et des images d'une qualité exceptionnelle.",
    category: "innovation",
    categoryLabel: "Innovation",
    date: "25 Oct 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Journée portes ouvertes à la maternité PISAM",
    excerpt: "Venez découvrir notre maternité rénovée et rencontrer notre équipe de gynécologues-obstétriciens lors de notre journée portes ouvertes.",
    category: "evenement",
    categoryLabel: "Événement",
    date: "18 Oct 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Conseils pour renforcer votre système immunitaire",
    excerpt: "Nos médecins partagent leurs recommandations pour maintenir un système immunitaire fort, particulièrement pendant la saison des pluies.",
    category: "sante",
    categoryLabel: "Santé",
    date: "10 Oct 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "L'importance du dépistage précoce du cancer",
    excerpt: "Le dépistage précoce peut sauver des vies. Découvrez les examens recommandés selon votre âge et vos facteurs de risque.",
    category: "prevention",
    categoryLabel: "Prévention",
    date: "01 Oct 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Partenariat avec l'Université de médecine d'Abidjan",
    excerpt: "La PISAM signe un accord de partenariat avec l'Université de médecine pour la formation des futurs professionnels de santé.",
    category: "actualite",
    categoryLabel: "Actualité",
    date: "22 Sep 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Vaccination antigrippale : protégez-vous et vos proches",
    excerpt: "La campagne de vaccination contre la grippe est lancée. Venez vous faire vacciner dans notre centre de vaccination.",
    category: "prevention",
    categoryLabel: "Prévention",
    date: "15 Sep 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=600&h=400&fit=crop",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
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
              {filteredArticles.length === 0 ? (
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
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                              {article.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Title */}
                          <h2 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>

                          {/* Read more link */}
                          <a
                            href="#"
                            className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                          >
                            Lire l'article
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
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
