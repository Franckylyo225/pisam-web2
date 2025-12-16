import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const ContactSection = () => {
  return <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Emergency banner */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
              <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-foreground">Service d'Urgences 24h/24</h3>
              <p className="text-muted-foreground">Équipe médicale disponible en permanence pour toute urgence</p>
            </div>
          </div>
          <Button variant="emergency" size="lg" asChild>
            <a href="tel:+22527224453 53">
              <Phone className="h-5 w-5" />
              +225 27 22 44 53 53
            </a>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Contactez-nous
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Informations de contact
          </h2>
        </div>

        {/* Contact Info Cards - 4 column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
            <p className="text-muted-foreground text-sm">
              Abidjan, Cocody, Rue Cannebière,
Av. Joseph Blohorn,
            <br />
              Côte d'Ivoire
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
            <p className="text-muted-foreground text-sm">
              Standard: +225 27 22 44 53 53<br />
              Urgences: +225 07 07 07 07 07
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">
              contact@pisam.ci<br />
              rdv@pisam.ci
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Horaires</h3>
            <p className="text-muted-foreground text-sm">
              Lun - Ven: 7h30 - 18h00<br />
              Sam: 8h00 - 13h00<br />
              <span className="text-pisam-green font-medium">Urgences: 24h/24</span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;