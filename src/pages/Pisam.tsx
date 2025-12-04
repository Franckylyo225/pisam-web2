import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  Heart, 
  Target, 
  Users, 
  Award, 
  Shield, 
  Sparkles,
  CheckCircle2,
  Quote
} from "lucide-react";
import pisamAerial from "@/assets/pisam-aerial-view.jpg";
import doctorMale1 from "@/assets/doctor-male-1.jpg";
import doctorMale2 from "@/assets/doctor-male-2.jpg";
import doctorFemale1 from "@/assets/doctor-female-1.jpg";
import doctorFemale2 from "@/assets/doctor-female-2.jpg";

const leaders = [
  {
    name: "Dr. Jean-Baptiste Kouamé",
    role: "Président Directeur Général",
    image: doctorMale1,
  },
  {
    name: "Dr. Marie-Claire Diallo",
    role: "Directrice Médicale",
    image: doctorFemale1,
  },
  {
    name: "M. Patrick Assi",
    role: "Directeur Administratif et Financier",
    image: doctorMale2,
  },
  {
    name: "Dr. Aminata Koné",
    role: "Directrice des Soins Infirmiers",
    image: doctorFemale2,
  },
  {
    name: "Dr. Emmanuel Yao",
    role: "Directeur Technique",
    image: doctorMale1,
  },
];

const values = [
  {
    icon: Heart,
    title: "Humanité",
    description: "Placer le patient au cœur de nos préoccupations avec compassion et empathie.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Viser les plus hauts standards de qualité dans tous nos soins et services.",
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Agir avec honnêteté, transparence et respect de l'éthique médicale.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Travailler ensemble pour offrir les meilleurs soins à nos patients.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Adopter les dernières avancées médicales et technologiques.",
  },
  {
    icon: Target,
    title: "Engagement",
    description: "Dédier notre expertise au service de la santé de nos patients.",
  },
];

const Pisam = () => {
  return (
    <>
      <Helmet>
        <title>PISAM - Polyclinique Internationale Sainte Anne-Marie | Abidjan</title>
        <meta 
          name="description" 
          content="Découvrez PISAM, Polyclinique Internationale Sainte Anne-Marie. Excellence médicale, équipe dirigeante, mission, valeurs et certification ISO 9001:2015." 
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-pisam-teal to-pisam-turquoise overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                PROFESSIONNELS DE LA SANTÉ
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Votre santé, notre priorité.<br />
                Chaque jour, avec excellence et humanité.
              </p>
            </div>
          </section>

          {/* Présentation Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src={pisamAerial} 
                    alt="Vue aérienne de PISAM" 
                    className="rounded-2xl shadow-pisam w-full object-cover aspect-[4/3]"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden md:block">
                    <p className="text-4xl font-bold">35+</p>
                    <p className="text-sm opacity-90">Années d'excellence</p>
                  </div>
                </div>
                <div>
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    Notre Histoire
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                    Polyclinique Internationale<br />Sainte Anne-Marie (PISAM)
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Fondée en 1987, la Polyclinique Internationale Sainte Anne-Marie (PISAM) est un établissement 
                      de santé de référence en Côte d'Ivoire et en Afrique de l'Ouest. Située au cœur de Cocody à 
                      Abidjan, notre clinique incarne l'excellence médicale africaine.
                    </p>
                    <p>
                      Avec plus de 35 ans d'expérience, PISAM s'est imposée comme un acteur majeur de la santé 
                      privée, offrant des soins de qualité internationale dans un environnement moderne et 
                      accueillant.
                    </p>
                    <p>
                      Notre établissement dispose d'un plateau technique de pointe, d'équipes médicales hautement 
                      qualifiées et d'infrastructures modernes pour répondre à tous vos besoins de santé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mot du PDG Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <img 
                        src={doctorMale1} 
                        alt="PDG de PISAM" 
                        className="rounded-2xl shadow-pisam w-full object-cover aspect-[3/4]"
                      />
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-6 py-3 rounded-xl shadow-lg text-center">
                        <p className="font-semibold text-foreground">Dr. Jean-Baptiste Kouamé</p>
                        <p className="text-sm text-muted-foreground">Président Directeur Général</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <Quote className="h-12 w-12 text-primary/20 mb-4" />
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
                      Le mot du Président
                    </h2>
                    <div className="space-y-4 text-muted-foreground italic">
                      <p>
                        "Depuis plus de trois décennies, PISAM œuvre chaque jour pour offrir à ses patients 
                        des soins de qualité internationale, dans le respect de nos valeurs fondamentales : 
                        l'excellence, l'humanité et l'innovation.
                      </p>
                      <p>
                        Notre engagement envers vous est simple : vous accompagner à chaque étape de votre 
                        parcours de santé avec professionnalisme, compassion et dévouement. Nous investissons 
                        continuellement dans la formation de nos équipes et dans l'acquisition d'équipements 
                        de dernière génération.
                      </p>
                      <p>
                        PISAM, c'est bien plus qu'une clinique. C'est une famille dédiée à votre bien-être, 
                        prête à vous accueillir 24h/24 pour répondre à tous vos besoins de santé."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dirigeants Section */}
          <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Leadership
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  Rencontrez nos dirigeants
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Une équipe de direction expérimentée et engagée pour l'excellence de nos services.
                </p>
              </div>

              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {leaders.map((leader, index) => (
                      <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                        <Card className="border-0 shadow-pisam overflow-hidden group">
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden">
                              <img 
                                src={leader.image} 
                                alt={leader.name}
                                className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-5 text-center bg-background">
                              <h3 className="font-semibold text-foreground text-lg">{leader.name}</h3>
                              <p className="text-sm text-primary">{leader.role}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-lg" />
                  <CarouselNext className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-lg" />
                </Carousel>
              </div>
            </div>
          </section>

          {/* Mission et Valeurs Section */}
          <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Notre ADN
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  Mission & Valeurs
                </h2>
              </div>

              {/* Mission */}
              <div className="mb-20">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className="relative order-2 lg:order-1">
                    <img 
                      src={pisamAerial} 
                      alt="PISAM - Notre mission" 
                      className="rounded-2xl shadow-pisam w-full object-cover aspect-[4/3]"
                    />
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-primary/10 -z-10" />
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-pisam-green/10 -z-10" />
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                        <Target className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-foreground">Votre santé avant tout</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Dispenser des soins généraux et spécialisés de la plus haute qualité à notre clientèle adulte et pédiatrique ainsi qu'à leur famille, tout en mettant l'accent sur la sécurité, l'humanité, le respect et l'empathie.",
                        "Assurer la continuité des soins via le développement d'une politique de réseau.",
                        "Contribuer à l'évolution des pratiques médicales et à la formation continue.",
                        "Développer et promouvoir un environnement de santé propice à assurer la position de leadership de l'établissement.",
                        "Assurer aux membres du personnel et du corps médical un environnement professionnel propre et sûr, garantissant les meilleures conditions de travail."
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Valeurs */}
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Nos Valeurs</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Les valeurs auxquelles nous sommes attachées dictent notre comportement à l'égard de l'ensemble 
                    des patients et de leur famille ainsi qu'auprès des professionnels de l'établissement.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <Card key={index} className="border-0 shadow-pisam hover:shadow-lg transition-shadow duration-300 group">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <value.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground text-sm">{value.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                Besoin d'un rendez-vous ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Notre équipe est à votre disposition pour vous accompagner dans votre parcours de santé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Prendre rendez-vous
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Nous contacter
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Pisam;
