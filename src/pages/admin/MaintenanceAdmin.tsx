import { MaintenanceModeManager } from '@/components/admin/MaintenanceModeManager';

export default function MaintenanceAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mode maintenance</h1>
        <p className="text-muted-foreground">
          Activez le mode maintenance pour bloquer temporairement l'accès au site public pendant des corrections internes.
        </p>
      </div>
      <MaintenanceModeManager />
    </div>
  );
}