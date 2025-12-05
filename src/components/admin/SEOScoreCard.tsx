import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertCircle, Search } from 'lucide-react';

interface SEOScoreCardProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  keywords: string[];
  imageUrl: string;
}

interface SEOCheck {
  label: string;
  passed: boolean;
  warning?: boolean;
  message: string;
}

export function SEOScoreCard({ title, metaTitle, metaDescription, content, keywords, imageUrl }: SEOScoreCardProps) {
  const checks = useMemo((): SEOCheck[] => {
    const plainContent = content.replace(/<[^>]*>/g, '').trim();
    const wordCount = plainContent.split(/\s+/).filter(Boolean).length;
    
    const checkList: SEOCheck[] = [
      {
        label: 'Titre',
        passed: title.length >= 10 && title.length <= 70,
        message: title.length < 10 
          ? `Titre trop court (${title.length}/10 caractères min)`
          : title.length > 70 
          ? `Titre trop long (${title.length}/70 caractères max)`
          : `Titre optimal (${title.length} caractères)`,
      },
      {
        label: 'Meta titre',
        passed: metaTitle.length >= 30 && metaTitle.length <= 60,
        warning: metaTitle.length > 0 && (metaTitle.length < 30 || metaTitle.length > 60),
        message: !metaTitle 
          ? 'Meta titre manquant'
          : metaTitle.length < 30 
          ? `Meta titre trop court (${metaTitle.length}/30 min)`
          : metaTitle.length > 60 
          ? `Meta titre trop long (${metaTitle.length}/60 max)`
          : `Meta titre optimal (${metaTitle.length} car.)`,
      },
      {
        label: 'Meta description',
        passed: metaDescription.length >= 120 && metaDescription.length <= 160,
        warning: metaDescription.length > 0 && (metaDescription.length < 120 || metaDescription.length > 160),
        message: !metaDescription 
          ? 'Meta description manquante'
          : metaDescription.length < 120 
          ? `Description trop courte (${metaDescription.length}/120 min)`
          : metaDescription.length > 160 
          ? `Description trop longue (${metaDescription.length}/160 max)`
          : `Description optimale (${metaDescription.length} car.)`,
      },
      {
        label: 'Mots-clés',
        passed: keywords.length >= 3,
        warning: keywords.length > 0 && keywords.length < 3,
        message: keywords.length === 0 
          ? 'Aucun mot-clé défini'
          : keywords.length < 3 
          ? `Ajoutez plus de mots-clés (${keywords.length}/3 min)`
          : `${keywords.length} mots-clés définis`,
      },
      {
        label: 'Longueur du contenu',
        passed: wordCount >= 300,
        warning: wordCount >= 150 && wordCount < 300,
        message: wordCount < 150 
          ? `Contenu trop court (${wordCount}/300 mots min)`
          : wordCount < 300 
          ? `Contenu un peu court (${wordCount}/300 mots)`
          : `Bonne longueur (${wordCount} mots)`,
      },
      {
        label: 'Image principale',
        passed: !!imageUrl,
        message: imageUrl ? 'Image principale définie' : 'Aucune image principale',
      },
      {
        label: 'Sous-titres (H2, H3)',
        passed: content.includes('<h2') || content.includes('<h3'),
        message: content.includes('<h2') || content.includes('<h3')
          ? 'Structure avec sous-titres'
          : 'Ajoutez des sous-titres (H2, H3)',
      },
    ];

    return checkList;
  }, [title, metaTitle, metaDescription, content, keywords, imageUrl]);

  const score = useMemo(() => {
    const passed = checks.filter(c => c.passed).length;
    return Math.round((passed / checks.length) * 100);
  }, [checks]);

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="h-5 w-5" />
          Score SEO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}%</span>
          <Progress 
            value={score} 
            className={`mt-2 h-2 [&>div]:${getProgressColor()}`}
          />
          <p className="text-sm text-muted-foreground mt-1">
            {score >= 80 ? 'Excellent' : score >= 50 ? 'À améliorer' : 'Insuffisant'}
          </p>
        </div>

        <div className="space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              {check.passed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              ) : check.warning ? (
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              )}
              <div>
                <span className="font-medium">{check.label}</span>
                <p className="text-muted-foreground text-xs">{check.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
