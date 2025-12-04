import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Stethoscope, Clock, Phone, Mail, User } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  category: string;
  phone: string;
  email: string;
  image: string;
  availableDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  consultationHours: string;
}

const doctors: Doctor[] = [
  // Cardiologie
  { id: 1, name: "Dr. Kouassi Yao", specialty: "Cardiologie", category: "Cardiologie", phone: "+225 27 22 44 53 53", email: "k.yao@pisam.ci", image: "", availableDays: [1, 2, 3, 4, 5], consultationHours: "08h00 - 16h00" },
  { id: 2, name: "Dr. Ahoua Marie", specialty: "Cardiologie interventionnelle", category: "Cardiologie", phone: "+225 27 22 44 53 53", email: "a.marie@pisam.ci", image: "", availableDays: [1, 3, 5], consultationHours: "09h00 - 14h00" },
  // Chirurgie
  { id: 3, name: "Dr. Touré Ibrahim", specialty: "Chirurgie générale", category: "Chirurgie", phone: "+225 27 22 44 53 53", email: "t.ibrahim@pisam.ci", image: "", availableDays: [1, 2, 4, 5], consultationHours: "07h30 - 15h00" },
  { id: 4, name: "Dr. Koné Fatou", specialty: "Chirurgie orthopédique", category: "Chirurgie", phone: "+225 27 22 44 53 53", email: "k.fatou@pisam.ci", image: "", availableDays: [2, 3, 4], consultationHours: "08h00 - 14h00" },
  // Pédiatrie
  { id: 5, name: "Dr. Diallo Aminata", specialty: "Pédiatrie générale", category: "Pédiatrie", phone: "+225 27 22 44 53 53", email: "d.aminata@pisam.ci", image: "", availableDays: [1, 2, 3, 4, 5], consultationHours: "08h00 - 17h00" },
  { id: 6, name: "Dr. Bamba Sekou", specialty: "Néonatologie", category: "Pédiatrie", phone: "+225 27 22 44 53 53", email: "b.sekou@pisam.ci", image: "", availableDays: [1, 3, 4, 5], consultationHours: "09h00 - 16h00" },
  // Gynécologie
  { id: 7, name: "Dr. Ouattara Mariam", specialty: "Gynécologie-Obstétrique", category: "Gynécologie", phone: "+225 27 22 44 53 53", email: "o.mariam@pisam.ci", image: "", availableDays: [1, 2, 3, 4, 5], consultationHours: "08h00 - 16h00" },
  { id: 8, name: "Dr. N'Guessan Aya", specialty: "Médecine de la reproduction", category: "Gynécologie", phone: "+225 27 22 44 53 53", email: "n.aya@pisam.ci", image: "", availableDays: [2, 4], consultationHours: "10h00 - 15h00" },
  // Neurologie
  { id: 9, name: "Dr. Coulibaly Moussa", specialty: "Neurologie", category: "Neurologie", phone: "+225 27 22 44 53 53", email: "c.moussa@pisam.ci", image: "", availableDays: [1, 2, 3, 5], consultationHours: "08h30 - 15h30" },
  // Ophtalmologie
  { id: 10, name: "Dr. Konan Serge", specialty: "Ophtalmologie", category: "Ophtalmologie", phone: "+225 27 22 44 53 53", email: "k.serge@pisam.ci", image: "", availableDays: [1, 3, 4, 5], consultationHours: "09h00 - 16h00" },
  // Dermatologie
  { id: 11, name: "Dr. Aka Christelle", specialty: "Dermatologie", category: "Dermatologie", phone: "+225 27 22 44 53 53", email: "a.christelle@pisam.ci", image: "", availableDays: [2, 3, 5], consultationHours: "08h00 - 14h00" },
  // Médecine interne
  { id: 12, name: "Dr. Diabaté Lamine", specialty: "Médecine interne", category: "Médecine interne", phone: "+225 27 22 44 53 53", email: "d.lamine@pisam.ci", image: "", availableDays: [1, 2, 3, 4, 5], consultationHours: "08h00 - 17h00" },
];

const categories = [...new Set(doctors.map(d => d.category))];

const Medecins = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredDoctors = selectedCategory 
    ? doctors.filter(d => d.category === selectedCategory)
    : doctors;

  const isDayAvailable = (date: Date) => {
    if (!selectedDoctor) return false;
    const dayOfWeek = date.getDay();
    return selectedDoctor.availableDays.includes(dayOfWeek);
  };

  const groupedDoctors = categories.reduce((acc, category) => {
    acc[category] = filteredDoctors.filter(d => d.category === category);
    return acc;
  }, {} as Record<string, Doctor[]>);

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

        {/* Category Filter */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedCategory(null)}
              >
                Toutes les spécialités
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Directory */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {Object.entries(groupedDoctors).map(([category, categoryDoctors]) => (
              categoryDoctors.length > 0 && (
                <div key={category} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Stethoscope className="h-6 w-6 text-primary" />
                    <h2 className="font-proxima text-2xl md:text-3xl font-bold text-foreground">
                      {category}
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                      {categoryDoctors.length} médecin{categoryDoctors.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryDoctors.map((doctor) => (
                      <Card 
                        key={doctor.id}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setSelectedDate(undefined);
                        }}
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
              )
            ))}
          </div>
        </section>
      </main>

      {/* Doctor Availability Modal */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg sm:col-span-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Heures de consultation</p>
                    <p className="text-sm font-medium">{selectedDoctor.consultationHours}</p>
                  </div>
                </div>
              </div>

              {/* Availability Calendar */}
              <div>
                <h4 className="font-proxima font-semibold mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Calendrier de disponibilité
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Les jours colorés indiquent les disponibilités du médecin. Sélectionnez une date pour prendre rendez-vous.
                </p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-lg border shadow-sm pointer-events-auto"
                    modifiers={{
                      available: (date) => isDayAvailable(date) && date >= new Date(),
                    }}
                    modifiersStyles={{
                      available: {
                        backgroundColor: 'hsl(var(--accent))',
                        color: 'hsl(var(--accent-foreground))',
                        fontWeight: 'bold',
                      }
                    }}
                    disabled={(date) => !isDayAvailable(date) || date < new Date()}
                  />
                </div>
                
                {selectedDate && (
                  <div className="mt-4 p-4 bg-accent/20 rounded-lg text-center">
                    <p className="text-sm font-medium text-foreground">
                      Date sélectionnée : {selectedDate.toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Contactez-nous au +225 27 22 44 53 53 pour confirmer votre rendez-vous
                    </p>
                  </div>
                )}
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
