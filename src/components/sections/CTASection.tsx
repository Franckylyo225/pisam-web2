import { Calendar, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ctaBackground from "@/assets/cta-nurse-patient.png";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={ctaBackground}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/70" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Prenez soin de votre santé dès aujourd'hui
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Ne remettez pas votre santé à demain. Notre équipe médicale est prête 
            à vous accueillir et à vous offrir les meilleurs soins.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero-outline" size="xl" className="group min-w-64" asChild>
              <Link to="/bilan-sante">
                <Calendar className="h-5 w-5" />
                Prendre Rendez-vous en ligne
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="hero" size="xl" className="bg-background text-primary hover:bg-background/90 min-w-64">
              <Phone className="h-5 w-5" />
              Appeler maintenant
            </Button>
          </div>

          {/* Additional info */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pisam-green rounded-full" />
              <span>Réponse sous 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pisam-green rounded-full" />
              <span>Consultation le jour même possible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pisam-green rounded-full" />
              <span>Prise en charge assurance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
