import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical, 
  Microscope, 
  TestTube, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  Beaker,
  Activity
} from "lucide-react";

const equipments = [
  {
    name: "Automates d'hématologie",
    description: "Analyse complète des cellules sanguines avec comptage différentiel automatisé",
    icon: Activity
  },
  {
    name: "Analyseurs de biochimie",
    description: "Dosages enzymatiques, métaboliques et ioniques de haute précision",
    icon: Beaker
  },
  {
    name: "Immunohistochimie",
    description: "Détection d'antigènes tissulaires pour le diagnostic oncologique",
    icon: Microscope
  },
  {
    name: "Anatomo-cytopathologie",
    description: "Analyse microscopique des tissus et cellules pour diagnostic précis",
    icon: FlaskConical
  },
  {
    name: "Sérologie infectieuse",
    description: "Dépistage et diagnostic des maladies infectieuses virales et bactériennes",
    icon: TestTube
  },
  {
    name: "Microbiologie",
    description: "Culture et identification des agents pathogènes avec antibiogramme",
    icon: FlaskConical
  }
];

const services = [
  "Hématologie et hémostase",
  "Biochimie générale et spécialisée",
  "Immunologie et auto-immunité",
  "Microbiologie et parasitologie",
  "Sérologie infectieuse",
  "Hormonologie",
  "Marqueurs tumoraux",
  "Toxicologie",
  "Anatomo-cytopathologie",
  "Immunohistochimie"
];

const BioCSAM = () => {
  return (
    <>
      <Helmet>
        <title>BioCSAM - Laboratoire de Biologie Clinique | PISAM</title>
        <meta 
          name="description" 
          content="BioCSAM, le Laboratoire de Biologie Clinique Sainte Anne-Marie, offre des analyses médicales de pointe avec immunohistochimie et anatomo-cytopathologie à Abidjan."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(var(--primary)/0.9), hsl(var(--secondary)/0.85))`
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative z-10 text-center text-white px-4">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm">
              Laboratoire d'excellence
            </Badge>
            <h1 className="font-proxima text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              BioCSAM
            </h1>
            <p className="text-xl md:text-2xl font-light mb-2">
              Laboratoire de Biologie Clinique Sainte Anne-Marie
            </p>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Analyses médicales de haute précision au service de votre santé
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Certifié ISO</h3>
                    <p className="text-muted-foreground text-sm">Normes internationales de qualité</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Résultats rapides</h3>
                    <p className="text-muted-foreground text-sm">Délais optimisés pour urgences</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Équipe experte</h3>
                    <p className="text-muted-foreground text-sm">Biologistes et techniciens qualifiés</p>
                  </CardContent>
                </Card>
              </div>

              <div className="prose prose-lg max-w-none text-center">
                <p className="text-muted-foreground leading-relaxed">
                  Le laboratoire BioCSAM est un centre d'analyses médicales de référence en Côte d'Ivoire. 
                  Équipé des technologies les plus avancées, il propose une gamme complète d'examens biologiques 
                  incluant l'<strong>immunohistochimie</strong> et l'<strong>anatomo-cytopathologie</strong>, 
                  essentiels au diagnostic oncologique et aux pathologies complexes.
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
                Des équipements de dernière génération pour des analyses fiables et précises
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {equipments.map((equipment, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <equipment.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-proxima font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {equipment.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {equipment.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos Analyses
                </h2>
                <p className="text-muted-foreground">
                  Une gamme complète d'examens biologiques pour répondre à tous vos besoins diagnostiques
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                    <span className="text-foreground font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-proxima text-3xl md:text-4xl font-bold mb-4">
              Besoin d'une analyse ?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour vous orienter vers les examens adaptés à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+22527224453"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
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

export default BioCSAM;
