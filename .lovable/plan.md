

# Plan SEO pour positionner groupepisam.com en #1 sur "PISAM"

## Diagnostic actuel

**Ce qui est en place :** balises title/meta/OG correctes, canonical sur groupepisam.com, robots.txt permissif, structured data sur les articles blog.

**Ce qui manque (critique) :**
- Pas de `sitemap.xml`
- Pas de structured data sur la page d'accueil ni les pages principales
- Pas de directive Sitemap dans `robots.txt`
- Pas d'image OG dédiée (utilise le favicon, trop petit)
- Pages internes sans balises canonical complètes sur certaines

---

## Actions techniques à implémenter

### 1. Créer un sitemap.xml statique
Fichier `public/sitemap.xml` listant toutes les pages publiques avec priorités :
- `/` (priorité 1.0)
- `/pisam`, `/patients`, `/medecins`, `/biocsam`, `/cisam` (0.8)
- `/pisam-plus`, `/plateau-technique`, `/certification-iso`, `/pisam-2` (0.7)
- `/blog`, `/contact`, `/bilan-sante` (0.6)
- `/mentions-legales`, `/politique-confidentialite` (0.3)

### 2. Mettre à jour robots.txt
Ajouter la directive `Sitemap: https://www.groupepisam.com/sitemap.xml`.

### 3. Ajouter des données structurées JSON-LD sur la page d'accueil
Schema.org `Organization` + `MedicalOrganization` + `WebSite` avec :
- Nom, logo, adresse, téléphone, URL
- `potentialAction: SearchAction` pour le sitelinks searchbox
- Spécialités médicales, horaires d'ouverture

### 4. Ajouter des données structurées sur les pages clés
- **Page PISAM** (`/pisam`) : `AboutPage` + `MedicalOrganization`
- **Page Contact** (`/contact`) : `ContactPage` avec `PostalAddress`
- **Page Médecins** (`/medecins`) : `MedicalBusiness` avec liste de `Physician`
- **Page Blog** (`/blog`) : `CollectionPage`

### 5. Améliorer les balises OG
Remplacer le favicon (trop petit pour les réseaux sociaux) par une image OG dédiée (1200x630px minimum). Utiliser une image existante comme `hero-clinic.jpg` ou `pisam-aerial-view.jpg`.

### 6. Ajouter des balises canonical sur toutes les pages
Vérifier et ajouter `<link rel="canonical">` sur chaque page via Helmet, pointant vers `https://www.groupepisam.com/[path]`.

---

## Fichiers à modifier/créer

| Fichier | Action |
|---|---|
| `public/sitemap.xml` | Créer |
| `public/robots.txt` | Ajouter directive Sitemap |
| `src/pages/Index.tsx` | Ajouter JSON-LD Organization + WebSite + MedicalOrganization, améliorer OG image |
| `src/pages/Pisam.tsx` | Ajouter JSON-LD AboutPage |
| `src/pages/Contact.tsx` | Ajouter JSON-LD ContactPage |
| `src/pages/Medecins.tsx` | Ajouter JSON-LD MedicalBusiness |
| `src/pages/Blog.tsx` | Ajouter canonical |
| `src/pages/BioCSAM.tsx` | Ajouter canonical |
| `src/pages/CISAM.tsx` | Ajouter canonical |
| `src/pages/PisamPlus.tsx` | Ajouter canonical |
| `src/pages/PlateauTechnique.tsx` | Ajouter canonical |
| `src/pages/Pisam2.tsx` | Ajouter canonical |
| `src/pages/BilanSante.tsx` | Ajouter canonical |
| `src/pages/Patients.tsx` | Ajouter canonical |
| `index.html` | Mettre à jour OG image vers une vraie image (pas le favicon) |

---

## Actions hors-code (recommandations)

- **Google Search Console** : enregistrer le domaine `www.groupepisam.com`, soumettre le sitemap, demander l'indexation des pages principales
- **Créer une image OG professionnelle** (1200x630px) avec le logo PISAM et un visuel médical
- **Publier régulièrement** des articles de blog (le contenu frais améliore le ranking)
- **Obtenir des backlinks** depuis des annuaires médicaux ivoiriens, partenaires, et sites institutionnels

