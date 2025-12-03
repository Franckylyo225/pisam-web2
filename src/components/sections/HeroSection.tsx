import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlidePisamPlus from "@/assets/hero-slide-pisam-plus.jpg";

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
  {
    image: heroSlidePisamPlus,
    subtitle: "CARTE PISAM+",
    title: "Santé, technologie et paix d'esprit",
    description: "Avec la carte PISAM+, bénéficiez d'une expérience de santé simplifiée et connectée. Accédez à vos services médicaux, à vos suivis personnalisés et à des avantages exclusifs pour une prise en charge rapide et sereine.",
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

      {/* Content - Centered */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  selectedIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none flex items-center justify-center"
                }`}
              >
                <div className={selectedIndex === index ? "" : "max-w-4xl mx-auto px-4"}>
                  {/* Subtitle badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 tracking-wider uppercase">
                    <Shield className="h-4 w-4" />
                    <span>{slide.subtitle}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 tracking-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA Buttons - Always visible */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="xl" 
                className="bg-pisam-green hover:bg-pisam-green/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Calendar className="h-5 w-5" />
                Prendre Rendez-vous
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="xl" 
                className="bg-white text-pisam-teal hover:bg-white/95 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                +225 27 22 44 53 53
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-pisam-gold/30 flex items-center justify-center">
                  <span className="text-pisam-gold font-bold text-sm">ISO</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Certifié</div>
                  <div className="text-xs text-white/70">ISO 9001</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-red-500/30 flex items-center justify-center">
                  <span className="text-red-300 font-bold text-sm">24</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Urgences</div>
                  <div className="text-xs text-white/70">24h/24 - 7j/7</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-pisam-turquoise/30 flex items-center justify-center">
                  <span className="text-pisam-turquoise font-bold text-sm">50+</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Spécialités</div>
                  <div className="text-xs text-white/70">Médicales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation - Left side */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "h-8 bg-white"
                  : "h-2 bg-white/50 hover:bg-white/70"
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
    </section>
  );
};

export default HeroSection;
