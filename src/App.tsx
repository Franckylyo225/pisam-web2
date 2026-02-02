import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import Pisam from "./pages/Pisam";
import Patients from "./pages/Patients";
import Medecins from "./pages/Medecins";
import BioCSAM from "./pages/BioCSAM";
import CISAM from "./pages/CISAM";
import PisamPlus from "./pages/PisamPlus";
import PlateauTechnique from "./pages/PlateauTechnique";
import CertificationISO from "./pages/CertificationISO";
import Pisam2 from "./pages/Pisam2";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import BilanSante from "./pages/BilanSante";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import DoctorsAdmin from "./pages/admin/DoctorsAdmin";
import ArticlesAdmin from "./pages/admin/ArticlesAdmin";
import LeadershipAdmin from "./pages/admin/LeadershipAdmin";
import AdminsAdmin from "./pages/admin/AdminsAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import CMSAdmin from "./pages/admin/CMSAdmin";
import HealthCheckAdmin from "./pages/admin/HealthCheckAdmin";
import NotificationSettingsAdmin from "./pages/admin/NotificationSettingsAdmin";
import NewsletterAdmin from "./pages/admin/NewsletterAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pisam" element={<Pisam />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/medecins" element={<Medecins />} />
              <Route path="/biocsam" element={<BioCSAM />} />
              <Route path="/cisam" element={<CISAM />} />
              <Route path="/pisam-plus" element={<PisamPlus />} />
              <Route path="/plateau-technique" element={<PlateauTechnique />} />
              <Route path="/certification-iso" element={<CertificationISO />} />
              <Route path="/pisam-2" element={<Pisam2 />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/bilan-sante" element={<BilanSante />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
              <Route path="/admin/messages" element={<AdminLayout><MessagesAdmin /></AdminLayout>} />
              <Route path="/admin/doctors" element={<AdminLayout><DoctorsAdmin /></AdminLayout>} />
              <Route path="/admin/articles" element={<AdminLayout><ArticlesAdmin /></AdminLayout>} />
              <Route path="/admin/leadership" element={<AdminLayout><LeadershipAdmin /></AdminLayout>} />
              <Route path="/admin/cms" element={<AdminLayout><CMSAdmin /></AdminLayout>} />
              <Route path="/admin/admins" element={<AdminLayout><AdminsAdmin /></AdminLayout>} />
              <Route path="/admin/health-check" element={<AdminLayout><HealthCheckAdmin /></AdminLayout>} />
              <Route path="/admin/notifications" element={<AdminLayout><NotificationSettingsAdmin /></AdminLayout>} />
              <Route path="/admin/newsletter" element={<AdminLayout><NewsletterAdmin /></AdminLayout>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
