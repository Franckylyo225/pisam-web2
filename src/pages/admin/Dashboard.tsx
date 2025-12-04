import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Users, FileText, UserCog } from 'lucide-react';

interface Stats {
  doctors: number;
  specialties: number;
  articles: number;
  leadership: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ doctors: 0, specialties: 0, articles: 0, leadership: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [doctors, specialties, articles, leadership] = await Promise.all([
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('specialties').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('leadership_team').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        doctors: doctors.count || 0,
        specialties: specialties.count || 0,
        articles: articles.count || 0,
        leadership: leadership.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Médecins', value: stats.doctors, icon: Stethoscope, color: 'text-primary' },
    { title: 'Spécialités', value: stats.specialties, icon: Users, color: 'text-pisam-turquoise' },
    { title: 'Articles', value: stats.articles, icon: FileText, color: 'text-pisam-green' },
    { title: 'Équipe dirigeante', value: stats.leadership, icon: UserCog, color: 'text-pisam-gold' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de l'administration PISAM</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? '...' : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenue dans l'administration PISAM</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Utilisez le menu latéral pour naviguer entre les différentes sections :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Médecins</strong> : Gérer les profils des médecins</li>
            <li><strong>Spécialités</strong> : Gérer les spécialités médicales</li>
            <li><strong>Articles</strong> : Publier et gérer les actualités</li>
            <li><strong>Équipe dirigeante</strong> : Gérer les membres de la direction</li>
            <li><strong>Administrateurs</strong> : Gérer les accès admin</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
