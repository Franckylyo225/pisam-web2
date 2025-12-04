import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CreditCard, 
  Heart, 
  Building2, 
  ShoppingBag,
  CheckCircle,
  Shield,
  Banknote,
  Globe,
  Smartphone,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  BadgeCheck,
  Wallet,
  Repeat
} from "lucide-react";
import pisamPlusSlide1 from "@/assets/pisam-plus-slide-1.jpg";
import pisamPlusSlide2 from "@/assets/pisam-plus-slide-2.jpg";
import pisamPlusSlide3 from "@/assets/pisam-plus-slide-3.jpg";

const heroSlides = [
  pisamPlusSlide1,
  pisamPlusSlide2,
  pisamPlusSlide3
];

const pisamAdvantages = [
  "Carte d'accès aux soins",
  "Identification patient IPP",
  "Facilité d'accès au dossier médical du patient, en tout temps",
  "Simplicité, rapidité et sécurité dans la prise en charge grâce au code barre",
  "Réduction sur le tarif des chambres (hors réanimation)",
  "Surclassement et connexion internet haut débit en hospitalisation",
  "Consultation aux tarifs mutualistes pour les non-assurés",
  "Réduction de 10% sur les bilans de santé et check-up",
  "Réduction de 10% sur la carte de groupe sanguin",
  "Consultation en mésothérapie gratuite"
];

const bankAdvantages = [
  "Carte Visa prépayée sécurisée (sans obligation de compte bancaire)",
  "Gestion du budget santé (épargne santé)",
  "Porte-monnaie électronique",
  "Retrait GAB et DAB réseau VISA",
  "Transfert de carte à carte",
  "Paiement TPE national et international",
  "Paiement en ligne",
  "Notifications par SMS et E-mail"
];

const insuranceOptions = [
  "Assurance Horizon Retraite Santé",
  "Assurance Frais funéraires"
];

const partnerDiscounts = [
  { partner: "Librairie de France", discount: "-10%" },
  { partner: "Texas Grillz", discount: "-10%" },
  { partner: "Pharmacie du Lycée Technique", discount: "-10%" },
  { partner: "Groupe ENOTEL (chambres)", discount: "-15%" },
  { partner: "Magasins ORCADECO", discount: "-20%" },
  { partner: "OPTIC ARC-EN-CIEL", discount: "-25%" }
];

const rechargePoints = {
  abidjan: [
    { location: "ABOBO", address: "Abobo Anador", phone: "24 39 09 04" },
    { location: "ADJAMÉ", address: "Près du Marché Gouro", phone: "20 38 13 50" },
    { location: "ANGRÉ", address: "Terminus du bus N° 82-81", phone: "22 50 77 14" },
    { location: "KOUMASSI", address: "Rue Kahira", phone: "21 36 66 50" },
    { location: "II PLATEAUX", address: "Vallon, Centre Panis", phone: "22 41 53 42" },
    { location: "PLATEAU", address: "Boulevard Botreau Rousse", phone: "20 31 22 22" },
    { location: "RIVIERA", address: "Riviera Anono, Près du Marché", phone: "22 43 33 96" },
    { location: "TREICHVILLE", address: "Imm. Balance, face Solibra", phone: "21 75 91 11" },
    { location: "YOPOUGON", address: "Yopougon Sable", phone: "23 51 61 50" }
  ],
  interieur: [
    { location: "DALOA", address: "Quartier Lobia, route de Vavoua", phone: "32 78 14 30" },
    { location: "SAN PEDRO", address: "Bardot, Boulevard de la République", phone: "34 71 51 44" }
  ]
};

