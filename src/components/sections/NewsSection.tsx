import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, ArrowUpRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Nouvelle unité de cardiologie interventionnelle à la PISAM",
    excerpt: "La PISAM inaugure son nouveau service de cardiologie interventionnelle équipé des dernières technologies pour une prise en charge optimale des patients cardiaques.",
    category: "Innovation",
    date: "28 Nov 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Campagne de dépistage gratuit du diabète",
    excerpt: "Dans le cadre de la Journée Mondiale du Diabète, la PISAM organise une campagne de dépistage gratuit pour sensibiliser la population aux risques de cette maladie.",
    category: "Événement",
    date: "14 Nov 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "La PISAM certifiée ISO 9001 pour la qualité de ses services",
    excerpt: "Notre établissement obtient la certification ISO 9001, reconnaissant l'excellence de notre système de management de la qualité et notre engagement envers les patients.",
    category: "Actualité",
    date: "05 Nov 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
  },
];

const NewsSection = () => {
  return (
    <section id="actualites" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Actualités
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Nos dernières nouvelles
            </h2>
          </div>
          <Button variant="outline" size="lg" className="group self-start md:self-auto">
            Voir tout le blog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
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
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

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
      </div>
    </section>
  );
};

export default NewsSection;
