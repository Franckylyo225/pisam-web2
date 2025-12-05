import { useState } from "react";
import { Phone, Mail, MapPin, Clock, AlertCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().optional(),
  subject: z.string().min(1, "Veuillez sélectionner un sujet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

const subjects = [
  "Prise de rendez-vous",
  "Demande d'information",
  "Réclamation",
  "Partenariat",
  "Autre",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        subject: formData.subject,
        message: formData.message.trim(),
      } as any);

    setSending(false);

    if (error) {
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
      return;
    }

    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

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

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Contactez-nous
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Nous sommes à votre écoute
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous ou utilisez nos coordonnées pour nous contacter directement.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
              <h3 className="font-serif font-bold text-xl mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre demande..."
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={sending}>
                  {sending ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
              <p className="text-muted-foreground text-sm">
                Boulevard Latrille, Cocody<br />
                Abidjan, Côte d'Ivoire
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
              <p className="text-muted-foreground text-sm">
                Standard: +225 27 22 44 53 53<br />
                Urgences: +225 07 07 07 07 07
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">
                contact@pisam.ci<br />
                rdv@pisam.ci
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-pisam-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
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
      </div>
    </section>
  );
};

export default ContactSection;
