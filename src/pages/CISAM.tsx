import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import cisamHero from "@/assets/cisam-scanner.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ScanLine, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  Radiation,
  Monitor,
  Heart
} from "lucide-react";

const equipments = [
  {
    name: "Scanner CT 64 Barrettes",
    description: "Imagerie complète en trois dimensions pour un diagnostic précis des pathologies complexes",
    icon: ScanLine,
    specs: "Technologie innovante et performante"
  },
  {
    name: "IRM",
    description: "Images claires et détaillées d'une partie du corps grâce à un champ magnétique",
    icon: Monitor,
    specs: "Sans rayonnement ionisant"
  },
  {
    name: "Mammographie",
    description: "Méthode reconnue comme étant la plus efficace pour le dépistage du cancer du sein",
    icon: Radiation,
    specs: "Technologie numérique avancée"
  },
  {
    name: "Échographie",
    description: "Images diagnostiques des tissus grâce à un faisceau d'ultrasons. Examen simple, indolore et sans risque",
    icon: Heart,
    specs: "Examen sans rayonnement"
  },
  {
    name: "Radiologie standard",
    description: "Diagnostic de fractures, maladies des os, blessures, infections, maladies dégénératives",
    icon: ScanLine,
    specs: "Imagerie de référence"
  }
];

const services = [
  {
    title: "QUALITÉ MÉDICALE",
    description: "Le service est doté d'un éventail d'équipements considéré comme les plus compétitifs en Afrique, entièrement neufs. Les médecins sont tous des experts dans leur discipline avec une spécialisation dans toutes les modalités techniques.",
    icon: Shield
  },
  {
    title: "SÉCURISATION DU PATIENT",
    description: "Le souci de réduire l'exposition au rayons X délivrée au patient, à qualité optimale des examens, demeure une préoccupation majeure. Nous avons choisi des équipements innovants et non irradiants afin de réduire tous risques.",
    icon: Heart
  },
  {
    title: "PRISE EN CHARGE INDIVIDUELLE",
    description: "La plupart des examens de radiologie sont réalisés sans rendez-vous. Un secrétariat spécialisé met à votre disposition ses compétences professionnelles et veille au bon déroulement de vos examens.",
    icon: Users
  }
];

const examCategories = [
  "Radiologies standards",
  "Scanner CT (imagerie 3D)",
  "IRM (Imagerie par résonance magnétique)",
  "Échographie (ultrasons)",
  "Mammographie (dépistage cancer du sein)"
];

const CISAM = () => {
  return (
    <>
      <Helmet>
        <title>CISAM - Centre d'Imagerie Sainte Anne Marie | PISAM</title>
        <meta 
          name="description" 
          content="CISAM, Centre d'Imagerie Sainte Anne Marie. Scanner 64 barrettes, IRM, mammographie numérique, échographie à Abidjan. Équipements performants, radiologues experts."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(var(--secondary)/0.85), hsl(var(--primary)/0.8)), url(${cisamHero})`
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative z-10 text-center text-white px-4">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm">
              Imagerie de pointe
            </Badge>
            <h1 className="font-proxima text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              CISAM
            </h1>
            <p className="text-xl md:text-2xl font-light mb-2">
              Centre d'Imagerie Sainte Anne Marie
            </p>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              L'un des centres d'imagerie les plus complets de la sous-région
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-center space-y-4 mb-12">
                <p className="text-muted-foreground leading-relaxed">
                  Le Centre d'Imagerie Sainte Anne Marie est doté d'équipements d'imagerie médicale et de radiologie 
                  interventionnelle performants. Ce pôle d'imagerie possède des équipements récents et performants 
                  <strong> faisant de lui l'un des plus complet de la sous-région</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Ce centre est <strong>divisé en spécialités selon l'organe concerné</strong> par l'examen, l'âge ou le sexe 
                  du patient. Il est composé d'une <strong>équipe pluridisciplinaire de médecins et de soignants spécialisés</strong> 
                  organisée autour de trois principaux axes : qualité médicale, sécurisation du patient et prise en charge individuelle.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Des équipements de pointe et des technologies innovantes sont mis à votre disposition afin de vous garantir 
                  une fiabilité des résultats et une rapidité d'exécution.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <service.icon className="h-7 w-7 text-secondary" />
                      </div>
                      <h3 className="font-proxima font-semibold text-lg mb-2 text-foreground">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Équipements */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                Plateau Technique
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des équipements de dernière génération pour une imagerie de haute qualité
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {equipments.map((equipment, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0">
                        <equipment.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-proxima font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors">
                          {equipment.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {equipment.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {equipment.specs}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Types d'examens */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Les services du centre d'imagerie
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Il est important de savoir que la radiologie conventionnelle demeure nécessaire et conseillée en première 
                  intention afin de minimiser les risques d'irradiations.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {examCategories.map((exam, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-secondary/5 transition-colors border border-border/50"
                  >
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium text-sm">{exam}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Informations importantes
                </h2>
              </div>

              <div className="space-y-4">
                <Card className="border-secondary/20">
                  <CardContent className="p-6 space-y-2">
                    <h3 className="font-proxima font-semibold text-lg text-foreground mb-3">Avant votre rendez-vous</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span><strong>Si vous êtes enceinte :</strong> Vous devez impérativement le signaler.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span><strong>Examens osseux et pulmonaires :</strong> Aucune préparation particulière.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span><strong>Autres examens :</strong> Une préparation vous sera précisée lors de la prise de rendez-vous.</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span><strong>Documents à apporter :</strong> Prescription médicale, résultats antérieurs, carte vitale.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-proxima font-semibold text-lg text-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5 text-secondary" />
                      Horaires et localisation
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Localisation :</strong> Premier sous-sol de la PISAM</p>
                      <p><strong>Horaires :</strong> Du lundi au samedi, 07h30 à 18h00</p>
                      <p><strong>Prise de rendez-vous :</strong> (+225) 27 22 48 31 15</p>
                      <p><strong>La plupart des examens de radiologie sont réalisés sans rendez-vous.</strong></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-proxima text-3xl md:text-4xl font-bold mb-4">
              Prendre rendez-vous pour un examen
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Notre équipe de radiologues experts est disponible pour réaliser vos examens d'imagerie dans les meilleurs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+2252722483115"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-secondary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                <Clock className="h-5 w-5" />
                Prendre rendez-vous : 27 22 48 31 15
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CISAM;
