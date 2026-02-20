import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bed,
  Stethoscope,
  HeartPulse,
  Microscope,
  ScanLine,
  Siren,
  Scissors,
  Baby,
  Shield,
  Activity,
  Phone,
  Calendar,
} from "lucide-react";
import heroImage from "@/assets/pisam-aerial-view.jpg";
import plateauBiocsam from "@/assets/plateau-biocsam.jpg";
import plateauScanner from "@/assets/plateau-scanner.jpg";
import plateauImagerie from "@/assets/plateau-imagerie.jpg";
import plateauBlocOperatoire from "@/assets/plateau-bloc-operatoire.jpg";

const services = [
  {
    icon: Bed,
    title: "Unité d'hospitalisation confortable",
    description:
      "La PISAM offre un espace hospitalier moderne permettant la prise en charge optimale des patients.",
    features: [
      "126 lits répartis dans les chambres des différentes unités",
      "Une présence constante de médecins spécialistes expérimentés",
      "Un accès immédiat à des services supports de pointe (service de soins intensifs et soins d'un jour, service d'imagerie médicale, laboratoire, physiothérapie)",
    ],
  },
  {
    icon: Stethoscope,
    title: "Service de consultations externes",
    description:
      "Organisé comme un cabinet médical polyvalent, le service de consultations externes accueille toute personne désirant consulter des médecins compétents et expérimentés dans plusieurs spécialités.",
    features: [
      "Gynécologie, pédiatrie, dentisterie",
      "ORL, ophtalmologie, dermatologie",
      "Orthopédie, chirurgie et plus encore",
    ],
  },
  {
    icon: HeartPulse,
    title: "Service d'hémodialyse",
    description: "Doté de 6 postes de dialyse, le service d'hémodialyse est disponible 24h/24.",
    features: [
      "6 postes de dialyse modernes",
      "Disponibilité 24h/24",
      "Équipe spécialisée",
    ],
    image: plateauScanner,
  },
  {
    icon: Microscope,
    title: "Laboratoire BIOCSAM",
    description:
      "Laboratoire certifié ISO 9001 version 2008 avec des équipements à la pointe de la technologie pour une large gamme d'examens de biologie médicale.",
    features: [
      "Hématologie, biochimie, bactériologie",
      "Anatomie pathologie",
      "Banque de sang intégrée",
    ],
    image: plateauBiocsam,
  },
  {
    icon: ScanLine,
    title: "Imagerie de pointe",
    description:
      "Équipée d'une radiologie digitale, le service d'imagerie assure une activité radiologique de qualité en explorations neurologiques, rachidiennes, vasculaires et plus.",
    features: [
      "Radio avec suspension plafonnière numérisée",
      "Scanner 64 barrettes",
      "Radiologie vasculaire et ostéo-articulaire",
    ],
    image: plateauImagerie,
  },
  {
    icon: Siren,
    title: "Service médico-chirurgical 24h/24",
    description:
      "Doté d'un héliport, ce service reçoit à tout moment de jour comme de nuit les urgences médicales et chirurgicales.",
    features: [
      "Héliport pour évacuations sanitaires",
      "Équipe de médecins urgentistes",
      "Accueil des patients nationaux et internationaux",
    ],
  },
  {
    icon: Scissors,
    title: "Bloc opératoire moderne",
    description:
      "Doté de 7 salles d'intervention totalement autonomes avec un équipement de vidéo chirurgie et une ligne numérisée pour vidéoconférence.",
    features: [
      "5 salles de chirurgie propre et 2 salles septiques",
      "Amplificateur de brillance",
      "Chirurgie thoracique, neurochirurgie, vidéo-chirurgie",
    ],
    image: plateauBlocOperatoire,
  },
  {
    icon: Baby,
    title: "Bloc obstétrical",
    description:
      "Le bloc obstétrical de la PISAM comprend une salle de consultation dotée d'un échographe, deux salles d'accouchement et quatre salles de travail équipées.",
    features: [
      "1 échographe dédié",
      "2 salles d'accouchement",
      "4 salles de travail équipées",
    ],
  },
  {
    icon: Shield,
    title: "Service de stérilisation centrale",
    description:
      "Un service de stérilisation centrale garantissant les plus hauts standards d'hygiène et de sécurité.",
    features: [
      "Protocoles stricts de stérilisation",
      "Équipements modernes",
      "Conformité aux normes internationales",
    ],
  },
  {
    icon: Activity,
    title: "Unité de soins intensifs polyvalente",
    description:
      "Dans les situations cliniques critiques exigeant des soins complets et une surveillance constante, le patient peut être orienté vers l'unité de réanimation polyvalente.",
    features: [
      "8 box totalement autonomes (respirateur, monitoring)",
      "Système de surveillance monitorée centralisé",
      "6 médecins réanimateurs et spécialistes disponibles 24h/24",
    ],
  },
];

const PlateauTechnique = () => {
  return (
    <>
      <Helmet>
        <title>Plateau Technique | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta
          name="description"
          content="Découvrez le plateau technique de la PISAM : équipements de pointe, bloc opératoire moderne, imagerie avancée, laboratoire certifié ISO et unité de soins intensifs."
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Vue aérienne de la PISAM"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/70" />
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Plateau Technique
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Un établissement hospitalier pluridisciplinaire
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              La PISAM dispose d'équipements de pointe pour une offre de soins variée,
              spécialisée, sûre et efficace, reconnue sur le plan national et international.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {service.image && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Salle d'endoscopie */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="border-none shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Salle d'endoscopie et de petite chirurgie
              </h3>
              <p className="text-muted-foreground">
                Une salle dédiée aux procédures d'endoscopie et de petite chirurgie,
                équipée des dernières technologies pour des interventions précises et sécurisées.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Besoin d'informations complémentaires ?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            concernant nos services et équipements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-pisam-green hover:bg-pisam-green/90 text-white"
              asChild
            >
              <a href="tel:+2252722550000">
                <Calendar className="mr-2 h-5 w-5" />
                Prendre rendez-vous
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Phone className="mr-2 h-5 w-5" />
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PlateauTechnique;
