import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlidePisamPlus from "@/assets/hero-slide-pisam-plus.jpg";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  primary_button_text: string | null;
  primary_button_link: string | null;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  display_order: number;
  is_active: boolean;
}

// Fallback slides when database is empty
const fallbackSlides = [
  {
    id: 'fallback-1',
    image_url: heroSlide1,
    subtitle: "GROUPE PISAM",
    title: "Un havre de santé au cœur d'Abidjan",
    description: "Depuis plus de trois décennies, la PISAM incarne l'excellence médicale en Côte d'Ivoire. Au cœur d'Abidjan, notre hôpital allie expertise, humanité et innovation pour offrir des soins de qualité, dans un environnement moderne et bienveillant.",
    primary_button_text: "Qui Sommes-nous ?",
    primary_button_link: "/pisam",
    secondary_button_text: "Prendre Rendez-vous",
    secondary_button_link: "#",
    display_order: 0,
    is_active: true,
  },
  {
    id: 'fallback-2',
    image_url: heroSlide2,
    subtitle: "PISAM 2.0",
    title: "Un hôpital plus proche de vous",
    description: "La PISAM se réinvente pour mieux répondre à vos besoins. Grâce à des services digitalisés, une meilleure accessibilité et des équipes toujours à votre écoute, nous rapprochons la qualité des soins de chaque patient, où qu'il soit.",
    primary_button_text: "En savoir plus",
    primary_button_link: "/pisam-2",
    secondary_button_text: "Prendre Rendez-vous",
    secondary_button_link: "#",
    display_order: 1,
    is_active: true,
  },
  {
    id: 'fallback-3',
    image_url: heroSlidePisamPlus,
    subtitle: "CARTE PISAM+",
    title: "Santé, technologie et paix d'esprit",
    description: "Avec la carte PISAM+, bénéficiez d'une expérience de santé simplifiée et connectée. Accédez à vos services médicaux, à vos suivis personnalisés et à des avantages exclusifs pour une prise en charge rapide et sereine.",
    primary_button_text: "Commandez ma Carte",
    primary_button_link: "/pisam-plus",
    secondary_button_text: "Prendre Rendez-vous",
    secondary_button_link: "#",
    display_order: 2,
    is_active: true,
  },
];

// Map for local asset paths
const localImageMap: Record<string, string> = {
  '/src/assets/hero-slide-1.jpg': heroSlide1,
  '/src/assets/hero-slide-2.jpg': heroSlide2,
  '/src/assets/hero-slide-pisam-plus.jpg': heroSlidePisamPlus,
};

const getImageUrl = (url: string | null): string => {
  if (!url) return heroSlide1;
  // Check if it's a local asset path
  if (localImageMap[url]) return localImageMap[url];
  // Otherwise return the URL as-is (for uploaded images)
  return url;
};

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch slides from database
  const { data: dbSlides } = useQuery({
    queryKey: ['hero-slides-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  // Use database slides if available, otherwise fallback
  const slides = dbSlides && dbSlides.length > 0 ? dbSlides : fallbackSlides;

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

  // Reset carousel when slides change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, slides]);

  return (
    <section id="accueil" className="relative min-h-[90vh] overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${getImageUrl(slide.image_url)})` }}
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
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center pt-20 md:pt-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  selectedIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none flex items-center justify-center"
                }`}
              >
                <div className={selectedIndex === index ? "" : "max-w-4xl mx-auto px-4"}>
                  {/* Subtitle badge */}
                  {slide.subtitle && (
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 tracking-wider uppercase">
                      <Shield className="h-4 w-4" />
                      <span>{slide.subtitle}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 tracking-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  {slide.description && (
                    <p className="text-base md:text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                      {slide.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA Buttons - Dynamic per slide */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {slides[selectedIndex]?.primary_button_text && slides[selectedIndex]?.primary_button_link && (
                <Button 
                  asChild
                  size="xl" 
                  className="bg-pisam-green hover:bg-pisam-green/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link to={slides[selectedIndex].primary_button_link!}>
                    {slides[selectedIndex].primary_button_text}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
              {slides[selectedIndex]?.secondary_button_text && slides[selectedIndex]?.secondary_button_link && (
                <Button 
                  asChild
                  size="xl" 
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to={slides[selectedIndex].secondary_button_link!}>
                    <Calendar className="h-5 w-5" />
                    {slides[selectedIndex].secondary_button_text}
                  </Link>
                </Button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={() => {
          const nextSection = document.getElementById('about');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
        aria-label="Défiler vers le contenu"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Découvrir</span>
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </button>

      {/* Slider Navigation - Left side (hidden on mobile) */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
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
