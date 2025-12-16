import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MentionsLegales = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Mentions légales de la Polyclinique Internationale Sainte Anne-Marie (PISAM) - Informations légales obligatoires." />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
              Mentions Légales
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* Éditeur du site */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">1. Éditeur du site</h2>
                <p className="text-muted-foreground">
                  <strong>Polyclinique Internationale Sainte Anne-Marie (PISAM)</strong><br />
                  Établissement de santé privé<br />
                  Abidjan, Cocody, Rue Cannebière, Av. Joseph Blohorn<br />
                  01 BP 1463 Abidjan 01<br />
                  Côte d'Ivoire<br /><br />
                  <strong>Téléphone :</strong> +225 27 22 48 31 12<br />
                  <strong>Email :</strong> contact@pisam.ci
                </p>
              </div>

              {/* Directeur de publication */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">2. Directeur de la publication</h2>
                <p className="text-muted-foreground">
                  M. Eric Djibo<br />
                  Président Directeur Général de PISAM
                </p>
              </div>

              {/* Hébergeur */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">3. Hébergement</h2>
                <p className="text-muted-foreground">
                  Ce site est hébergé par Lovable (GPT Engineer Inc.)<br />
                  San Francisco, Californie, États-Unis
                </p>
              </div>

              {/* Conception */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">4. Conception et réalisation</h2>
                <p className="text-muted-foreground">
                  <strong>#NWC Agency</strong><br />
                  <a href="https://nwc-agency.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    https://nwc-agency.com/
                  </a>
                </p>
              </div>

              {/* Propriété intellectuelle */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">5. Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  L'ensemble de ce site relève de la législation ivoirienne et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-muted-foreground mt-4">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </div>

              {/* Données personnelles */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">6. Protection des données personnelles</h2>
                <p className="text-muted-foreground">
                  Conformément à la loi ivoirienne sur la protection des données personnelles, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent.
                </p>
                <p className="text-muted-foreground mt-4">
                  Pour exercer ce droit, veuillez nous contacter à l'adresse suivante : contact@pisam.ci
                </p>
                <p className="text-muted-foreground mt-4">
                  Les informations recueillies sur ce site sont destinées uniquement à PISAM et ne seront en aucun cas cédées à des tiers.
                </p>
              </div>

              {/* Cookies */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">7. Cookies</h2>
                <p className="text-muted-foreground">
                  Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur. Les cookies sont de petits fichiers texte stockés sur votre appareil qui permettent d'analyser le trafic du site et de mémoriser vos préférences.
                </p>
                <p className="text-muted-foreground mt-4">
                  Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est envoyé.
                </p>
              </div>

              {/* Responsabilité */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">8. Limitation de responsabilité</h2>
                <p className="text-muted-foreground">
                  PISAM s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, PISAM ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
                </p>
                <p className="text-muted-foreground mt-4">
                  Les informations présentes sur ce site sont données à titre indicatif et ne sauraient se substituer à une consultation médicale.
                </p>
              </div>

              {/* Liens externes */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">9. Liens externes</h2>
                <p className="text-muted-foreground">
                  Le site peut contenir des liens vers d'autres sites internet. PISAM décline toute responsabilité quant au contenu de ces sites externes.
                </p>
              </div>

              {/* Droit applicable */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">10. Droit applicable</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige, les tribunaux d'Abidjan seront seuls compétents.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default MentionsLegales;
