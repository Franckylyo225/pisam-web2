import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Stethoscope, Clock, Phone, Mail, Search } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  category: string;
  phone: string;
  email: string;
  image: string;
  availableDays: string[];
  consultationHours: string;
}

interface SpecialtyInfo {
  name: string;
  description: string;
}

const specialtyDescriptions: Record<string, SpecialtyInfo> = {
  "Cardiologie": {
    name: "Cardiologie",
    description: "La cardiologie est la spécialité médicale qui étudie le cœur et les vaisseaux sanguins. Nos cardiologues prennent en charge les maladies cardiovasculaires : hypertension artérielle, insuffisance cardiaque, troubles du rythme, maladies coronariennes et valvulopathies."
  },
  "Chirurgie": {
    name: "Chirurgie",
    description: "Notre service de chirurgie offre une prise en charge complète des pathologies nécessitant une intervention chirurgicale. Nos chirurgiens sont spécialisés en chirurgie générale, orthopédique, digestive et traumatologique."
  },
  "Pédiatrie": {
    name: "Pédiatrie",
    description: "La pédiatrie est consacrée à la santé et au développement de l'enfant, de la naissance à l'adolescence. Nos pédiatres assurent le suivi médical, les vaccinations et le traitement des maladies infantiles."
  },
  "Gynécologie": {
    name: "Gynécologie",
    description: "Notre service de gynécologie-obstétrique accompagne les femmes tout au long de leur vie : suivi gynécologique, contraception, grossesse, accouchement et prise en charge des pathologies féminines."
  },
  "Neurologie": {
    name: "Neurologie",
    description: "La neurologie traite les maladies du système nerveux central et périphérique : migraines, épilepsie, AVC, maladie de Parkinson, sclérose en plaques et troubles de la mémoire."
  },
  "Ophtalmologie": {
    name: "Ophtalmologie",
    description: "L'ophtalmologie prend en charge toutes les pathologies de l'œil et de la vision : troubles de la réfraction, cataracte, glaucome, dégénérescence maculaire et chirurgie réfractive."
  },
  "Dermatologie": {
    name: "Dermatologie",
    description: "La dermatologie traite les maladies de la peau, des cheveux et des ongles : acné, eczéma, psoriasis, allergies cutanées, infections et dépistage des cancers de la peau."
  },
  "Médecine interne": {
    name: "Médecine interne",
    description: "La médecine interne est une spécialité de synthèse qui prend en charge les patients présentant des pathologies complexes ou multiples, nécessitant une approche diagnostique globale."
  }
};

