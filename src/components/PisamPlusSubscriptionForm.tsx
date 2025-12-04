import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Loader2 } from "lucide-react";

const subscriptionSchema = z.object({
  civilite: z.string().min(1, "Veuillez sélectionner une civilité"),
  nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  prenom: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères").max(100, "Le prénom est trop long"),
  dateNaissance: z.string().min(1, "La date de naissance est requise"),
  numeroIPP: z.string().optional(),
  typeDocument: z.string().min(1, "Veuillez sélectionner un type de document"),
  numeroPiece: z.string().trim().min(5, "Le numéro de pièce est requis").max(50, "Numéro de pièce trop long"),
  dateExpiration: z.string().min(1, "La date d'expiration est requise"),
  profession: z.string().trim().min(2, "La profession est requise").max(100, "Profession trop longue"),
  telephone: z.string().trim().min(8, "Le numéro de téléphone est requis").max(20, "Numéro trop long"),
  email: z.string().trim().email("Email invalide").optional().or(z.literal("")),
  adresse: z.string().trim().min(5, "L'adresse est requise").max(200, "Adresse trop longue"),
  livraison: z.string().min(1, "Veuillez sélectionner une option de livraison"),
  codePromo: z.string().optional(),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface PisamPlusSubscriptionFormProps {
  trigger: React.ReactNode;
}

const PisamPlusSubscriptionForm = ({ trigger }: PisamPlusSubscriptionFormProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      civilite: "",
      nom: "",
      prenom: "",
      dateNaissance: "",
      numeroIPP: "",
      typeDocument: "",
      numeroPiece: "",
      dateExpiration: "",
      profession: "",
      telephone: "",
      email: "",
      adresse: "",
      livraison: "",
      codePromo: "",
    },
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Demande envoyée !",
      description: "Votre demande de carte PISAM+ a été enregistrée. Nous vous contacterons sous 48h.",
    });
    
    setIsSubmitting(false);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-proxima flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            Formulaire de souscription
          </DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour commander votre Carte PISAM+. 
            Coût : 10.000 FCFA - Validité : 3 ans
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informations personnelles */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b pb-2">Informations personnelles</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="civilite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Civilité *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Monsieur</SelectItem>
                          <SelectItem value="Mme">Madame</SelectItem>
                          <SelectItem value="Mlle">Mademoiselle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dateNaissance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de naissance *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numeroIPP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro IPP (si existant)</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre numéro IPP PISAM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pièce d'identité */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b pb-2">Pièce d'identité</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="typeDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de document *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CNI">CNI</SelectItem>
                          <SelectItem value="Passeport">Passeport</SelectItem>
                          <SelectItem value="Carte Consulaire">Carte Consulaire</SelectItem>
                          <SelectItem value="Titre de séjour">Titre de séjour</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numeroPiece"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de pièce *</FormLabel>
                      <FormControl>
                        <Input placeholder="N° de la pièce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateExpiration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d'expiration *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact et livraison */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground border-b pb-2">Contact et livraison</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre profession" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+225 XX XX XX XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="votre@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adresse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse de livraison *</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre adresse complète" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="livraison"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option de livraison *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="retrait">Retrait à la PISAM (Gratuit)</SelectItem>
                        <SelectItem value="abidjan">Livraison Abidjan (1.000 FCFA)</SelectItem>
                        <SelectItem value="interieur">Livraison hors Abidjan (2.000 FCFA)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Code promo */}
            <FormField
              control={form.control}
              name="codePromo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code promo</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez votre code promo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prix */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Carte PISAM+ (3 ans)</span>
                <span className="font-semibold">10.000 FCFA</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span className="text-muted-foreground">Selon option choisie</span>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Soumettre ma demande
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PisamPlusSubscriptionForm;
