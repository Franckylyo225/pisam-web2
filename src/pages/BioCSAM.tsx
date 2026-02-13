import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import biocsamHero from "@/assets/biocsam-hero.jpg";
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

const disciplines = [
  {
    name: "Hématologie",
    description: "Centre performant gérant en plus une banque de sang pour l'hospitalisation.",
    icon: Activity
  },
  {
    name: "Microbiologie",
    description: "Unité équipée d'automates de dernière génération.",
    icon: FlaskConical
  },
  {
    name: "Biochimie",
    description: "Chaîne entièrement automatisée révolutionnant le rendu des CIA (Culture, Identification, Antibiogramme) en moins de 24h.",
    icon: Beaker
  },
  {
    name: "Anatomie Cytho-Pathologique (Ana-Path)",
    description: "À partir des prélèvements cellulaires ou tissulaires, diagnostic basé sur l'interprétation macroscopique et microscopique des prélèvements biopsiques, chirurgicaux ou cytologiques. Première unité à pratiquer l'extemporanée.",
    icon: Microscope
  },
  {
    name: "Immuno-Histo-Chimie",
    description: "Pour compléter la gamme technique d'Ana-Path et maîtriser la totalité de l'activité.",
    icon: TestTube
  }
];

const checkups = [
  "Le bilan de santé individuel, universellement recommandé pour détecter tôt d'éventuelles maladies",
  "Le bilan d'embauche",
  "La visite annuelle d'entreprise",
  "Les bilans ciblés (cardiaque, pédiatrique, hormonal, etc.)",
  "Les analyses de routine (bilan demandé par votre médecin lors des consultations, prise en charge par assurance)",
  "Bilan annuel exigé par la CNPS"
];

const BioCSAM = () => {
  return (
    <>
      <Helmet>
        <title>BioCSAM - Laboratoire de Biologie Clinique Sainte Anne-Marie | PISAM</title>
        <meta 
          name="description" 
          content="BioCSAM, le Laboratoire de Biologie Clinique Sainte Anne-Marie, certifié ISO 9001. Analyses médicales 24h/24, 7j/7 à Abidjan. Hématologie, biochimie, anatomie pathologique."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* Hero Section - kept intact */}
        <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(var(--primary)/0.85), hsl(var(--secondary)/0.8)), url(${biocsamHero})`
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
                    <h3 className="font-proxima font-semibold text-lg mb-2">Certifié ISO 9001</h3>
                    <p className="text-muted-foreground text-sm">Certification BSI obtenue en décembre 2013</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">24h/24 – 7j/7</h3>
                    <p className="text-muted-foreground text-sm">Au service des patients et équipes médicales en continu</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-proxima font-semibold text-lg mb-2">Ouvert à tous</h3>
                    <p className="text-muted-foreground text-sm">Patients internes et externes sur prescription médicale</p>
                  </CardContent>
                </Card>
              </div>

              <div className="prose prose-lg max-w-none text-center space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Engagée dans le système management par la qualité depuis 2007, la PISAM a ciblé la certification 
                  de ses services en démarche qualité. Le but de la PISAM a toujours été la conformité aux normes 
                  de qualité internationales, afin d'offrir à ses patients un accueil et une prise en charge personnalisés.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  C'est dans cette optique que le laboratoire <strong>BioCSAM</strong> (Laboratoire de Biologie Clinique 
                  Sainte Anne-Marie) a vu le jour et a obtenu la certification (BSI) <strong>ISO 9001, version 2008</strong> en décembre 2013.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Laboratoire conventionné, il est au service des patients et des équipes médicales et soignantes de 
                  l'établissement <strong>24h/24 et 7j/7</strong>. Il est également ouvert à tout patient extérieur 
                  pour la réalisation des analyses prescrites par son médecin traitant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Check-ups */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Les services du laboratoire
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Plus une maladie est détectée tôt, meilleure sera la prise en charge et le traitement. 
                  Le laboratoire BioCSAM offre une variété de « check-up ».
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {checkups.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background hover:bg-primary/5 transition-colors border border-border/50"
                  >
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Disciplines biologiques */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                Disciplines biologiques
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Le laboratoire BioCSAM assure la quasi-totalité des disciplines biologiques grâce à plusieurs unités spécialisées.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {disciplines.map((discipline, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <discipline.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-proxima font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {discipline.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {discipline.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Informations pratiques */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Informations pratiques
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-proxima font-semibold text-lg text-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Localisation & Horaires
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Localisation :</strong> Rez-de-chaussée de la PISAM</p>
                      <p><strong>Horaires :</strong> Du lundi au dimanche, 7h00 à 18h30</p>
                      <p><strong>Urgences :</strong> 24h/24 et 7j/7</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-proxima font-semibold text-lg text-foreground flex items-center gap-2">
                      <Users className="h-5 w-5 text-secondary" />
                      Contacts
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p><strong>Secrétariat / RDV :</strong> (225) 27 22 48 31 23</p>
                      <p><strong>Service commercial :</strong> (225) 27 22 48 31 04</p>
                      <p><strong>Standard :</strong> (225) 27 22 48 31 31</p>
                      <p><strong>Email :</strong> bilandesanté@pisam.ci</p>
                    </div>
                  </CardContent>
                </Card>
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
                href="tel:+2252722483123"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                <Clock className="h-5 w-5" />
                Prendre rendez-vous : 27 22 48 31 23
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