const faqItems = [
  {
    question: "Combien de cartes PISAM PLUS puis-je avoir ?",
    answer: "Vous pouvez détenir une seule carte PISAM PLUS par personne. Cependant, vous pouvez parrainer des membres de votre famille pour qu'ils obtiennent leur propre carte."
  },
  {
    question: "Y a-t-il des conditions à remplir pour obtenir une carte PISAM PLUS ?",
    answer: "Pour obtenir une carte PISAM PLUS, vous devez être âgé d'au moins 18 ans et présenter une pièce d'identité valide (CNI, passeport, carte consulaire ou titre de séjour)."
  },
  {
    question: "Comment activer ma carte ?",
    answer: "L'activation de la carte se fait à l'achat directement à la PISAM. Présentez-vous avec votre pièce d'identité et 10.000 FCFA pour l'activation et le premier rechargement."
  },
  {
    question: "Pendant combien de temps puis-je utiliser ma carte PISAM PLUS ?",
    answer: "La carte PISAM PLUS est valide pour une durée de 3 ans à compter de la date d'activation."
  },
  {
    question: "Combien coûte ma carte PISAM PLUS ?",
    answer: "La carte PISAM PLUS coûte 10.000 FCFA. Ce montant inclut l'activation et permet un premier rechargement simultané."
  },
  {
    question: "Que faire en cas de perte ou de vol de ma carte ?",
    answer: "En cas de perte ou de vol, contactez immédiatement la PISAM ou UBA pour faire opposition sur votre carte et en commander une nouvelle."
  },
  {
    question: "Où puis-je recharger ma carte ?",
    answer: "Vous pouvez recharger votre carte à la PISAM ainsi que dans toutes les agences UBA partenaires à Abidjan et dans les villes de l'intérieur."
  },
  {
    question: "Est-ce que quelqu'un d'autre peut utiliser ma carte prépayée PISAM PLUS ?",
    answer: "Non, la carte PISAM PLUS est strictement personnelle et nominative. Elle ne peut être utilisée que par son titulaire."
  }
];

const partners = [
  "UBA",
  "Librairie de France",
  "Allianz Assurance",
  "ORCADECO",
  "Groupe ENOTEL",
  "Optic Arc-en-Ciel",
  "Texas BBQ"
];

