import { Monitor, Building, Lightbulb, Award, Users, Sparkles } from "lucide-react";
import labScientist from "@/assets/pisam2-sih.jpg";

const features = [
  {
    icon: Monitor,
    title: "SIH Novateur",
    description: "L'informatisation des procédures de travail. Un gain de temps. Un suivi des patients plus fiable et plus rapide.",
  },
  {
    icon: Building,
    title: "Rénovations",
    description: "L'accroissement de la capacité d'accueil. La réhabilitation complète du bâtiment avec de nouveaux services.",
  },
  {
    icon: Lightbulb,
    title: "Plateau technique performant",
    description: "Des blocs opératoires aux standards internationaux. Un service d'imagerie rénové. Un service de réanimation agrandi et équipé.",
  },
  {
    icon: Award,
    title: "Personnel compétent",
    description: "La formation continue du personnel. Des conventions de partenariat avec de grandes institutions hospitalières.",
  },
];

const Pisam2Section = () => {
  return (
    <section id="pisam2" className="relative overflow-hidden">
      {/* Header with background image */}
      <div className="relative py-24 md:py-32">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${labScientist})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/60" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-pisam-turquoise/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-pisam-turquoise" />
            <span className="text-pisam-turquoise font-medium text-sm uppercase tracking-wider">PISAM 2.0</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white max-w-2xl leading-tight">
            Un pôle innovant, dynamique et révolutionnaire.
          </h2>
        </div>
      </div>

      {/* Features grid */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex gap-5 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-white/80" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/75 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pisam2Section;
