import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Shield, FileText, ClipboardList, LogOut, Users } from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";

const insuranceLogos = [
  { name: "NSIA Assurances", color: "bg-blue-600" },
  { name: "Allianz", color: "bg-blue-800" },
  { name: "AXA", color: "bg-red-600" },
  { name: "SUNU Assurances", color: "bg-green-600" },
  { name: "Saham Assurance", color: "bg-orange-500" },
  { name: "Atlantique Assurances", color: "bg-teal-600" },
  { name: "COLINA", color: "bg-purple-600" },
  { name: "Prudential Belife", color: "bg-indigo-600" },
  { name: "SONAR", color: "bg-amber-600" },
  { name: "GAC", color: "bg-emerald-600" },
];

const charteArticles = [
  {
    title: "Article 1 : Droit à l'information",
    content: "Le patient a le droit d'être informé sur son état de santé, les traitements proposés, leurs alternatives et leurs risques. Cette information doit être claire, compréhensible et adaptée à chaque patient. Le médecin doit répondre à toutes les questions du patient concernant sa santé."
  },
  {
    title: "Article 2 : Consentement éclairé",
    content: "Aucun acte médical ni aucun traitement ne peut être pratiqué sans le consentement libre et éclairé du patient. Ce consentement peut être retiré à tout moment. Le patient a le droit de refuser un traitement après avoir été informé des conséquences de ce refus."
  },
  {
    title: "Article 3 : Respect de la dignité",
    content: "Le patient a droit au respect de sa dignité. Il doit être traité avec égards et considération, quels que soient son origine, son sexe, sa situation de famille, son âge, son état de santé, son handicap, ses mœurs, son orientation sexuelle, ses opinions politiques ou ses convictions religieuses."
  },
  {
    title: "Article 4 : Confidentialité et secret médical",
    content: "Le patient a droit au respect de la confidentialité des informations le concernant. Le secret médical couvre l'ensemble des informations relatives au patient : son état de santé, son diagnostic, son pronostic, son traitement et toute information personnelle le concernant."
  },
  {
    title: "Article 5 : Accès au dossier médical",
    content: "Le patient a le droit d'accéder à son dossier médical directement ou par l'intermédiaire d'un médecin qu'il désigne. Ce droit s'exerce dans le respect des règles de déontologie médicale et des dispositions légales en vigueur."
  },
  {
    title: "Article 6 : Qualité des soins",
    content: "Le patient a le droit de recevoir des soins de qualité, appropriés à son état de santé, selon les données actuelles de la science et les bonnes pratiques professionnelles. Les soins doivent être prodigués avec compétence et dans le respect des règles de l'art médical."
  },
  {
    title: "Article 7 : Prise en charge de la douleur",
    content: "Tout patient a le droit de recevoir des soins visant à soulager sa douleur. La prise en charge de la douleur doit être une préoccupation constante de l'équipe soignante. Le patient doit être informé des moyens mis à sa disposition pour l'évaluation et le traitement de sa douleur."
  },
  {
    title: "Article 8 : Accompagnement en fin de vie",
    content: "Le patient en fin de vie a droit à des soins palliatifs et à un accompagnement adapté à sa situation. Sa dignité doit être préservée et ses proches doivent pouvoir l'entourer. Les souhaits du patient concernant sa fin de vie doivent être respectés dans la mesure du possible."
  },
  {
    title: "Article 9 : Droit de recours",
    content: "Le patient a le droit d'exprimer ses observations, ses réclamations et ses plaintes. Il peut saisir la direction de l'établissement ou le département qualité pour toute remarque concernant sa prise en charge. Ses plaintes seront traitées avec diligence et impartialité."
  },
  {
    title: "Article 10 : Devoirs du patient",
    content: "Le patient s'engage à respecter les règles de fonctionnement de l'établissement, à fournir des informations exactes sur son état de santé, à suivre les prescriptions médicales et à respecter les autres patients ainsi que le personnel soignant."
  },
  {
    title: "Article 11 : Participation aux frais",
    content: "Le patient est informé des conditions financières de sa prise en charge. Il s'engage à s'acquitter des frais restant à sa charge après intervention de son organisme d'assurance maladie et de sa mutuelle ou assurance complémentaire."
  },
];

