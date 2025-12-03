import { Phone, Mail, MapPin, Clock, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
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
          <Button variant="emergency" size="lg">
            <Phone className="h-5 w-5" />
            +225 07 07 07 07 07
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Contactez-nous
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Prenez rendez-vous ou posez-nous vos questions
            </h2>
            <p className="text-muted-foreground mb-8">
              Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom complet
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Votre nom"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="+225 XX XX XX XX XX"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input 
                  type="email" 
                  placeholder="votre@email.com"
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service concerné
                </label>
                <select className="w-full h-12 rounded-xl border border-input bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Sélectionnez un service</option>
                  <option value="rdv">Prise de rendez-vous</option>
                  <option value="info">Demande d'information</option>
                  <option value="resultat">Résultats d'analyses</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Décrivez votre demande..."
                  className="min-h-32 rounded-xl resize-none"
                />
              </div>
              <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto">
                <Send className="h-5 w-5" />
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Contact info & Map */}
          <div>
            <div className="bg-card rounded-2xl p-8 shadow-pisam border border-border/50 mb-8">
              <h3 className="font-serif font-bold text-xl text-foreground mb-6">
                Informations de contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                    <p className="text-muted-foreground">
                      Boulevard Latrille, Cocody<br />
                      Abidjan, Côte d'Ivoire
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">
                      Standard: +225 27 22 44 53 53<br />
                      Urgences: +225 07 07 07 07 07
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      contact@pisam.ci<br />
                      rdv@pisam.ci
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horaires</h4>
                    <p className="text-muted-foreground">
                      Lundi - Vendredi: 7h30 - 18h00<br />
                      Samedi: 8h00 - 13h00<br />
                      <span className="text-pisam-green font-medium">Urgences: 24h/24 - 7j/7</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.537!2d-3.9833!3d5.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjInMDAuMSJOIDPCsDU5JzAwLjAiVw!5e0!3m2!1sfr!2sci!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation PISAM"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
