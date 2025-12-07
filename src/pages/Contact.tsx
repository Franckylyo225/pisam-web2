import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Send
} from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        });

      if (error) throw error;
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact - PISAM | Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Contactez PISAM - Polyclinique Internationale Sainte Anne-Marie à Abidjan. Adresse, téléphone, email et formulaire de contact." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${contactHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-secondary/60" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[400px] md:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5301853886726!2d-3.9897!3d5.3567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed3c7f8e5c4d%3A0x5c3f6dd7a3c8e2b1!2sPISAM%20-%20Polyclinique%20Internationale%20Sainte%20Anne-Marie!5e0!3m2!1sfr!2sci!4v1699000000000!5m2!1sfr!2sci"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation PISAM"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </section>

        {/* Contact Info Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Nos coordonnées
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  N'hésitez pas à nous contacter pour toute information ou pour prendre rendez-vous.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-12">
                {/* Address */}
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Adresse</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Abidjan, Cocody<br />
                    Rue Cannebière<br />
                    Avenue Joseph Blohorn<br />
                    01 BP 1463 Abidjan 01<br />
                    Côte d'Ivoire
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Heures d'ouverture</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Lun - Ven : 07h30 - 19h30<br />
                    Samedi : 07h30 - 12h00<br />
                    <span className="block mt-2 font-semibold text-accent">Urgences 24h/24 - 7j/7</span>
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Téléphones</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    <span className="block">Standard :</span>
                    (+225) 27 22 48 31 31<br />
                    <span className="block mt-2 font-semibold text-accent">Urgences :</span>
                    (+225) 27 22 48 31 12
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Emails</h3>
                  <div className="text-sm opacity-80 leading-relaxed space-y-1">
                    <a href="mailto:info@pisam.ci" className="block hover:text-accent transition-colors">info@pisam.ci</a>
                    <a href="mailto:bilandesante@pisam.ci" className="block hover:text-accent transition-colors">bilandesante@pisam.ci</a>
                  </div>
                </div>
              </div>

              {/* Additional Contact Details */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Fax</h4>
                  <p className="text-sm opacity-80">(+225) 27 22 48 31 32<br />(+225) 27 22 48 31 33</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Département Qualité</h4>
                  <p className="text-sm opacity-80">(+225) 07 47 93 20 30</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Direction Commerciale</h4>
                  <p className="text-sm opacity-80">(+225) 27 22 48 31 44<br />(+225) 27 22 48 31 04</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Envoyez-nous un message
                </h2>
                <p className="text-muted-foreground text-lg">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-medium">
                          Nom complet <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Entrez votre nom complet"
                          required
                          maxLength={100}
                          className="h-12 bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Adresse email <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          required
                          maxLength={255}
                          className="h-12 bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground font-medium">
                          Numéro de téléphone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+225 XX XX XX XX XX"
                          maxLength={20}
                          className="h-12 bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-foreground font-medium">
                          Sujet <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Objet de votre message"
                          required
                          maxLength={150}
                          className="h-12 bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-medium">
                        Votre message <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        required
                        maxLength={2000}
                        className="resize-none bg-muted/50 border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Envoi en cours...
                          </span>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;