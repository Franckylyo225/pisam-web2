import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | PISAM - Polyclinique Internationale Sainte Anne-Marie</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles de PISAM - Informations sur la collecte et le traitement de vos données." />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
              Politique de Confidentialité
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* Introduction */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  La Polyclinique Internationale Sainte Anne-Marie (PISAM) accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Dernière mise à jour :</strong> Janvier 2025
                </p>
              </div>

              {/* Responsable du traitement */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">2. Responsable du traitement</h2>
                <p className="text-muted-foreground">
                  <strong>Polyclinique Internationale Sainte Anne-Marie (PISAM)</strong><br />
                  Abidjan, Cocody, Rue Cannebière, Av. Joseph Blohorn<br />
                  01 BP 1463 Abidjan 01, Côte d'Ivoire<br /><br />
                  <strong>Email de contact :</strong> contact@pisam.ci<br />
                  <strong>Téléphone :</strong> +225 27 22 48 31 12
                </p>
              </div>

              {/* Données collectées */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">3. Données personnelles collectées</h2>
                <p className="text-muted-foreground mb-4">
                  Nous pouvons collecter les types de données suivants :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Données d'identification :</strong> nom, prénom, date de naissance</li>
                  <li><strong>Coordonnées :</strong> adresse postale, email, numéro de téléphone</li>
                  <li><strong>Données de santé :</strong> informations médicales nécessaires à votre prise en charge (uniquement dans le cadre des soins)</li>
                  <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite</li>
                  <li><strong>Données de formulaire :</strong> informations que vous nous transmettez via nos formulaires de contact ou de prise de rendez-vous</li>
                </ul>
              </div>

              {/* Finalités du traitement */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">4. Finalités du traitement</h2>
                <p className="text-muted-foreground mb-4">
                  Vos données personnelles sont collectées pour les finalités suivantes :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Gestion des rendez-vous et de la relation patient</li>
                  <li>Fourniture de soins médicaux et suivi thérapeutique</li>
                  <li>Réponse à vos demandes d'information via notre formulaire de contact</li>
                  <li>Envoi de newsletters si vous y avez consenti</li>
                  <li>Amélioration de nos services et de l'expérience utilisateur</li>
                  <li>Respect de nos obligations légales et réglementaires</li>
                  <li>Statistiques anonymisées de fréquentation du site</li>
                </ul>
              </div>

              {/* Base légale */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">5. Base légale du traitement</h2>
                <p className="text-muted-foreground mb-4">
                  Le traitement de vos données repose sur les bases légales suivantes :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Votre consentement :</strong> pour l'envoi de newsletters et l'utilisation de cookies non essentiels</li>
                  <li><strong>L'exécution d'un contrat :</strong> pour la gestion de votre prise en charge médicale</li>
                  <li><strong>Les obligations légales :</strong> conservation des dossiers médicaux conformément à la réglementation</li>
                  <li><strong>L'intérêt légitime :</strong> pour l'amélioration de nos services et la sécurité de notre site</li>
                </ul>
              </div>

              {/* Destinataires */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">6. Destinataires des données</h2>
                <p className="text-muted-foreground mb-4">
                  Vos données personnelles peuvent être transmises aux destinataires suivants :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Personnel médical et administratif de PISAM (accès limité selon les fonctions)</li>
                  <li>Prestataires techniques (hébergement, maintenance informatique) soumis à des clauses de confidentialité</li>
                  <li>Organismes de sécurité sociale et mutuelles (avec votre accord pour le remboursement des soins)</li>
                  <li>Autorités compétentes en cas d'obligation légale</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  <strong>Nous ne vendons jamais vos données personnelles à des tiers.</strong>
                </p>
              </div>

              {/* Durée de conservation */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">7. Durée de conservation</h2>
                <p className="text-muted-foreground mb-4">
                  Les durées de conservation varient selon la nature des données :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Dossiers médicaux :</strong> 20 ans à compter de la dernière consultation (obligation légale)</li>
                  <li><strong>Données de contact (formulaires) :</strong> 3 ans à compter du dernier contact</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                  <li><strong>Données liées aux newsletters :</strong> jusqu'à votre désinscription</li>
                </ul>
              </div>

              {/* Droits des personnes */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">8. Vos droits</h2>
                <p className="text-muted-foreground mb-4">
                  Conformément à la réglementation applicable, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Droit d'accès :</strong> obtenir la confirmation du traitement de vos données et une copie de celles-ci</li>
                  <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                  <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données (sous réserve des obligations légales)</li>
                  <li><strong>Droit à la limitation :</strong> restreindre temporairement le traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement pour des motifs légitimes</li>
                  <li><strong>Droit de retirer votre consentement :</strong> à tout moment pour les traitements basés sur votre consentement</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Pour exercer ces droits, contactez-nous à : <strong>contact@pisam.ci</strong>
                </p>
              </div>

              {/* Sécurité */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">9. Sécurité des données</h2>
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures incluent :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li>Chiffrement des données sensibles</li>
                  <li>Contrôle d'accès strict aux systèmes d'information</li>
                  <li>Formation du personnel à la protection des données</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                  <li>Audits de sécurité périodiques</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">10. Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation :
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (pas de consentement requis)</li>
                  <li><strong>Cookies analytiques :</strong> pour comprendre l'utilisation du site et améliorer nos services</li>
                  <li><strong>Cookies fonctionnels :</strong> pour mémoriser vos préférences</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur ou refuser les cookies non essentiels.
                </p>
              </div>

              {/* Transferts internationaux */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">11. Transferts internationaux de données</h2>
                <p className="text-muted-foreground">
                  Certaines de nos solutions techniques peuvent impliquer un transfert de données vers des pays tiers. Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place pour protéger vos données conformément à la réglementation applicable.
                </p>
              </div>

              {/* Modifications */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">12. Modifications de la politique</h2>
                <p className="text-muted-foreground">
                  Nous pouvons mettre à jour cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques de protection des données.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">13. Nous contacter</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, vous pouvez nous contacter :
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Par email :</strong> contact@pisam.ci<br />
                  <strong>Par courrier :</strong> PISAM - Service Protection des Données<br />
                  Abidjan, Cocody, Rue Cannebière, Av. Joseph Blohorn<br />
                  01 BP 1463 Abidjan 01, Côte d'Ivoire<br />
                  <strong>Par téléphone :</strong> +225 27 22 48 31 12
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

export default PolitiqueConfidentialite;