const PisamPlus = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Carte PISAM+ - Votre carte santé et paiement | PISAM</title>
        <meta 
          name="description" 
          content="Découvrez la Carte PISAM PLUS : carte d'identification patient couplée à une carte VISA prépayée. Avantages exclusifs, réductions chez nos partenaires. 10.000 FCFA."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Slides */}
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-secondary/60" />
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-white w-8" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-2xl">
              <Badge className="mb-6 bg-primary text-primary-foreground text-sm px-4 py-1">
                Innovation Santé
              </Badge>
              <h1 className="font-proxima text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Carte <span className="text-secondary">PISAM</span><span className="text-accent">+</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow">
                Votre dossier médical + Carte VISA prépayée
              </p>
              <p className="text-lg text-white/80 mb-8 max-w-xl drop-shadow">
                Une carte d'identification patient couplée à une carte VISA prépayée. 
                Sécurisée, simple d'usage, économique et rechargeable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Commander ma carte
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  En savoir plus
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-3xl font-bold text-white">10.000</p>
                  <p className="text-sm text-white/80">FCFA seulement</p>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-3xl font-bold text-white">3 ans</p>
                  <p className="text-sm text-white/80">de validité</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Plus de 35 ans d'excellence</Badge>
              <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-6">
                Un Leader dans la Santé
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                La Polyclinique Internationale Sainte Anne-Marie (PISAM) est une entité médicale qui, 
                depuis sa création en 1985, s'est engagée dans une dynamique d'amélioration continue 
                de la qualité des soins. C'est dans cette optique qu'en 2020, la PISAM met en service 
                pour le bien-être de la population, une carte d'identification de ses patients couplée 
                à une carte VISA prépayée.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Véritable innovation dans le secteur de la santé en Côte d'Ivoire, la Carte PISAM PLUS 
                offre à ses détenteurs des <strong>avantages et privilèges multiples</strong> au sein de 
                la polyclinique et chez ses partenaires.
              </p>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Avantages exclusifs</Badge>
              <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                Une petite carte pleine de PLUS...
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Avantages, privilèges et réductions... et ce n'est pas tout !
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* PISAM Advantages */}
              <Card className="border-primary/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Heart className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-proxima text-xl font-bold text-foreground mb-4">
                    Avantages à la PISAM
                  </h3>
                  <ul className="space-y-3">
                    {pisamAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Bank Advantages */}
              <Card className="border-secondary/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                    <Building2 className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-proxima text-xl font-bold text-foreground mb-4">
                    Avantages Banques & Assurances
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {bankAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-2">Possibilité d'adhérer à :</p>
                    <ul className="space-y-2">
                      {insuranceOptions.map((option, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Shield className="h-4 w-4 text-secondary" />
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Partner Discounts */}
              <Card className="border-accent/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-accent/30 flex items-center justify-center mb-6">
                    <ShoppingBag className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-proxima text-xl font-bold text-foreground mb-4">
                    Privilèges chez nos partenaires
                  </h3>
                  <ul className="space-y-3">
                    {partnerDiscounts.map((item, index) => (
                      <li key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm text-foreground">{item.partner}</span>
                        <Badge variant="secondary" className="font-bold">
                          {item.discount}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Simple et accessible</Badge>
              <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                Une simplicité d'accès et d'utilisation
              </h2>
              <p className="text-muted-foreground">La carte PISAM PLUS, c'est pour tous...</p>
            </div>

            <Tabs defaultValue="acheter" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 h-auto">
                <TabsTrigger value="acheter" className="flex flex-col gap-2 py-4">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-xs sm:text-sm">Acheter</span>
                </TabsTrigger>
                <TabsTrigger value="activer" className="flex flex-col gap-2 py-4">
                  <BadgeCheck className="h-5 w-5" />
                  <span className="text-xs sm:text-sm">Activer</span>
                </TabsTrigger>
                <TabsTrigger value="recharger" className="flex flex-col gap-2 py-4">
                  <Wallet className="h-5 w-5" />
                  <span className="text-xs sm:text-sm">Recharger</span>
                </TabsTrigger>
                <TabsTrigger value="utiliser" className="flex flex-col gap-2 py-4">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs sm:text-sm">Utiliser</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="acheter" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ShoppingCart className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-proxima text-2xl font-bold text-foreground mb-4">
                          Où se procurer la carte PISAM PLUS ?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          La carte PISAM PLUS est en vente <strong>uniquement à la PISAM</strong>. 
                          Elle ne coûte que <strong>10.000 FCFA</strong> et est valide pour <strong>3 ans</strong>.
                        </p>
                        <Button>
                          Commander ma carte
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activer" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <BadgeCheck className="h-8 w-8 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-proxima text-2xl font-bold text-foreground mb-4">
                          Comment activer ma carte ?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          L'activation de la carte se fait à l'achat. Rendez-vous à la PISAM muni des éléments suivants :
                        </p>
                        <ul className="space-y-2 text-muted-foreground mb-4">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-secondary" />
                            Votre pièce d'identité (CNI, passeport, carte consulaire ou titre de séjour en cours de validité)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-secondary" />
                            10.000 FCFA pour l'activation et le rechargement simultanés
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recharger" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                        <Wallet className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-proxima text-2xl font-bold text-foreground mb-4">
                          Besoin de fonds ? Rechargez votre carte
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          La carte PISAM PLUS est rechargeable à la PISAM ainsi que dans plusieurs agences UBA.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">ABIDJAN</h4>
                            <ul className="space-y-2 text-sm">
                              {rechargePoints.abidjan.slice(0, 5).map((point, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <span><strong>{point.location}</strong> - {point.address}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">VILLES INTÉRIEURES</h4>
                            <ul className="space-y-2 text-sm">
                              {rechargePoints.interieur.map((point, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                  <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                                  <span><strong>{point.location}</strong> - {point.address}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="utiliser" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CreditCard className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-proxima text-2xl font-bold text-foreground mb-4">
                          Nos partenaires pour vous servir
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          La carte PISAM PLUS est utilisable partout où les cartes VISA prépayées sont acceptées. 
                          En plus, la carte PISAM PLUS vous donne droit à de nombreuses réductions et des privilèges chez nos partenaires.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Globe className="h-3 w-3" /> Paiement international
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Banknote className="h-3 w-3" /> Retrait DAB/GAB
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Smartphone className="h-3 w-3" /> Paiement en ligne
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-proxima text-2xl md:text-3xl font-bold text-foreground mb-2">
                Des partenaires dévoués
              </h2>
              <p className="text-muted-foreground">Dites-leur que vous venez de notre part</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="px-6 py-4 bg-background rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow"
                >
                  <span className="font-semibold text-foreground">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
              <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                Des questions supplémentaires ?
              </h2>
              <p className="text-muted-foreground">Nous y répondons avec plaisir !</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 bg-background"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold mb-4">
                  Toujours joignable
                </h2>
                <p className="text-lg opacity-90">
                  En personne, par e-mail ou par téléphone... contactez-nous.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Venez nous voir</h3>
                  <p className="text-sm opacity-80">
                    Abidjan, Cocody, Rue Cannebière,<br />
                    Avenue Joseph Blohorn<br />
                    01 BP 1463 Abidjan 01
                  </p>
                </div>
                <div>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Appelez-nous</h3>
                  <p className="text-sm opacity-80">
                    +225 22 48 31 31<br />
                    +225 22 48 31 44<br />
                    +225 07 71 72 73
                  </p>
                </div>
                <div>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Écrivez-nous</h3>
                  <p className="text-sm opacity-80">
                    contact@macartepisam.com<br />
                    www.macartepisam.com
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Commander ma carte PISAM PLUS
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PisamPlus;
