import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle, Heart, FileText, Stethoscope, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-clinic.jpg";

const BilanSante = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5 Mo");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('health-check-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('health-check-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from('health_check_registrations')
        .insert({
          full_name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim() || null,
          image_url: imageUrl,
        });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Votre demande a été envoyée avec succès !");
      setFormData({ fullName: "", phone: "", email: "", message: "" });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Prévention",
      description: "Détectez les problèmes de santé avant qu'ils ne s'aggravent"
    },
    {
      icon: FileText,
      title: "Bilan complet",
      description: "Analyses sanguines, examens cardiaques et plus encore"
    },
    {
      icon: Stethoscope,
      title: "Suivi personnalisé",
      description: "Recommandations adaptées à votre profil de santé"
    },
    {
      icon: Calendar,
      title: "Rendez-vous rapide",
      description: "Obtenez un rendez-vous dans les 48h"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Bilan de Santé - PISAM</title>
        <meta name="description" content="Prenez rendez-vous pour un bilan de santé complet à la Polyclinique Internationale Sainte Anne-Marie." />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Bilan de santé PISAM" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          </div>
          <div className="relative z-10 text-center text-primary-foreground px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Bilan de Santé
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto">
              Prenez soin de votre santé avec un bilan complet
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-primary">
              Pourquoi faire un bilan de santé ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="text-2xl font-serif text-center">
                    Demande de Rendez-vous
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-green-600 mb-4">
                        Demande envoyée !
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Nous avons bien reçu votre demande. Notre équipe vous contactera 
                        dans les plus brefs délais pour confirmer votre rendez-vous.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline">
                        Nouvelle demande
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom complet *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Entrez votre nom complet"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+225 XX XX XX XX XX"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="votre@email.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message (optionnel)</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Précisez vos attentes ou besoins particuliers..."
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">Télécharger un document (optionnel)</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          {imagePreview ? (
                            <div className="space-y-4">
                              <img 
                                src={imagePreview} 
                                alt="Aperçu" 
                                className="max-h-40 mx-auto rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setImageFile(null);
                                  setImagePreview(null);
                                }}
                              >
                                Supprimer
                              </Button>
                            </div>
                          ) : (
                            <label htmlFor="image" className="cursor-pointer block">
                              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Cliquez pour télécharger une image
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                JPG, PNG ou GIF (max 5 Mo)
                              </p>
                            </label>
                          )}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Envoi en cours...
                          </>
                        ) : (
                          "Envoyer ma demande"
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Pour toute question, contactez-nous à{" "}
                  <a href="mailto:bilandesante@pisam.ci" className="text-primary font-semibold hover:underline">
                    bilandesante@pisam.ci
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BilanSante;
