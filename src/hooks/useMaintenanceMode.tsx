import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  emergency_phone: string;
  info_phone: string;
}

const DEFAULT_CONFIG: MaintenanceConfig = {
  enabled: false,
  message: 'Notre site est en cours de maintenance. Nous serons de retour très bientôt.',
  emergency_phone: '+225 27 22 48 31 12',
  info_phone: '+225 27 22 55 00 00',
};

export function useMaintenanceMode() {
  const [config, setConfig] = useState<MaintenanceConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConfig = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'maintenance_mode')
      .maybeSingle();

    if (data?.value) {
      setConfig({ ...DEFAULT_CONFIG, ...(data.value as Partial<MaintenanceConfig>) });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchConfig();

    // Realtime updates so toggle is instant
    const channel = supabase
      .channel('site_settings_maintenance')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        () => fetchConfig()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { config, isLoading, refetch: fetchConfig };
}