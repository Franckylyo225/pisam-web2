import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar, Shield, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";

const slides = [
  {
    image: heroSlide1,
    subtitle: "GROUPE PISAM",
    title: "Un havre de santé au cœur d'Abidjan",
    description: "Depuis plus de trois décennies, la PISAM incarne l'excellence médicale en Côte d'Ivoire. Au cœur d'Abidjan, notre hôpital allie expertise, humanité et innovation pour offrir des soins de qualité, dans un environnement moderne et bienveillant.",
  },
  {
    image: heroSlide2,
    subtitle: "PISAM 2.0",
    title: "Un hôpital plus proche de vous",
    description: "La PISAM se réinvente pour mieux répondre à vos besoins. Grâce à des services digitalisés, une meilleure accessibilité et des équipes toujours à votre écoute, nous rapprochons la qualité des soins de chaque patient, où qu'il soit.",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="accueil" className="relative min-h-[90vh] overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Blue Filter Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pisam-teal/85 via-pisam-teal/75 to-pisam-turquoise/70" />
            </div>
          ))}
        </div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 20 L30 40 M20 30 L40 30" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    selectedIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute pointer-events-none"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
                    <Shield className="h-4 w-4" />
                    <span>{slide.subtitle}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                    {slide.description}
                  </p>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button variant="hero-outline" size="xl" className="group">
                  <Calendar className="h-5 w-5" />
                  Prendre Rendez-vous
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="hero" size="xl" className="bg-white text-pisam-teal hover:bg-white/90">
                  <Phone className="h-5 w-5" />
                  +225 27 22 44 53 53
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Certifié</div>
                    <div className="text-sm text-white/70">ISO 9001</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xl font-bold">24</span>
                  </div>
                  <div>
                    <div className="font-semibold">Urgences</div>
                    <div className="text-sm text-white/70">24h/24 - 7j/7</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xl font-bold">50+</span>
                  </div>
                  <div>
                    <div className="font-semibold">Spécialités</div>
                    <div className="text-sm text-white/70">Médicales</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right content - Stats cards */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-white/10 rounded-2xl">
                      <div className="text-4xl font-bold text-white mb-2">30+</div>
                      <div className="text-white/70 text-sm">Années d'expérience</div>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-2xl">
                      <div className="text-4xl font-bold text-white mb-2">150+</div>
                      <div className="text-white/70 text-sm">Médecins spécialistes</div>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-2xl">
                      <div className="text-4xl font-bold text-white mb-2">500K+</div>
                      <div className="text-white/70 text-sm">Patients soignés</div>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-2xl">
                      <div className="text-4xl font-bold text-white mb-2">98%</div>
                      <div className="text-white/70 text-sm">Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-pisam-green text-white px-6 py-3 rounded-xl shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    <span className="font-semibold">Urgences ouvertes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Slide suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
