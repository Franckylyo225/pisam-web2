import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import newsletterAgent from "@/assets/newsletter-agent.png";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate subscription
    setIsSubmitted(true);
    toast({
      title: "Inscription réussie !",
      description: "Vous recevrez bientôt nos actualités santé.",
    });
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="relative overflow-visible bg-gradient-to-r from-pisam-green/20 via-pisam-green/30 to-pisam-turquoise/20">
      {/* Gradient bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pisam-green via-pisam-turquoise to-pisam-green" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-16">
          {/* Left side - Content and Form */}
          <div className="flex-1 py-12 lg:py-16">
            {/* Content */}
            <div>
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pisam-green/20 mb-4">
                <Mail className="h-6 w-6 text-pisam-green" />
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
                Restez informé de nos actualités
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg">
                Inscrivez-vous à notre newsletter pour recevoir nos conseils santé, actualités et événements.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-pisam-green rounded-xl"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-pisam-green text-white hover:bg-pisam-green/90 font-semibold h-12 px-6 rounded-xl shadow-lg"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Inscrit !
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      S'inscrire
                    </>
                  )}
                </Button>
              </form>

              <p className="text-muted-foreground/70 text-xs mt-4">
                En vous inscrivant, vous acceptez de recevoir nos communications. Désabonnement possible à tout moment.
              </p>
            </div>
          </div>

          {/* Right side - Agent Image */}
          <div className="hidden lg:block relative flex-shrink-0">
            <img
              src={newsletterAgent}
              alt="Agent PISAM"
              className="w-[320px] xl:w-[380px] h-auto object-contain -mt-16 relative z-10"
              style={{ marginBottom: '-2px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
