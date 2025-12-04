import { Button } from "@/components/ui/button";
import { ArrowRight, HeartPulse, Shield, Calendar } from "lucide-react";

const HealthCheckCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-pisam-teal via-primary to-pisam-turquoise relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <HeartPulse className="h-8 w-8 text-white" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6">
            <Shield className="h-4 w-4" />
            <span>Prévention Santé</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            Bilan de Santé
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            Prenez soin de votre santé avant qu'elle ne vous le rappelle.
          </p>
          <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">
            Faire un bilan, c'est prendre une longueur d'avance sur les problèmes de santé.
          </p>

          {/* CTA Button */}
          <Button 
            size="xl" 
            className="bg-white text-primary hover:bg-white/95 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Calendar className="h-5 w-5" />
            Prendre rendez-vous pour un bilan
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HealthCheckCTA;
