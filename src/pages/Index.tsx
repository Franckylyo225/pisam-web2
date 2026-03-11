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
import NewsletterSection from "@/components/sections/NewsletterSection";

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
        <link rel="canonical" href="https://www.groupepisam.com" />
        <meta property="og:image" content="https://www.groupepisam.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "MedicalOrganization"],
                "@id": "https://www.groupepisam.com/#organization",
                "name": "PISAM - Polyclinique Internationale Sainte Anne-Marie",
                "alternateName": "PISAM",
                "url": "https://www.groupepisam.com",
                "logo": "https://www.groupepisam.com/logo-pisam.png",
                "image": "https://www.groupepisam.com/og-image.jpg",
                "description": "PISAM, Polyclinique Internationale Sainte Anne-Marie à Abidjan. Excellence médicale, soins de qualité internationale, urgences 24h/24.",
                "telephone": "+225 27 22 48 31 12",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Rue des Jardins, Cocody",
                  "addressLocality": "Abidjan",
                  "addressCountry": "CI"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 5.3364,
                  "longitude": -3.9617
                },
                "openingHours": "Mo-Su 00:00-23:59",
                "medicalSpecialty": [
                  "Cardiologie", "Chirurgie", "Pédiatrie", "Gynécologie",
                  "Urologie", "ORL", "Ophtalmologie", "Dermatologie",
                  "Gastro-entérologie", "Neurologie"
                ],
                "sameAs": []
              },
              {
                "@type": "WebSite",
                "@id": "https://www.groupepisam.com/#website",
                "url": "https://www.groupepisam.com",
                "name": "PISAM - Polyclinique Internationale Sainte Anne-Marie",
                "publisher": { "@id": "https://www.groupepisam.com/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.groupepisam.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          })}
        </script>
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
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
