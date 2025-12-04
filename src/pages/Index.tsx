import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import VideoSection from "@/components/sections/VideoSection";
import Pisam2Section from "@/components/sections/Pisam2Section";
import PisamPlusSection from "@/components/sections/PisamPlusSection";
import NewsSection from "@/components/sections/NewsSection";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>PISAM - Polyclinique Internationale Sainte Anne-Marie | Abidjan, Côte d'Ivoire</title>
        <meta 
          name="description" 
          content="PISAM, Polyclinique Internationale Sainte Anne-Marie à Abidjan. Excellence médicale, soins de qualité internationale, urgences 24h/24. Plus de 50 spécialités médicales." 
        />
        <meta name="keywords" content="PISAM, polyclinique, Abidjan, Côte d'Ivoire, hôpital, clinique, urgences, cardiologie, chirurgie, pédiatrie" />
        <link rel="canonical" href="https://pisam.ci" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <VideoSection />
          <Pisam2Section />
          <PisamPlusSection />
          <NewsSection />
          <CTASection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
