import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aminata Coulibaly",
    role: "Patiente en cardiologie",
    content: "L'équipe de cardiologie de PISAM m'a sauvé la vie. Leur professionnalisme et leur humanité m'ont accompagnée tout au long de mon traitement. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Jean-Baptiste Konan",
    role: "Patient en chirurgie",
    content: "Une expérience exceptionnelle. De l'accueil à la sortie, tout était parfaitement organisé. Les médecins et infirmiers sont vraiment à l'écoute.",
    rating: 5,
  },
  {
    name: "Fatou Diarra",
    role: "Future maman",
    content: "J'ai accouché à PISAM et je ne regrette pas mon choix. L'équipe de maternité est formidable, attentive et rassurante. Mon bébé et moi avons été très bien pris en charge.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="temoignages" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pisam-turquoise/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Ce que disent nos patients
          </h2>
          <p className="text-lg text-muted-foreground">
            La satisfaction de nos patients est notre plus grande fierté. 
            Découvrez leurs expériences à PISAM.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-8 shadow-pisam hover:shadow-pisam-lg transition-all duration-300 border border-border/50 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Quote className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-pisam-gold text-pisam-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted rounded-full">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-background"
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">+500 000</span> patients satisfaits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
