import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroSlidesManager } from '@/components/admin/HeroSlidesManager';
import { Images, User, Building2, Settings } from 'lucide-react';

export default function CMSAdmin() {
  const [activeTab, setActiveTab] = useState('slides');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion du contenu (CMS)</h1>
          <p className="text-muted-foreground">
            Personnalisez les différents blocs et sections du site web
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="slides" className="flex items-center gap-2">
              <Images className="h-4 w-4" />
              <span className="hidden sm:inline">Slides Hero</span>
            </TabsTrigger>
            <TabsTrigger value="ceo" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Mot du PDG</span>
            </TabsTrigger>
            <TabsTrigger value="insurances" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Assurances</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Autres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slides" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Slides Hero</CardTitle>
                <CardDescription>
                  Personnalisez les slides du carrousel de la page d'accueil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HeroSlidesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ceo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mot du PDG</CardTitle>
                <CardDescription>
                  Modifiez le message et la photo du PDG affichés sur la page PISAM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Fonctionnalité en cours de développement...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assurances Partenaires</CardTitle>
                <CardDescription>
                  Gérez les logos des assurances partenaires affichés sur la page Patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Fonctionnalité en cours de développement...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Autres paramètres</CardTitle>
                <CardDescription>
                  Paramètres et personnalisations supplémentaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Fonctionnalité en cours de développement...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
