# CISAM — Catalogue des examens d'imagerie

Ajouter à la page CISAM la liste complète des examens disponibles (147 actes issus du fichier Recap_actes_CISAM), sans afficher de tarifs, avec une navigation ergonomique et une gestion depuis l'admin.

## Ce que verra le visiteur

Nouvelle section "Nos examens" sur la page `/cisam`, placée juste après "Plateau Technique" (elle remplace la liste statique actuelle "Les services du centre d'imagerie") :

- **Barre de recherche instantanée** en haut : le visiteur tape "genou", "crâne", "IRM"… et la liste se filtre en direct (insensible aux accents et à la casse).
- **Filtres par modalité** sous forme de puces cliquables : Tous · Radiologie · Échographie · Scanner · IRM, chacune avec son compteur (ex. "Radiologie 68").
- **Résultats groupés par modalité**, en sections repliables (ouvertes par défaut sur desktop, repliées sur mobile), affichés en grille 2–3 colonnes sur desktop et 1 colonne sur mobile.
- **Aucun prix affiché.** Sous la liste, un encart : "Les tarifs vous sont communiqués lors de la prise de rendez-vous" + bouton d'appel `27 22 48 31 15` et rappel que la plupart des examens se font sans rendez-vous.
- **État vide** clair quand la recherche ne renvoie rien ("Aucun examen ne correspond… appelez-nous").
- Compteur global type "147 examens disponibles" pour rassurer sur l'étendue de l'offre.

```text
┌──────────────────────────────────────────────┐
│  Nos examens          147 examens disponibles│
│  [🔍 Rechercher un examen…                 ] │
│  (Tous 147)(Radio 68)(Écho 15)(Scanner 33)…  │
├──────────────────────────────────────────────┤
│  ▾ RADIOLOGIE (68)                            │
│    • Poumon        • Radio crâne face         │
│    • Bassin/hanche • Radio genou F+P          │
│  ▾ SCANNER (33)                               │
│    • Angioscan abdomen  • Bodyscan            │
└──────────────────────────────────────────────┘
```

## Ce que pourra faire l'admin

Nouvel écran **Admin → Examens d'imagerie** :

- Tableau de tous les examens avec recherche et filtre par modalité.
- Ajout / modification / suppression d'un examen (nom, modalité, description courte optionnelle, préparation optionnelle, actif/inactif, ordre).
- Activation/désactivation rapide : un examen inactif disparaît du site public.
- Protection contre les doublons (même nom dans la même modalité).

Le contenu du fichier Excel fourni est importé une fois au moment de la mise en place (noms normalisés en casse lisible, tarifs et cotations non importés).

## Détails techniques

- **Table** `public.imaging_exams` : `id`, `name`, `modality` (enum texte : `RADIO`, `ECHOGRAPHIE`, `SCANNER`, `IRM`), `description`, `preparation`, `display_order`, `is_active`, `created_at`, `updated_at` + trigger `update_updated_at_column`.
- **Sécurité** : GRANT SELECT à `anon`/`authenticated`, GRANT complet à `authenticated` et `service_role` ; RLS activée — lecture publique des examens actifs, gestion réservée à `is_admin()`. Index unique insensible à la casse sur (`lower(name)`, `modality`).
- **Données** : import des 147 lignes des feuilles RADIO / ECHO / SCANNER / IRM via l'outil d'insertion (colonnes tarifaires ignorées).
- **Front** : nouveau composant `src/components/sections/ImagingExamsSection.tsx` (fetch Supabase + `useMemo` pour recherche/filtre, Accordion + Badge shadcn), intégré dans `src/pages/CISAM.tsx` à la place de la section statique "Les services du centre d'imagerie".
- **Admin** : `src/pages/admin/ImagingExamsAdmin.tsx` + entrée de menu dans `AdminLayout` et route dans `App.tsx`, sur le modèle de `DoctorsAdmin`.
- **SEO** : mise à jour de la meta description de `/cisam` pour mentionner le catalogue d'examens ; liste rendue en HTML (pas de contenu masqué au crawl).
