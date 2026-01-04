-- Create a table for CEO message content
CREATE TABLE public.ceo_message (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'M. ERIC DJIBO',
  position TEXT NOT NULL DEFAULT 'Président Directeur Général',
  image_url TEXT,
  title TEXT NOT NULL DEFAULT 'Le mot du Président',
  intro_paragraph TEXT,
  main_content TEXT,
  highlight_items JSONB DEFAULT '[]'::jsonb,
  bottom_left_content TEXT,
  bottom_right_content TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ceo_message ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active CEO message"
ON public.ceo_message
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all CEO messages"
ON public.ceo_message
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can manage CEO message"
ON public.ceo_message
FOR ALL
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ceo_message_updated_at
BEFORE UPDATE ON public.ceo_message
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.ceo_message (
  name,
  position,
  title,
  intro_paragraph,
  main_content,
  highlight_items,
  bottom_left_content,
  bottom_right_content
) VALUES (
  'M. ERIC DJIBO',
  'Président Directeur Général',
  'Le mot du Président',
  'Bienvenue sur le site internet de la PISAM qui a pour but de vous informer sur l''organisation, le fonctionnement et les activités de notre établissement. Nous continuerons de le mettre à jour, toujours pour rapprocher la PISAM de sa patientèle.',
  'Depuis sa création en 1985, la PISAM s''est engagée dans une dynamique d''amélioration continue de la qualité des soins et de ses prestations faisant d''elle le leader dans le domaine privé de la santé.

La PISAM, c''est aujourd''hui la plus grande polyclinique de la sous-région par sa capacité d''accueil et la taille de son plateau technique qui comprend entre autres :',
  '[
    "Un laboratoire de biologie médicale (BIOCSAM) ayant développé de nouvelles branches comme l''immuno-histochimie et l''anatomo-cytopathologie;",
    "Un centre d''imagerie (CISAM) comprenant des appareils d''imagerie diagnostique de dernière génération (Scanner 64 barrettes, IRM 1,5T, Sénographe, etc)."
  ]'::jsonb,
  'La PISAM est aussi à ce jour, le seul établissement sanitaire certifié ISO 9001 – 2015 pour tous ses processus; cette démarche qualité nous permettant de toujours vous donner le meilleur de nous-mêmes.',
  'Pour les années à venir, notre ambition est de moderniser sans cesse notre bel établissement en y ajoutant toutes les spécialités médicales nécessaires pour assurer une prise en charge complète de nos patients. Bien sûr, nous resterons toujours à votre écoute pour continuer à satisfaire au mieux vos besoins parce que vous êtes au cœur de nos priorités et c''est ensemble que nous ferons de la PISAM le fleuron de la santé en Côte d''Ivoire et en Afrique.'
);