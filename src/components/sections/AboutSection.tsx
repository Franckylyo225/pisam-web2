import { CheckCircle2, Award, Users, Clock, Building2, Stethoscope, FlaskConical, Siren, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
    <section id="apropos" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Hero style section with overlapping card */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          {/* Background image */}
          <div className="aspect-[16/9] md:aspect-[21/9] w-full">
            <img
              src={pisamAerialView}
              alt="Vue aérienne de la PISAM - Polyclinique Internationale Sainte Anne-Marie"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlapping card */}
          <div className="absolute inset-0 flex items-center">
            <div className="bg-gradient-to-br from-primary to-secondary p-8 md:p-12 rounded-2xl md:rounded-3xl text-white max-w-xl ml-4 md:ml-12 lg:ml-16 shadow-2xl">
              <span className="text-white/80 text-sm font-medium tracking-widest uppercase mb-4 block">
                Qui sommes nous
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">
                Polyclinique Internationale Sainte Anne-Marie (PISAM)
              </h2>
              <p className="text-white/90 text-sm md:text-base mb-6 leading-relaxed">
                La Polyclinique Internationale Sainte Anne-Marie (PISAM) est un établissement hospitalier pluridisciplinaire, leader dans le secteur privé de la santé en Côte d'Ivoire et dans la sous-région depuis plus de 30 ans.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-primary text-sm font-medium">Plateau technique moderne</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-primary text-sm font-medium">Bloc opératoire aux normes</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-primary text-sm font-medium">Laboratoire accrédité</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                  <Siren className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-primary text-sm font-medium">Urgences 24h/24</span>
                </div>
              </div>
              
              <Link to="/pisam">
                <Button variant="outline" className="bg-white text-primary hover:bg-white/90 border-white font-medium group">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Description */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
              L'excellence médicale au cœur d'Abidjan
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Notre mission est d'offrir à chaque patient des soins personnalisés de qualité 
              internationale, dans un environnement moderne et accueillant. Nous combinons 
              expertise médicale, technologie de pointe et humanité pour garantir votre bien-être.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Fondée il y a plus de 30 ans, la PISAM est devenue une référence en matière de 
              soins de santé en Côte d'Ivoire et dans la sous-région ouest-africaine.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-pisam-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
