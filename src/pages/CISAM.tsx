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
    name: "Scanner 64 barrettes",
    description: "Tomodensitométrie haute résolution pour un diagnostic précis des pathologies complexes",
    icon: ScanLine,
    specs: "Acquisition rapide, faible dose de radiation"
  },
  {
    name: "IRM 1.5 Tesla",
    description: "Imagerie par résonance magnétique pour l'exploration des tissus mous et du système nerveux",
    icon: Monitor,
    specs: "Haute définition, compatible cardiaque"
  },
  {
    name: "Mammographie numérique",
    description: "Dépistage et diagnostic des pathologies mammaires avec technologie numérique avancée",
    icon: Radiation,
    specs: "Faible dose, images haute qualité"
  },
  {
    name: "Échographie 4D",
    description: "Imagerie ultrasonore en temps réel pour examens obstétricaux et diagnostics généraux",
    icon: Heart,
    specs: "Visualisation 3D/4D en temps réel"
  },
  {
    name: "Radiographie numérique",
    description: "Radiologie conventionnelle avec capteurs numériques pour résultats immédiats",
    icon: ScanLine,
    specs: "Faible irradiation, archivage digital"
  },
  {
    name: "Doppler vasculaire",
    description: "Exploration non invasive du système vasculaire artériel et veineux",
    icon: Heart,
    specs: "Couleur et pulsé, mesures précises"
  }
];

const examTypes = [
  {
    category: "Scanner (TDM)",
    exams: ["Scanner cérébral", "Scanner thoracique", "Scanner abdomino-pelvien", "Angioscanner", "Arthroscanner"]
  },
  {
    category: "IRM",
    exams: ["IRM cérébrale", "IRM médullaire", "IRM articulaire", "IRM cardiaque", "IRM abdominale"]
  },
  {
    category: "Échographie",
    exams: ["Échographie abdominale", "Échographie pelvienne", "Échographie obstétricale", "Échographie cardiaque", "Échographie thyroïdienne"]
  },
  {
    category: "Radiologie",
    exams: ["Radiographie standard", "Mammographie", "Panoramique dentaire", "Hystérosalpingographie"]
  }
];

const CISAM = () => {
  return (
    <>
      <Helmet>
        <title>CISAM - Centre d'Imagerie Médicale | PISAM</title>
        <meta 
          name="description" 
          content="CISAM, le Centre d'Imagerie Sainte Anne Marie, dispose d'équipements de pointe : Scanner 64 barrettes, IRM 1.5 Tesla, mammographie numérique à Abidjan."
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
              Technologies d'imagerie avancées pour un diagnostic précis
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Équipements certifiés</h3>
                    <p className="text-muted-foreground text-sm">Matériel aux normes internationales</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Résultats rapides</h3>
                    <p className="text-muted-foreground text-sm">Interprétation en temps réel</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Radiologues experts</h3>
                    <p className="text-muted-foreground text-sm">Spécialistes en imagerie médicale</p>
                  </CardContent>
                </Card>
              </div>

              <div className="prose prose-lg max-w-none text-center">
                <p className="text-muted-foreground leading-relaxed">
                  Le CISAM est le centre d'imagerie médicale de référence de la PISAM. 
                  Équipé d'un <strong>scanner 64 barrettes</strong>, d'une <strong>IRM 1.5 Tesla</strong> 
                  et d'une <strong>mammographie numérique</strong>, il offre une gamme complète d'examens 
                  d'imagerie diagnostique interprétés par des radiologues expérimentés.
                </p>
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
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos Examens
                </h2>
                <p className="text-muted-foreground">
                  Une gamme complète d'examens d'imagerie pour tous vos besoins diagnostiques
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {examTypes.map((category, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-proxima font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-sm">
                          {index + 1}
                        </span>
                        {category.category}
                      </h3>
                      <ul className="space-y-2">
                        {category.exams.map((exam, examIndex) => (
                          <li key={examIndex} className="flex items-center gap-3 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                            <span>{exam}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
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
              Notre équipe de radiologues est disponible pour réaliser vos examens d'imagerie dans les meilleurs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+22527224453"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-secondary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                <Clock className="h-5 w-5" />
                Prendre rendez-vous
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
