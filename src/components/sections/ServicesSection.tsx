import { useState } from "react";
import { 
  Heart, 
  Baby, 
  Brain, 
  Bone, 
  Eye, 
  Stethoscope, 
  Microscope,
  Syringe,
  Activity,
  Scan,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Heart,
    title: "Cardiologie",
    description: "Diagnostic et traitement des maladies cardiovasculaires avec équipements de pointe.",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    icon: Baby,
    title: "Pédiatrie & Néonatologie",
    description: "Soins spécialisés pour les nourrissons, enfants et adolescents.",
    color: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    icon: Stethoscope,
    title: "Gynécologie-Obstétrique",
    description: "Suivi de grossesse, accouchement et santé reproductive de la femme.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Brain,
    title: "Neurologie",
    description: "Prise en charge des troubles du système nerveux central et périphérique.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Bone,
    title: "Orthopédie & Traumatologie",
    description: "Chirurgie osseuse, articulaire et traitement des fractures.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Eye,
    title: "Ophtalmologie",
    description: "Soins complets de la vision, chirurgie de la cataracte et du glaucome.",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    icon: Scan,
    title: "Imagerie Médicale",
    description: "Scanner, IRM, échographie et radiologie numérique de dernière génération.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Microscope,
    title: "Laboratoire d'Analyses",
    description: "Analyses biologiques complètes avec résultats rapides et fiables.",
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    icon: Syringe,
    title: "Chirurgie Générale",
    description: "Interventions chirurgicales programmées et d'urgence par des experts.",
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    icon: Activity,
    title: "Urgences 24h/24",
    description: "Service d'urgences médicales et chirurgicales disponible en permanence.",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
];

const ServicesSection = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section id="services" className="py-24 bg-muted/30">
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

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group bg-card rounded-2xl p-6 shadow-pisam hover:shadow-pisam-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 ${
                !showAllMobile && index >= 4 ? 'hidden md:block' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile show more button */}
        <div className="text-center mb-8 md:hidden">
          <Button 
            variant="outline" 
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="group"
          >
            {showAllMobile ? (
              <>
                Voir moins
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Voir les {services.length - 4} autres spécialités
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg" className="group">
            Voir tous nos services
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
