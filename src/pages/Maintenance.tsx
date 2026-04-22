import { Helmet } from 'react-helmet-async';
import { Phone, Wrench, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoPisam from '@/assets/logo-pisam.png';
import { MaintenanceConfig } from '@/hooks/useMaintenanceMode';

interface MaintenancePageProps {
  config: MaintenanceConfig;
}

const MaintenancePage = ({ config }: MaintenancePageProps) => {
  return (
    <>
      <Helmet>
        <title>Maintenance en cours - PISAM</title>
        <meta name="description" content="Le site PISAM est temporairement en maintenance." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-card rounded-3xl shadow-pisam-lg border border-border/50 p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <img src={logoPisam} alt="PISAM" className="h-20 w-auto" />
            </div>

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Wrench className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Site en maintenance
            </h1>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {config.message}
            </p>

            <div className="space-y-4">
              {/* Urgences */}
              <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Urgences 24h/24</h3>
                    <p className="text-sm text-muted-foreground">Équipe médicale disponible</p>
                  </div>
                </div>
                <Button variant="emergency" size="lg" asChild>
                  <a href={`tel:${config.emergency_phone.replace(/\s/g, '')}`}>
                    <Phone className="h-5 w-5" />
                    {config.emergency_phone}
                  </a>
                </Button>
              </div>

              {/* Renseignements */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Renseignements</h3>
                    <p className="text-sm text-muted-foreground">Standard PISAM</p>
                  </div>
                </div>
                <Button variant="default" size="lg" asChild>
                  <a href={`tel:${config.info_phone.replace(/\s/g, '')}`}>
                    <Phone className="h-5 w-5" />
                    {config.info_phone}
                  </a>
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              Merci de votre compréhension. Polyclinique Internationale Sainte Anne-Marie
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenancePage;