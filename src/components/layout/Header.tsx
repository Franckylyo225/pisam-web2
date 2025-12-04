import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Clock, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logoPisam from "@/assets/logo-pisam.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil", isRoute: true },
    { 
      href: "/pisam", 
      label: "PISAM", 
      isRoute: true,
      submenu: [
        { href: "/pisam#plateau-technique", label: "Plateau technique" },
        { href: "/pisam#certification", label: "Certification ISO" },
        { href: "/pisam#pisam-2", label: "PISAM 2.0" },
      ]
    },
    { href: "#patients", label: "Patients", isRoute: false },
    { href: "#medecins", label: "Médecins", isRoute: false },
    { 
      href: "#services", 
      label: "Services", 
      isRoute: false,
      submenu: [
        { href: "#biocsam", label: "BioCSAM" },
        { href: "#cisam", label: "CISAM" },
        { href: "#pisam-plus", label: "Carte PISAM+" },
      ]
    },
    { href: "/blog", label: "Actualité", isRoute: true },
    { href: "#contact", label: "Contacts", isRoute: false },
  ];

  const toggleMobileSubmenu = (label: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === label ? null : label);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+225 27 22 44 53 53</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Urgences 24h/24 - 7j/7</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Cocody, Abidjan - Côte d'Ivoire</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-pisam"
            : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logoPisam}
                alt="PISAM - Polyclinique Internationale Sainte Anne-Marie"
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    {link.submenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-primary hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-48 gap-1 p-2">
                            {link.submenu.map((subitem) => (
                              <li key={subitem.href}>
                                {subitem.href.startsWith('/') ? (
                                  <NavigationMenuLink asChild>
                                    <Link
                                      to={subitem.href}
                                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <span className="text-sm font-medium">{subitem.label}</span>
                                    </Link>
                                  </NavigationMenuLink>
                                ) : (
                                  <NavigationMenuLink asChild>
                                    <a
                                      href={subitem.href}
                                      className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <span className="text-sm font-medium">{subitem.label}</span>
                                    </a>
                                  </NavigationMenuLink>
                                )}
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        {link.isRoute ? (
                          <Link
                            to={link.href}
                            className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus:text-primary focus:outline-none"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus:text-primary focus:outline-none"
                          >
                            {link.label}
                          </a>
                        )}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="emergency" size="sm">
                <Phone className="h-4 w-4" />
                Urgences
              </Button>
              <Button variant="default" size="default">
                Prendre RDV
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(link.label)}
                        className="w-full flex items-center justify-between py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted rounded-lg font-medium transition-all"
                      >
                        {link.label}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            openMobileSubmenu === link.label ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {openMobileSubmenu === link.label && (
                        <div className="pl-4 flex flex-col gap-1">
                          {link.submenu.map((subitem) => (
                            subitem.href.startsWith('/') ? (
                              <Link
                                key={subitem.href}
                                to={subitem.href}
                                className="py-2 px-4 text-sm text-foreground/70 hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subitem.label}
                              </Link>
                            ) : (
                              <a
                                key={subitem.href}
                                href={subitem.href}
                                className="py-2 px-4 text-sm text-foreground/70 hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subitem.label}
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    link.isRoute ? (
                      <Link
                        to={link.href}
                        className="block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted rounded-lg font-medium transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted rounded-lg font-medium transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="emergency" className="w-full">
                  <Phone className="h-4 w-4" />
                  Urgences 24h/24
                </Button>
                <Button variant="default" className="w-full">
                  Prendre Rendez-vous
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
