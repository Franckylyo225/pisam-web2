import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Monitor, Building2, Cpu, GraduationCap, CheckCircle, Sparkles } from "lucide-react";
import digitalSystemImg from "@/assets/pisam-digital-system.jpg";
import renovationImg from "@/assets/pisam-renovation.jpg";
import operatingRoomImg from "@/assets/pisam-operating-room.jpg";
import staffTrainingImg from "@/assets/pisam-staff-training.jpg";

const Pisam2 = () => {
  const innovations = [
    {
      icon: Monitor,
      title: "Système d'Information Hospitalier (SIH)",
      description: "Un système performant et novateur",
      image: digitalSystemImg,
      features: [
        "L'informatisation des procédures de travail",
        "Un gain de temps dans les relations médecin-patient",
        "Un suivi des patients plus fiable et plus rapide"
      ]
    },
    {
      icon: Building2,
      title: "Rénovation des infrastructures",
      description: "Des installations modernisées",
      image: renovationImg,
      features: [
        "L'accroissement de la capacité d'accueil",
        "La réhabilitation complète du bâtiment avec de nouveaux services"
      ]
    },
    {
      icon: Cpu,
      title: "Renouvellement du plateau technique",
      description: "Équipements de pointe",
      image: operatingRoomImg,
      features: [
        "Des blocs opératoires aux standards internationaux (ISO 5 et ISO 6)",
        "Un service d'imagerie rénové comprenant un IRM 1,5 T",
        "Un service de réanimation et de surveillance continue agrandi et équipé"
      ]
    },
    {
      icon: GraduationCap,
      title: "Personnel encore plus compétent",
      description: "Excellence humaine",
      image: staffTrainingImg,
      features: [
        "La formation continue du personnel aux nouvelles techniques médicales",
        "Des conventions de partenariat avec de grandes institutions hospitalières"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>PISAM 2.0 - Transformation Digitale | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Découvrez PISAM 2.0, le projet de transformation digitale de la PISAM pour devenir le hub régional de la santé en Afrique." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Innovation & Excellence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                PISAM 2.0
              </h1>
              <p className="text-xl md:text-2xl font-light opacity-90">
                Un hôpital digital proche de vous
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                  10 milliards FCFA d'investissement
                </span>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
                Depuis plus de 30 ans, la PISAM a excellé aussi bien dans l'innovation technologique que dans la qualité des soins aux patients. Aujourd'hui, le projet PISAM 2.0, émane d'un souhait réel de consolider la position de la PISAM en tant que <strong className="text-foreground">hub régional de la santé en Afrique</strong>. Grâce à une levée de fonds d'environ 10 milliards en début d'année 2016, la PISAM 2.0 est en cours de concrétisation.
              </p>
            </div>
          </div>
        </section>

        {/* Innovations */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Les Piliers de PISAM 2.0
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quatre axes majeurs pour une transformation complète
              </p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {innovations.map((innovation, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={innovation.image} 
                        alt={innovation.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <innovation.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {innovation.title}
                    </h3>
                    <p className="text-lg text-primary font-medium mb-6">
                      {innovation.description}
                    </p>
                    <div className="space-y-4">
                      {innovation.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mt-0.5">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                          </div>
                          <p className="text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              L'avenir de la santé en Afrique
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              PISAM 2.0 représente notre engagement pour offrir des soins de classe mondiale à tous nos patients.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Pisam2;
