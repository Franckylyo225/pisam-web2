import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';
import MaintenancePage from '@/pages/Maintenance';

/**
 * Blocks public visitors from accessing the site when maintenance mode is enabled.
 * - Admins (logged in) bypass the gate completely.
 * - /auth and /admin/* routes always remain accessible so admins can log in.
 */
export function MaintenanceGate({ children }: { children: ReactNode }) {
  const { config, isLoading: maintenanceLoading } = useMaintenanceMode();
  const { isAdmin, isSuperAdmin, isLoading: authLoading } = useAuth();
  const location = useLocation();

  // Always allow admin area + auth pages so admins can log in / manage
  const isAdminArea =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/auth' ||
    location.pathname === '/reset-password';

  // Wait until both checks are loaded to avoid a flash
  if (maintenanceLoading || authLoading) {
    return <>{children}</>;
  }

  if (config.enabled && !isAdmin && !isSuperAdmin && !isAdminArea) {
    return <MaintenancePage config={config} />;
  }

  return <>{children}</>;
}