import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoPisam from "@/assets/logo-pisam.png";
const Footer = () => {
  const services = ["Médecine Générale", "Cardiologie", "Gynécologie-Obstétrique", "Pédiatrie", "Chirurgie", "Imagerie Médicale"];
  const quickLinks = [{
    href: "#accueil",
    label: "Accueil"
  }, {
    href: "#services",
    label: "Nos Services"
  }, {
    href: "#equipe",
    label: "Notre Équipe"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  return <footer className="bg-foreground text-background">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <img src={logoPisam} alt="PISAM" className="h-16 w-auto mb-6 brightness-0 invert" />
            <p className="text-background/70 mb-6 leading-relaxed">
              Polyclinique Internationale Sainte Anne-Marie. Excellence médicale 
              au service de votre santé depuis plus de 30 ans.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              {services.map(service => <li key={service}>
                  <a href="#services" className="text-background/70 hover:text-background transition-colors duration-200">
                    {service}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Quick links column */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.href}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors duration-200">
                    {link.label}
                  </a>
                </li>)}
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors duration-200">
                  Prendre RDV en ligne
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors duration-200">
                  Résultats d'analyses
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-pisam-turquoise mt-0.5 flex-shrink-0" />
                <span className="text-background/70">
                  Abidjan, Cocody, Rue Cannebière,<br />
                  Av. Joseph Blohorn 01 BP 1463 Abidjan 01<br />
                  Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-pisam-turquoise flex-shrink-0" />
                <div className="text-background/70">
                  <div>+225 27 22 48 31 31</div>
                  <div className="text-sm">Urgences: +225 27 22 48 31 12</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-pisam-turquoise flex-shrink-0" />
                <span className="text-background/70">info@pisam.ci </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-pisam-turquoise mt-0.5 flex-shrink-0" />
                <div className="text-background/70">
                  <div>Lun - Ven : 7h30 - 19h30 GMT</div>
                  <div>           Samedi : 07h30 - 12h00 GMT</div>
                  <div className="text-pisam-green font-medium">Urgences 24h/24</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>© 2025 PISAM - Polyclinique Internationale Sainte Anne-Marie. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <Link to="/mentions-legales" className="hover:text-background transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-background transition-colors">
                Politique de confidentialité
              </Link>
              <span className="text-background/40">|</span>
              <a href="https://nwc-agency.com/" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                Powered by #NWC
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;