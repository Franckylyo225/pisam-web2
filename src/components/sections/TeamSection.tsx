import { Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import doctorMale1 from "@/assets/doctor-male-1.jpg";
import doctorFemale1 from "@/assets/doctor-female-1.jpg";
import doctorMale2 from "@/assets/doctor-male-2.jpg";
import doctorFemale2 from "@/assets/doctor-female-2.jpg";

const doctors = [
  {
    name: "Dr. Kouamé Yao",
    specialty: "Cardiologie",
    experience: "25 ans d'expérience",
    education: "Université de Bordeaux",
    image: doctorMale1,
  },
  {
    name: "Dr. Awa Diallo",
    specialty: "Gynécologie-Obstétrique",
    experience: "20 ans d'expérience",
    education: "Université de Dakar",
    image: doctorFemale1,
  },
  {
    name: "Dr. Jean-Marc Bédié",
    specialty: "Chirurgie Générale",
    experience: "18 ans d'expérience",
    education: "Université de Paris",
    image: doctorMale2,
  },
  {
    name: "Dr. Marie-Claire Koné",
    specialty: "Pédiatrie",
    experience: "15 ans d'expérience",
    education: "Université d'Abidjan",
    image: doctorFemale2,
  },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Notre Équipe
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Des experts dévoués à votre santé
          </h2>
          <p className="text-lg text-muted-foreground">
            Notre équipe médicale réunit des spécialistes de renommée internationale, 
            formés dans les meilleures universités et engagés envers l'excellence.
          </p>
        </div>

        {/* Doctors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className="group bg-card rounded-2xl overflow-hidden shadow-pisam hover:shadow-pisam-lg transition-all duration-300 hover:-translate-y-2 border border-border/50"
            >
              {/* Doctor image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button variant="hero-outline" size="sm">
                    Voir le profil
                  </Button>
                </div>
              </div>
              
              {/* Doctor info */}
              <div className="p-6">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {doctor.specialty}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-pisam-gold" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-pisam-turquoise" />
                    <span>{doctor.education}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg">
            Voir toute l'équipe médicale
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
