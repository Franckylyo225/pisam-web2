import { CheckCircle2, Award, Users, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import pisamAerialView from "@/assets/pisam-aerial-view.jpg";

const features = [
  "Plus de 150 médecins spécialistes qualifiés",
  "Équipements médicaux de dernière génération",
  "Plateau technique moderne et complet",
  "Bloc opératoire aux normes internationales",
  "Laboratoire d'analyses accrédité",
  "Service d'urgences disponible 24h/24",
];

const stats = [
  { icon: Users, value: "+150", label: "Professionnels de santé" },
  { icon: Award, value: "+50", label: "Spécialités médicales et chirurgicales" },
  { icon: Building2, value: "+300", label: "Lits d'hospitalisation" },
  { icon: Clock, value: "+30", label: "Années d'excellence" },
];

const AboutSection = () => {
  return (
    <section id="apropos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content - Image composition */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main image */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-pisam-lg">
                <img
                  src={pisamAerialView}
                  alt="Vue aérienne de la PISAM - Polyclinique Internationale Sainte Anne-Marie"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -bottom-8 -right-8 bg-card rounded-2xl p-6 shadow-pisam-lg border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-pisam-green/10 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-pisam-green" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">+300</div>
                    <div className="text-sm text-muted-foreground">lits d'hospitalisation</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 left-1/4 w-48 h-48 bg-pisam-turquoise/10 rounded-full blur-3xl" />
          </div>

          {/* Right content */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              À Propos de PISAM
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              L'excellence médicale au cœur d'Abidjan
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Fondée il y a plus de 30 ans, la Polyclinique Internationale Sainte Anne-Marie 
              (PISAM) est devenue une référence en matière de soins de santé en Côte d'Ivoire 
              et dans la sous-région ouest-africaine.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Notre mission est d'offrir à chaque patient des soins personnalisés de qualité 
              internationale, dans un environnement moderne et accueillant. Nous combinons 
              expertise médicale, technologie de pointe et humanité pour garantir votre bien-être.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-pisam-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg">
              Découvrir notre histoire
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 bg-muted/50 rounded-2xl border border-border/50"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
