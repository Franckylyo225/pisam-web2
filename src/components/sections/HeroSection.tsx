import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar, Shield, Award } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-pisam-turquoise/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pisam-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-background/5 rounded-full blur-2xl" />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 20 L30 40 M20 30 L40 30" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full text-sm mb-6 animate-fade-up">
              <Shield className="h-4 w-4" />
              <span>Excellence médicale depuis plus de 30 ans</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-up stagger-1">
              Votre santé,<br />
              <span className="text-pisam-turquoise">notre priorité</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-up stagger-2">
              La Polyclinique Internationale Sainte Anne-Marie vous offre des soins 
              de qualité internationale, avec une équipe médicale d'excellence 
              au cœur d'Abidjan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up stagger-3">
              <Button variant="hero-outline" size="xl" className="group">
                <Calendar className="h-5 w-5" />
                Prendre Rendez-vous
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="hero" size="xl" className="bg-background text-primary hover:bg-background/90">
                <Phone className="h-5 w-5" />
                +225 27 22 44 53 53
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8 animate-fade-up stagger-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">Certifié</div>
                  <div className="text-sm text-primary-foreground/70">ISO 9001</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                  <span className="text-xl font-bold">24</span>
                </div>
                <div>
                  <div className="font-semibold">Urgences</div>
                  <div className="text-sm text-primary-foreground/70">24h/24 - 7j/7</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                  <span className="text-xl font-bold">50+</span>
                </div>
                <div>
                  <div className="font-semibold">Spécialités</div>
                  <div className="text-sm text-primary-foreground/70">Médicales</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Stats cards */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main card */}
              <div className="bg-background/10 backdrop-blur-md rounded-3xl p-8 border border-background/20 shadow-2xl animate-fade-up stagger-2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-background/10 rounded-2xl">
                    <div className="text-4xl font-bold text-background mb-2">30+</div>
                    <div className="text-background/70 text-sm">Années d'expérience</div>
                  </div>
                  <div className="text-center p-6 bg-background/10 rounded-2xl">
                    <div className="text-4xl font-bold text-background mb-2">150+</div>
                    <div className="text-background/70 text-sm">Médecins spécialistes</div>
                  </div>
                  <div className="text-center p-6 bg-background/10 rounded-2xl">
                    <div className="text-4xl font-bold text-background mb-2">500K+</div>
                    <div className="text-background/70 text-sm">Patients soignés</div>
                  </div>
                  <div className="text-center p-6 bg-background/10 rounded-2xl">
                    <div className="text-4xl font-bold text-background mb-2">98%</div>
                    <div className="text-background/70 text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-pisam-green text-background px-6 py-3 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-background rounded-full animate-pulse" />
                  <span className="font-semibold">Urgences ouvertes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
