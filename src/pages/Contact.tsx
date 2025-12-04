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
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Send
} from "lucide-react";

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
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
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          
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

        {/* Contact Info & Form Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Nos coordonnées
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    N'hésitez pas à nous contacter pour toute information ou pour prendre rendez-vous.
                  </p>
                </div>

                {/* Address Card */}
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Adresse</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Abidjan, Cocody<br />
                          Rue Cannebière, Avenue Joseph Blohorn<br />
                          01 BP 1463 Abidjan 01, Côte d'Ivoire
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hours Card */}
                <Card className="border-l-4 border-l-secondary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-secondary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Heures d'ouverture</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          07h30 - 19h30 GMT les jours ouvrables<br />
                          07h30 - 12h00 GMT les samedis<br />
                          <span className="text-primary font-medium">Urgences 24h/24, 7 jours / 7</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <Phone className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-heading text-xl font-semibold text-foreground">Contactez-nous</h3>
                        <div className="text-muted-foreground space-y-2">
                          <p><span className="font-medium text-foreground">Standard :</span> (+225) 27 22 48 31 31</p>
                          <p><span className="font-medium text-foreground">Fax :</span> (+225) 27 22 48 31 32 / (+225) 27 22 48 31 33</p>
                          <p><span className="font-medium text-foreground">Urgences :</span> <span className="text-primary font-semibold">(+225) 27 22 48 31 12</span></p>
                          <p><span className="font-medium text-foreground">Département Qualité :</span> (+225) 07 47 93 20 30</p>
                          <p><span className="font-medium text-foreground">Direction Commerciale :</span> (+225) 27 22 48 31 44 / (+225) 27 22 48 31 04</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email Card */}
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Emails</h3>
                        <div className="space-y-1">
                          <a href="mailto:info@pisam.ci" className="block text-primary hover:underline">info@pisam.ci</a>
                          <a href="mailto:bilandesanté@pisam.ci" className="block text-primary hover:underline">bilandesanté@pisam.ci</a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                      Envoyez-nous un message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            required
                            maxLength={100}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            required
                            maxLength={255}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+225 XX XX XX XX XX"
                            maxLength={20}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Sujet *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Objet de votre message"
                            required
                            maxLength={150}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre demande..."
                          rows={6}
                          required
                          maxLength={2000}
                          className="resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;