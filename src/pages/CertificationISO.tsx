import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, CheckCircle, Target, Award, Users, TrendingUp } from "lucide-react";

const CertificationISO = () => {
  const strategicObjectives = [
    "Offrir de nouveaux services à nos clients pour répondre à leurs besoins",
    "Bâtir une organisation performante offrant un environnement de travail incitatif",
    "Réaliser l'excellence opérationnelle",
    "Renforcer la position de leader sur le marché national et sous-régional",
    "Consolider la viabilité financière de l'entreprise"
  ];

  const commitments = [
    {
      icon: Users,
      text: "Satisfaire aux exigences des clients et aux exigences légales et réglementaires"
    },
    {
      icon: Award,
      text: "Satisfaire aux attentes de notre personnel dans la mesure de nos moyens"
    },
    {
      icon: TrendingUp,
      text: "Fournir les ressources nécessaires au bon fonctionnement de notre système qualité"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Certification ISO 9001:2015 | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Découvrez la politique qualité et la certification ISO 9001:2015 de la PISAM, leader des établissements de santé en Côte d'Ivoire." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary min-h-[50vh] flex items-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Notre Politique Qualité
              </h1>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-xl md:text-2xl font-semibold">
                  Certifiée ISO 9001:2015
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Depuis sa création en 1985, la Polyclinique Internationale Sainte Anne-Marie (PISAM) s'est engagée dans une dynamique d'amélioration continue de la qualité de ses prestations, faisant d'elle, le leader des établissements de santé de la sous-région. Tout est mis en œuvre pour apporter aux patients les meilleurs soins possibles et leur assurer une prise en charge dans des conditions optimales de sécurité et de confort.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Notre mission de professionnels de la santé nous obligeant à une plus grande responsabilité et exemplarité, la PISAM s'est engagée depuis 2009 dans une démarche qualité soldée par la certification de nombreuses activités conformes aux exigences de la norme ISO 9001:2008.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Approach */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Démarche Stratégique Novatrice
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  En décidant d'étendre la certification à l'ensemble de ses activités, la Direction de la PISAM s'est engagée dans une démarche stratégique novatrice, axée sur la maîtrise des risques et l'évaluation des pratiques de soins.
                </p>
              </div>

              <div className="bg-background rounded-2xl shadow-lg p-8 md:p-12">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-center">
                  Objectifs Stratégiques 2016-2018
                </h3>
                <div className="space-y-4">
                  {strategicObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-foreground font-medium">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos Engagements
                </h2>
                <p className="text-lg text-muted-foreground">
                  La PISAM s'engage à respecter les standards les plus élevés
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {commitments.map((commitment, index) => (
                  <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 text-center border border-primary/10 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <commitment.icon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{commitment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values & Ethics */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-background rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                  Éthique et Valeurs
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Notre politique qualité veille également au respect des valeurs auxquelles nous sommes attachées, notamment l'éthique, le respect de la déontologie médicale et de la personne humaine.
                </p>
                <div className="border-t border-border pt-8">
                  <p className="text-muted-foreground text-center">
                    Notre politique en matière de qualité est évaluée au cours des revues de Direction organisées au moins une fois par an, et constituant le cadre pour définir et revoir les objectifs qualité fixés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CertificationISO;
