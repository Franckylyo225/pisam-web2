import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <section className="py-16 bg-gradient-to-br from-primary via-pisam-teal to-pisam-turquoise relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Mail className="h-7 w-7 text-white" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Restez informé de nos actualités
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos conseils santé, actualités et événements.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 rounded-xl"
                required
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold h-12 px-6 rounded-xl"
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

          <p className="text-white/60 text-xs mt-4">
            En vous inscrivant, vous acceptez de recevoir nos communications. Désabonnement possible à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
