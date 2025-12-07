import { ReactNode, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  FileText, 
  UserCog, 
  LogOut,
  Shield,
  Loader2,
  Home,
  Mail,
  Palette
} from 'lucide-react';
import logoImage from '@/assets/logo-pisam.png';

const menuItems = [
  { title: 'Tableau de bord', url: '/admin', icon: LayoutDashboard },
  { title: 'Messages', url: '/admin/messages', icon: Mail },
  { title: 'Médecins', url: '/admin/doctors', icon: Stethoscope },
  { title: 'Articles', url: '/admin/articles', icon: FileText },
  { title: 'Équipe dirigeante', url: '/admin/leadership', icon: UserCog },
  { title: 'CMS', url: '/admin/cms', icon: Palette },
  { title: 'Administrateurs', url: '/admin/admins', icon: Shield },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar className="border-r">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="PISAM" className="h-10 object-contain" />
            </Link>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link 
                            to={item.url} 
                            className={`flex items-center gap-2 ${isActive ? 'bg-primary/10 text-primary font-medium' : ''}`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span>Retour au site</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut} className="flex items-center gap-2 text-destructive hover:text-destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-background flex items-center px-4 gap-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{user.email}</span>
              {isAdmin && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
