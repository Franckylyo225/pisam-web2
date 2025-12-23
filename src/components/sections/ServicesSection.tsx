import { 
  HeartPulse, 
  Baby, 
  Stethoscope, 
  Bone, 
  Stethoscope as GastroIcon, 
  Scan,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: HeartPulse,
    title: "Cardiologie",
    description: "Diagnostic et traitement des maladies cardiovasculaires avec équipements de pointe.",
  },
  {
    icon: Baby,
    title: "Pédiatrie & Néonatologie",
    description: "Soins spécialisés pour les nourrissons, enfants et adolescents.",
  },
  {
    icon: Stethoscope,
    title: "Gynécologie-Obstétrique",
    description: "Suivi de grossesse, accouchement et santé reproductive de la femme.",
  },
  {
    icon: Bone,
    title: "Orthopédie & Traumatologie",
    description: "Chirurgie osseuse, articulaire et traitement des fractures.",
  },
  {
    icon: GastroIcon,
    title: "Gastro-entérologie",
    description: "Diagnostic et traitement des maladies de l'appareil digestif.",
  },
  {
    icon: Scan,
    title: "Imagerie Médicale",
    description: "Scanner, IRM, échographie et radiologie numérique de dernière génération.",
  },
];

// Checkerboard colors using brand palette
const checkerboardColors = [
  "bg-primary", // teal
  "bg-pisam-turquoise-light", // turquoise light - Pédiatrie
  "bg-pisam-green", // green
  "bg-pisam-turquoise-light", // turquoise light - Orthopédie
  "bg-pisam-green", // green
  "bg-primary", // teal
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nos Spécialités
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Des soins complets pour toute la famille
          </h2>
          <p className="text-lg text-muted-foreground">
            PISAM propose plus de 50 spécialités médicales et chirurgicales pour 
            répondre à tous vos besoins de santé, avec une équipe de spécialistes renommés.
          </p>
        </div>

        {/* Services grid - Checkerboard pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative p-8 lg:p-10 rounded-2xl ${checkerboardColors[index]} transition-all duration-300 hover:brightness-110 hover:-translate-y-1 shadow-lg`}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                <service.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <h3 className="font-serif font-bold text-xl text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg" className="group" asChild>
            <Link to="/medecins">
              Tout parcourir
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
