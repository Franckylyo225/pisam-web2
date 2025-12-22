import { Award, Users, Clock, Building2, Plane, BadgeCheck, Siren, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import pisamAerialView from "@/assets/pisam-aerial-view.jpg";
const stats = [{
  icon: Clock,
  value: 40,
  label: "Années d'excellence",
  prefix: "+"
}, {
  icon: Award,
  value: 40,
  label: "Spécialités médicales",
  prefix: "+"
}, {
  icon: Users,
  value: 200,
  label: "Professionnels de santé",
  prefix: "+"
}, {
  icon: Building2,
  value: 150,
  label: "Lits d'hospitalisation",
  prefix: "+"
}];
const statColors = ["bg-primary", "bg-pisam-turquoise-light", "bg-pisam-green", "bg-pisam-gold"];
const StatCard = ({
  stat,
  index
}: {
  stat: typeof stats[0];
  index: number;
}) => {
  const {
    ref,
    displayValue,
    isVisible
  } = useCounterAnimation({
    end: stat.value,
    duration: 2000,
    prefix: stat.prefix
  });
  return <div ref={ref} className={`text-center p-6 md:p-8 ${statColors[index]} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{
    animationDelay: `${index * 100}ms`,
    animationFillMode: 'both'
  }}>
      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
        <stat.icon className="h-8 w-8 text-white" />
      </div>
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{displayValue}</div>
      <div className="text-sm md:text-base text-white/90 font-medium">{stat.label}</div>
    </div>;
};
const AboutSection = () => {
  return <section id="apropos" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Mobile layout */}
        <div className="md:hidden mb-12">
          {/* Image at top on mobile */}
          <div className="rounded-2xl overflow-hidden mb-6">
            <img src={pisamAerialView} alt="Vue aérienne de la PISAM - Polyclinique Internationale Sainte Anne-Marie" className="w-full h-48 object-cover" />
          </div>
          
          {/* Card below on mobile */}
          <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-2xl text-white shadow-xl">
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase mb-3 block">
              Qui sommes nous
            </span>
            <h2 className="text-2xl font-serif font-bold mb-4 leading-tight">
              Polyclinique Internationale Sainte Anne-Marie (PISAM)
            </h2>
            <p className="text-white/90 text-sm mb-5 leading-relaxed">
              La Polyclinique Internationale Sainte Anne-Marie (PISAM) est un établissement hospitalier pluridisciplinaire, leader dans le secteur privé de la santé en Côte d'Ivoire et dans la sous-région depuis plus de 30 ans.
            </p>
            <div className="grid grid-cols-1 gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-white/80 flex-shrink-0" />
                <span className="text-white text-sm">Plateau technique moderne</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-white/80 flex-shrink-0" />
                <span className="text-white text-sm">Héliport certifié</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-white/80 flex-shrink-0" />
                <span className="text-white text-sm">Etablissement Certifié ISO 9001</span>
              </div>
              <div className="flex items-center gap-2">
                <Siren className="h-5 w-5 text-white/80 flex-shrink-0" />
                <span className="text-white text-sm">Urgences 24h/24</span>
              </div>
            </div>
            
            <Link to="/pisam">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90 border-white font-medium group w-full">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop layout with overlapping card */}
        <div className="relative rounded-3xl overflow-hidden mb-16 hidden md:block">
          {/* Background image */}
          <div className="aspect-[21/9] w-full">
            <img src={pisamAerialView} alt="Vue aérienne de la PISAM - Polyclinique Internationale Sainte Anne-Marie" className="w-full h-full object-cover" />
          </div>
          
          {/* Overlapping card */}
          <div className="absolute inset-0 flex items-center">
            <div className="bg-gradient-to-br from-primary to-secondary p-8 md:p-12 rounded-3xl text-white max-w-xl ml-12 lg:ml-16 shadow-2xl">
              <span className="text-white/80 text-sm font-medium tracking-widest uppercase mb-4 block">
                Qui sommes nous
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">
                Polyclinique Internationale Sainte Anne-Marie (PISAM)
              </h2>
              <p className="text-white/90 text-base mb-6 leading-relaxed">
                La Polyclinique Internationale Sainte Anne-Marie (PISAM) est un établissement hospitalier pluridisciplinaire, leader dans le secteur privé de la santé en Côte d'Ivoire et dans la sous-région depuis plus de 40 ans.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Plateau technique moderne</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Héliport certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Etablissement Certifié ISO 9001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Siren className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Urgences 24h/24</span>
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

        {/* Stats section with title */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Quelques chiffres clés
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pisam-turquoise mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => <StatCard key={stat.label} stat={stat} index={index} />)}
        </div>
      </div>
    </section>;
};
export default AboutSection;