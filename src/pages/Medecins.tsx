import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import medecinsHero from "@/assets/medecins-hero.png";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Clock, Phone, Mail, Loader2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Specialty {
  id: string;
  name: string;
  description: string | null;
}

interface Doctor {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  bio: string | null;
  image_url: string | null;
  available_days: string[] | null;
  available_hours: string | null;
  specialty: Specialty | null;
}

const Medecins = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch specialties
      const { data: specialtiesData } = await supabase
        .from('specialties')
        .select('id, name, description')
        .eq('is_active', true)
        .order('name');
      
      // Fetch doctors with their specialty
      const { data: doctorsData } = await supabase
        .from('doctors')
        .select(`
          id,
          name,
          phone,
          email,
          bio,
          image_url,
          available_days,
          available_hours,
          specialty_id
        `)
        .eq('is_active', true)
        .order('name');

      if (specialtiesData) {
        setSpecialties(specialtiesData);
      }

      if (doctorsData && specialtiesData) {
        // Map doctors with their specialty
        const doctorsWithSpecialty = doctorsData.map(doctor => ({
          ...doctor,
          specialty: specialtiesData.find(s => s.id === doctor.specialty_id) || null
        }));
        setDoctors(doctorsWithSpecialty);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredDoctors = selectedSpecialty === "all"
    ? doctors
    : doctors.filter(d => d.specialty?.id === selectedSpecialty);

  const currentSpecialty = selectedSpecialty !== "all" 
    ? specialties.find(s => s.id === selectedSpecialty) 
    : null;

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      // Get first letter of last two words (e.g., "Pr DROGBA Landry" -> "DL")
      return parts.slice(-2).map(n => n[0]).join('').toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

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
              backgroundImage: `linear-gradient(to right, hsl(var(--primary)/0.85), hsl(var(--secondary)/0.75)), url(${medecinsHero})`
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

        {/* Specialty Selector */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">
                Sélectionnez une spécialité médicale
              </label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full h-14 text-lg bg-background border-2 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Choisir une spécialité..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-base py-3 font-medium">
                    Tous nos médecins
                  </SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.id} className="text-base py-3">
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Specialty Description & Doctors */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Specialty Description */}
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Stethoscope className="h-8 w-8 text-primary" />
                <h2 className="font-proxima text-3xl md:text-4xl font-bold text-foreground">
                  {currentSpecialty ? currentSpecialty.name : "Tous nos médecins"}
                </h2>
              </div>
              {currentSpecialty?.description && (
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {currentSpecialty.description}
                </p>
              )}
              <Badge variant="secondary" className="mt-4">
                {filteredDoctors.length} médecin{filteredDoctors.length > 1 ? 's' : ''} disponible{filteredDoctors.length > 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Chargement des médecins...</span>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Aucun médecin trouvé pour cette spécialité.</p>
              </div>
            ) : (
              /* Doctors Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card 
                    key={doctor.id}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {doctor.image_url ? (
                          <img 
                            src={doctor.image_url} 
                            alt={doctor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                            {getInitials(doctor.name)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-proxima font-semibold text-foreground group-hover:text-primary transition-colors">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty?.name || "Spécialité non définie"}
                          </p>
                        </div>
                      </div>
                      
                      {doctor.available_hours && (
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <span>{doctor.available_hours}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-xs text-primary font-medium">
                          Cliquez pour voir les disponibilités →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Doctor Availability Modal */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedDoctor?.image_url ? (
                <img 
                  src={selectedDoctor.image_url} 
                  alt={selectedDoctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {selectedDoctor && getInitials(selectedDoctor.name)}
                </div>
              )}
              <div>
                <h3 className="font-proxima text-xl font-bold">{selectedDoctor?.name}</h3>
                <p className="text-sm text-muted-foreground font-normal">
                  {selectedDoctor?.specialty?.name || "Spécialité non définie"}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {selectedDoctor && (
            <div className="space-y-6 mt-4">
              {/* Bio */}
              {selectedDoctor.bio && (
                <p className="text-muted-foreground text-sm">{selectedDoctor.bio}</p>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDoctor.phone && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Téléphone</p>
                      <p className="text-sm font-medium">{selectedDoctor.phone}</p>
                    </div>
                  </div>
                )}
                {selectedDoctor.email && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{selectedDoctor.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h4 className="font-proxima font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Disponibilités
                </h4>
                
                {/* Days */}
                {selectedDoctor.available_days && selectedDoctor.available_days.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Jours de consultation</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.available_days.map((day) => (
                        <Badge key={day} variant="secondary" className="bg-accent/20 text-accent-foreground">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hours */}
                {selectedDoctor.available_hours && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Horaires</p>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-lg font-semibold text-primary">
                        {selectedDoctor.available_hours}
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Pour prendre rendez-vous, contactez-nous au
                  </p>
                  <a href="tel:+22527224831 12" className="text-lg font-bold text-primary mt-1 block hover:underline">
                    +225 27 22 48 31 12
                  </a>
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