const Patients = () => {
  return (
    <>
      <Helmet>
        <title>Patients | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Informations pour les patients de PISAM : assurances acceptées, procédures d'admission, consultation, hospitalisation et charte du patient." />
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
              Espace Patients
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Toutes les informations pour faciliter votre parcours de soins
            </p>
          </div>
        </section>

        {/* Assurances Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Partenaires santé</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Assurances Acceptées
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                PISAM travaille en partenariat avec les principales compagnies d'assurance pour faciliter votre prise en charge
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {insuranceLogos.map((insurance, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6">
                    <div className="p-4">
                      <div className={`${insurance.color} h-20 rounded-xl flex items-center justify-center text-white font-bold text-sm text-center p-2 shadow-md hover:shadow-lg transition-shadow`}>
                        {insurance.name}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Admissions Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Procédures</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Admissions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tout ce que vous devez savoir pour préparer votre venue à PISAM
              </p>
            </div>

            <Tabs defaultValue="consultation" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 rounded-xl mb-8">
                <TabsTrigger 
                  value="consultation" 
                  className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span className="hidden sm:inline">Consultation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="hospitalisation"
                  className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Hospitalisation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sortie"
                  className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Formalités de sortie</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="consultation" className="mt-0">
                <div className="bg-card rounded-2xl p-8 shadow-lg border">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ClipboardList className="h-5 w-5 text-primary" />
                    </div>
                    Consultation
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Pour une consultation à PISAM, vous pouvez prendre rendez-vous de plusieurs manières :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Par téléphone au <strong className="text-foreground">(+225) 27 22 48 31 31</strong></li>
                      <li>En ligne via notre plateforme de prise de rendez-vous</li>
                      <li>Directement à l'accueil de la clinique</li>
                    </ul>
                    <div className="bg-primary/5 rounded-xl p-6 mt-6">
                      <h4 className="font-semibold text-foreground mb-3">Documents à apporter :</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Pièce d'identité (CNI, passeport)</li>
                        <li>Carte d'assurance maladie (le cas échéant)</li>
                        <li>Ordonnances et résultats d'examens antérieurs</li>
                        <li>Carnet de santé (pour les enfants)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hospitalisation" className="mt-0">
                <div className="bg-card rounded-2xl p-8 shadow-lg border">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    Hospitalisation
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      L'hospitalisation à PISAM peut être programmée ou survenir en urgence. Dans tous les cas, notre équipe vous accompagne dans les démarches administratives.
                    </p>
                    <div className="bg-primary/5 rounded-xl p-6 mt-6">
                      <h4 className="font-semibold text-foreground mb-3">Formalités d'admission :</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Présentation de la pièce d'identité du patient</li>
                        <li>Bulletin d'hospitalisation délivré par le médecin</li>
                        <li>Prise en charge de l'assurance ou dépôt de garantie</li>
                        <li>Signature du formulaire de consentement</li>
                      </ul>
                    </div>
                    <div className="bg-secondary/5 rounded-xl p-6 mt-4">
                      <h4 className="font-semibold text-foreground mb-3">Effets personnels à prévoir :</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Vêtements de nuit et pantoufles</li>
                        <li>Articles de toilette</li>
                        <li>Traitements en cours (médicaments)</li>
                        <li>Objets de confort personnel</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sortie" className="mt-0">
                <div className="bg-card rounded-2xl p-8 shadow-lg border">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <LogOut className="h-5 w-5 text-primary" />
                    </div>
                    Formalités de sortie
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      La sortie de l'établissement est autorisée par le médecin traitant. Elle donne lieu à plusieurs formalités :
                    </p>
                    <div className="bg-primary/5 rounded-xl p-6 mt-6">
                      <h4 className="font-semibold text-foreground mb-3">Étapes de sortie :</h4>
                      <ol className="list-decimal list-inside space-y-3 ml-4">
                        <li><strong>Validation médicale :</strong> Le médecin signe l'autorisation de sortie</li>
                        <li><strong>Récupération des documents :</strong> Compte-rendu d'hospitalisation, ordonnances, certificats</li>
                        <li><strong>Régularisation administrative :</strong> Passage au bureau des admissions</li>
                        <li><strong>Règlement des frais :</strong> Paiement du solde restant à charge</li>
                      </ol>
                    </div>
                    <div className="bg-accent/10 rounded-xl p-6 mt-4">
                      <h4 className="font-semibold text-foreground mb-3">Documents remis à la sortie :</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Compte-rendu d'hospitalisation</li>
                        <li>Ordonnances de sortie</li>
                        <li>Certificat médical (si nécessaire)</li>
                        <li>Rendez-vous de suivi</li>
                        <li>Facture détaillée</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Charte du Patient Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-4">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Vos droits</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Charte du Patient
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                PISAM s'engage à respecter vos droits fondamentaux tout au long de votre parcours de soins
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {charteArticles.map((article, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`article-${index}`}
                    className="bg-card rounded-xl border shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                      <span className="text-left font-semibold text-foreground">
                        {article.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                      {article.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Patients;
