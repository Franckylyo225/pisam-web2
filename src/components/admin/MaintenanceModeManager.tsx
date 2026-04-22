import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save, AlertTriangle, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import { MaintenanceConfig } from '@/hooks/useMaintenanceMode';

const DEFAULT: MaintenanceConfig = {
  enabled: false,
  message: 'Notre site est en cours de maintenance. Nous serons de retour très bientôt.',
  emergency_phone: '+225 27 22 48 31 12',
  info_phone: '+225 27 22 55 00 00',
};

export function MaintenanceModeManager() {
  const [config, setConfig] = useState<MaintenanceConfig>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'maintenance_mode')
        .maybeSingle();
      if (data?.value) {
        setConfig({ ...DEFAULT, ...(data.value as Partial<MaintenanceConfig>) });
      }
      setLoading(false);
    };
    load();
  }, []);

  const save = async (newConfig: MaintenanceConfig) => {
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .update({ value: newConfig as any })
      .eq('key', 'maintenance_mode');

    if (error) {
      toast.error('Erreur lors de la sauvegarde : ' + error.message);
    } else {
      toast.success(
        newConfig.enabled
          ? 'Mode maintenance activé — le site est désormais inaccessible aux visiteurs.'
          : 'Mode maintenance désactivé — le site est de nouveau accessible.'
      );
    }
    setSaving(false);
  };

  const handleToggle = async (enabled: boolean) => {
    const updated = { ...config, enabled };
    setConfig(updated);
    await save(updated);
  };

  const handleSaveDetails = async () => {
    await save(config);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className={config.enabled ? 'border-destructive/50 bg-destructive/5' : ''}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  config.enabled ? 'bg-destructive/20' : 'bg-muted'
                }`}
              >
                {config.enabled ? (
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                ) : (
                  <Wrench className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <CardTitle>Mode maintenance</CardTitle>
                <CardDescription className="mt-1">
                  {config.enabled
                    ? 'Le site est actuellement INACCESSIBLE aux visiteurs.'
                    : 'Activer pour bloquer l\'accès au site et afficher une page d\'attente aux visiteurs.'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {saving && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              <Switch
                checked={config.enabled}
                onCheckedChange={handleToggle}
                disabled={saving}
              />
            </div>
          </div>
        </CardHeader>
        {config.enabled && (
          <CardContent>
            <div className="text-sm text-destructive font-medium">
              ⚠️ Les administrateurs connectés conservent l'accès au site et au panneau d'administration.
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contenu de la page de maintenance</CardTitle>
          <CardDescription>
            Personnalisez le message et les contacts affichés aux visiteurs pendant la maintenance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maintenance-message">Message d'information</Label>
            <Textarea
              id="maintenance-message"
              value={config.message}
              onChange={(e) => setConfig({ ...config, message: e.target.value })}
              rows={3}
              placeholder="Notre site est en maintenance..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emergency-phone">Téléphone Urgences</Label>
              <Input
                id="emergency-phone"
                value={config.emergency_phone}
                onChange={(e) => setConfig({ ...config, emergency_phone: e.target.value })}
                placeholder="+225 27 22 48 31 12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="info-phone">Téléphone Renseignements</Label>
              <Input
                id="info-phone"
                value={config.info_phone}
                onChange={(e) => setConfig({ ...config, info_phone: e.target.value })}
                placeholder="+225 27 22 55 00 00"
              />
            </div>
          </div>

          <Button onClick={handleSaveDetails} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}