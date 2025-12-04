import { Award, Users, Clock, Building2, Stethoscope, FlaskConical, Siren, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import pisamAerialView from "@/assets/pisam-aerial-view.jpg";

const stats = [
  { icon: Users, value: 150, label: "Professionnels de santé", prefix: "+" },
  { icon: Award, value: 50, label: "Spécialités médicales et chirurgicales", prefix: "+" },
  { icon: Building2, value: 300, label: "Lits d'hospitalisation", prefix: "+" },
  { icon: Clock, value: 30, label: "Années d'excellence", prefix: "+" },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const { ref, displayValue, isVisible } = useCounterAnimation({
    end: stat.value,
    duration: 2000,
    prefix: stat.prefix,
  });

  return (
    <div
      ref={ref}
      className={`text-center p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <stat.icon className="h-7 w-7 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{displayValue}</div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="apropos" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Mobile layout */}
        <div className="md:hidden mb-12">
          {/* Image at top on mobile */}
          <div className="rounded-2xl overflow-hidden mb-6">
            <img
              src={pisamAerialView}
              alt="Vue aérienne de la PISAM - Polyclinique Internationale Sainte Anne-Marie"
              className="w-full h-48 object-cover"
            />
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
                <Stethoscope className="h-5 w-5 text-white/80 flex-shrink-0" />
                <span className="text-white text-sm">Bloc opératoire aux normes</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-white/80 flex-shrink-0" />
                <span className="text-white text-sm">Laboratoire accrédité</span>
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
            <img
              src={pisamAerialView}
              alt="Vue aérienne de la PISAM - Polyclinique Internationale Sainte Anne-Marie"
              className="w-full h-full object-cover"
            />
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
                La Polyclinique Internationale Sainte Anne-Marie (PISAM) est un établissement hospitalier pluridisciplinaire, leader dans le secteur privé de la santé en Côte d'Ivoire et dans la sous-région depuis plus de 30 ans.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Plateau technique moderne</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Bloc opératoire aux normes</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-sm">Laboratoire accrédité</span>
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

        {/* Stats row - full width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
