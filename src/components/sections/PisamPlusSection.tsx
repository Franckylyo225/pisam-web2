import { Button } from "@/components/ui/button";
import { ArrowUpRight, CreditCard, Users } from "lucide-react";
import pisamPlusImage from "@/assets/hero-slide-pisam-plus.jpg";

const PisamPlusSection = () => {
  return (
    <section id="pisam-plus" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Card Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Decorative crosses */}
              <div className="absolute top-6 left-6 text-pisam-green text-3xl font-bold">+</div>
              <div className="absolute bottom-20 left-12 text-primary text-2xl font-bold">+</div>
              <div className="absolute top-1/3 right-8 text-pisam-gold/50 text-xl">+</div>
              
              {/* Title */}
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">
                  LA CARTE <span className="text-pisam-teal">PISAM</span>
                  <span className="text-pisam-green align-super text-lg ml-1">Plus</span>
                </h3>
                <p className="text-muted-foreground mt-2">Santé, technologie et paix d'esprit.</p>
              </div>

              {/* Card image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-pisam-lg">
                <img
                  src={pisamPlusImage}
                  alt="Carte PISAM Plus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative blur elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-pisam-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Right - Content */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-pisam-green rounded-full" />
              <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                MA CARTE PISAM +
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
              Avantages, Privilèges et Réductions... Et ce n'est pas tout !
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              La carte PISAM PLUS est un dossier médical détaillé et complet sous forme de carte compacte. 
              Elle contient toutes les informations santé d'un patient depuis sa première consultation à la PISAM.
            </p>

            {/* Users count */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-pisam-teal flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                  <Users className="h-4 w-4" />
                </div>
                <div className="w-10 h-10 rounded-full bg-pisam-green flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                  P
                </div>
                <div className="w-10 h-10 rounded-full bg-pisam-turquoise flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                  +
                </div>
              </div>
              <div>
                <div className="font-bold text-foreground">+2000</div>
                <div className="text-sm text-muted-foreground">Patients l'utilisent pour leurs soins</div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-pisam-green hover:bg-pisam-green/90 text-white font-semibold group"
            >
              <CreditCard className="h-5 w-5" />
              Commander ma Carte
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PisamPlusSection;