const doctors: Doctor[] = [
  { id: 1, name: "Dr. Kouassi Yao", specialty: "Cardiologie", category: "Cardiologie", phone: "+225 27 22 44 53 53", email: "k.yao@pisam.ci", image: "", availableDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"], consultationHours: "08h00 - 16h00" },
  { id: 2, name: "Dr. Ahoua Marie", specialty: "Cardiologie interventionnelle", category: "Cardiologie", phone: "+225 27 22 44 53 53", email: "a.marie@pisam.ci", image: "", availableDays: ["Lundi", "Mercredi", "Vendredi"], consultationHours: "09h00 - 14h00" },
  { id: 3, name: "Dr. Touré Ibrahim", specialty: "Chirurgie générale", category: "Chirurgie", phone: "+225 27 22 44 53 53", email: "t.ibrahim@pisam.ci", image: "", availableDays: ["Lundi", "Mardi", "Jeudi", "Vendredi"], consultationHours: "07h30 - 15h00" },
  { id: 4, name: "Dr. Koné Fatou", specialty: "Chirurgie orthopédique", category: "Chirurgie", phone: "+225 27 22 44 53 53", email: "k.fatou@pisam.ci", image: "", availableDays: ["Mardi", "Mercredi", "Jeudi"], consultationHours: "08h00 - 14h00" },
  { id: 5, name: "Dr. Diallo Aminata", specialty: "Pédiatrie générale", category: "Pédiatrie", phone: "+225 27 22 44 53 53", email: "d.aminata@pisam.ci", image: "", availableDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"], consultationHours: "08h00 - 17h00" },
  { id: 6, name: "Dr. Bamba Sekou", specialty: "Néonatologie", category: "Pédiatrie", phone: "+225 27 22 44 53 53", email: "b.sekou@pisam.ci", image: "", availableDays: ["Lundi", "Mercredi", "Jeudi", "Vendredi"], consultationHours: "09h00 - 16h00" },
  { id: 7, name: "Dr. Ouattara Mariam", specialty: "Gynécologie-Obstétrique", category: "Gynécologie", phone: "+225 27 22 44 53 53", email: "o.mariam@pisam.ci", image: "", availableDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"], consultationHours: "08h00 - 16h00" },
  { id: 8, name: "Dr. N'Guessan Aya", specialty: "Médecine de la reproduction", category: "Gynécologie", phone: "+225 27 22 44 53 53", email: "n.aya@pisam.ci", image: "", availableDays: ["Mardi", "Jeudi"], consultationHours: "10h00 - 15h00" },
  { id: 9, name: "Dr. Coulibaly Moussa", specialty: "Neurologie", category: "Neurologie", phone: "+225 27 22 44 53 53", email: "c.moussa@pisam.ci", image: "", availableDays: ["Lundi", "Mardi", "Mercredi", "Vendredi"], consultationHours: "08h30 - 15h30" },
  { id: 10, name: "Dr. Konan Serge", specialty: "Ophtalmologie", category: "Ophtalmologie", phone: "+225 27 22 44 53 53", email: "k.serge@pisam.ci", image: "", availableDays: ["Lundi", "Mercredi", "Jeudi", "Vendredi"], consultationHours: "09h00 - 16h00" },
  { id: 11, name: "Dr. Aka Christelle", specialty: "Dermatologie", category: "Dermatologie", phone: "+225 27 22 44 53 53", email: "a.christelle@pisam.ci", image: "", availableDays: ["Mardi", "Mercredi", "Vendredi"], consultationHours: "08h00 - 14h00" },
  { id: 12, name: "Dr. Diabaté Lamine", specialty: "Médecine interne", category: "Médecine interne", phone: "+225 27 22 44 53 53", email: "d.lamine@pisam.ci", image: "", availableDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"], consultationHours: "08h00 - 17h00" },
];

const categories = [...new Set(doctors.map(d => d.category))];

const Medecins = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDoctors = doctors.filter(d => {
    const matchesCategory = selectedCategory ? d.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? d.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;
    return matchesCategory && matchesSearch;
  });

  const currentSpecialtyInfo = selectedCategory ? specialtyDescriptions[selectedCategory] : null;
  const showDoctors = selectedCategory || searchQuery;

  return (
    <>
      <Helmet>
        <title>Nos Médecins - PISAM | Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Découvrez notre équipe médicale d'excellence. Consultez l'annuaire des praticiens par spécialité et leurs disponibilités." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary)/0.9), hsl(var(--secondary)/0.8)), url('/placeholder.svg')`
            }}
          />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-proxima text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Nos Médecins
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Une équipe de spécialistes dévoués à votre santé
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Search Bar */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
                  Rechercher un médecin par nom
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tapez le nom d'un médecin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 text-lg bg-background border-2 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Specialty Select */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
                  Ou filtrer par spécialité médicale
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-14 text-lg bg-background border-2 border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Choisir une spécialité..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-base py-3">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Specialty Description & Doctors */}
        {showDoctors && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              {/* Specialty Description */}
              {currentSpecialtyInfo && (
                <div className="max-w-3xl mx-auto mb-12 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Stethoscope className="h-8 w-8 text-primary" />
                    <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground">
                      {currentSpecialtyInfo.name}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {currentSpecialtyInfo.description}
                  </p>
                </div>
              )}
              
              {/* Results Count */}
              <div className="text-center mb-8">
                <Badge variant="secondary">
                  {filteredDoctors.length} médecin{filteredDoctors.length > 1 ? 's' : ''} trouvé{filteredDoctors.length > 1 ? 's' : ''}
                </Badge>
              </div>

              {/* Doctors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card 
                    key={doctor.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                          {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-proxima font-semibold text-foreground group-hover:text-primary transition-colors">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{doctor.consultationHours}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-xs text-primary font-medium">
                          Cliquez pour voir les disponibilités →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!showDoctors && (
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
              <Stethoscope className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground">
                Recherchez un médecin ou sélectionnez une spécialité
              </h3>
            </div>
          </section>
        )}
      </main>

      {/* Doctor Availability Modal */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                {selectedDoctor?.name.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-proxima text-xl font-bold">{selectedDoctor?.name}</h3>
                <p className="text-sm text-muted-foreground font-normal">{selectedDoctor?.specialty}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedDoctor && (
            <div className="space-y-6 mt-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <p className="text-sm font-medium">{selectedDoctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{selectedDoctor.email}</p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h4 className="font-proxima font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Disponibilités
                </h4>
                
                {/* Days */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Jours de consultation</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.availableDays.map((day) => (
                      <Badge key={day} variant="secondary" className="bg-accent/20 text-accent-foreground">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Horaires</p>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">
                      {selectedDoctor.consultationHours}
                    </p>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Pour prendre rendez-vous, contactez-nous au
                  </p>
                  <p className="text-lg font-bold text-primary mt-1">
                    +225 27 22 44 53 53
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};

export default Medecins;
