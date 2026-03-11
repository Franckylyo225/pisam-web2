

## Plan de remplacement du domaine pisam.ci par www.groupepisam.com

Je dois remplacer toutes les références au domaine `pisam.ci` par `www.groupepisam.com` dans tout le codebase. Voici les fichiers concernés :

### Fichiers et modifications

1. **index.html** (SEO/meta tags)
   - Remplacer `https://pisam.ci` par `https://www.groupepisam.com` dans le canonical
   - Remplacer les URLs `og:image` et `twitter:image` (qui pointent vers le preview Lovable) par `https://www.groupepisam.com/favicon.png`

2. **src/pages/Index.tsx** (SEO Helmet)
   - Remplacer `https://pisam.ci` par `https://www.groupepisam.com` dans le canonical

3. **src/pages/ArticleDetail.tsx** (Articles blog)
   - Remplacer `https://pisam.ci/logo-pisam.png` par `https://www.groupepisam.com/logo-pisam.png`
   - Remplacer `https://pisam.ci/blog/` par `https://www.groupepisam.com/blog/`

4. **src/pages/Contact.tsx** (Page contact)
   - Remplacer `info@pisam.ci` par `info@groupepisam.com`
   - Remplacer `bilandesante@pisam.ci` par `bilandesante@groupepisam.com`

5. **src/pages/PolitiqueConfidentialite.tsx** (Politique confidentialité)
   - Remplacer `contact@pisam.ci` par `contact@groupepisam.com` (3 occurrences)

6. **src/pages/MentionsLegales.tsx** (Mentions légales)
   - Remplacer `contact@pisam.ci` par `contact@groupepisam.com` (2 occurrences)

7. **src/components/layout/Footer.tsx** (Pied de page)
   - Remplacer `info@pisam.ci` par `info@groupepisam.com`

8. **src/pages/BioCSAM.tsx** (Page BioCSAM)
   - Remplacer `bilandesanté@pisam.ci` par `bilandesante@groupepisam.com`

9. **src/pages/BilanSante.tsx** (Page Bilan Santé)
   - Remplacer `bilandesante@pisam.ci` par `bilandesante@groupepisam.com`

10. **src/pages/admin/AdminsAdmin.tsx** (Admin)
    - Remplacer `utilisateur@pisam.ci` par `utilisateur@groupepisam.com`

11. **src/pages/Auth.tsx** (Authentification)
    - Remplacer `admin@pisam.ci` par `admin@groupepisam.com` (3 occurrences)

