# GéoHiérarchie Pro (Next.js + Supabase + TailwindCSS)

Application web moderne, réactive et complète permettant d'explorer, filtrer, trier et gérer une hiérarchie géographique structurée :

> **Continent &gt; Pays &gt; Ville &gt; Quartier / Arrondissement &gt; Code Postal**

---

## 🎯 Fonctionnalités Clés

1. **Tableau Dynamique & Interactif** :
   - Colonnes : **Continent | Pays | Ville | Quartier / Arrondissement | Code Postal | Actions**
   - Tri multi-colonnes en temps réel (ordre alphabétique A-Z / Z-A)
   - Pagination paramétrable (10, 20, 50, 100 lignes par page)
   - Badges de continent stylisés par couleur
   - Mode clair / sombre intégré

2. **Recherche & Filtres en Cascade** :
   - Recherche globale instantanée dans tous les champs
   - Filtres dépendants / en cascade :
     - Sélection d'un **Continent** &rarr; restreint automatiquement les **Pays**
     - Sélection d'un **Pays** &rarr; restreint automatiquement les **Villes**
   - Bouton de réinitialisation rapide des filtres

3. **Gestion Complète CRUD** :
   - **Ajout** : Modale responsive avec validation des champs
   - **Modification** : Édition en temps réel depuis le tableau
   - **Suppression** : Modale de confirmation sécurisée avec récapitulatif

4. **Statistiques en Temps Réel** :
   - 4 indicateurs KPI dynamiques : Total localisations, Continents uniques, Pays représentés, Villes répertoriées

5. **Exportation des Données** :
   - Export au format **CSV** (compatible Excel / encodage UTF-8 avec BOM)
   - Export au format **JSON**
   - Bouton de restauration du jeu de données de test

6. **Architecture Hybride Supabase / Local** :
   - Connectivité Supabase native si configurée (`.env.local`)
   - Mode local transparent avec persistance (`localStorage` + préchargement d'un jeu de données riche mondial) garantissant un fonctionnement 100% immédiat même hors ligne ou avant configuration de Supabase

---

## 🗄️ Initialisation de la Base de Données (Supabase / PostgreSQL)

Le fichier [`schema.sql`](file:///schema.sql) à la racine du projet contient :
- La création de l'extension `uuid-ossp`
- La table `public.geolocations` avec typages stricts
- Les index d'optimisation sur `continent`, `pays`, `ville`, `code_postal`
- Le trigger automatique `handle_updated_at`
- Les politiques RLS (Row Level Security)
- Le jeu de données de test mondial (Europe, Afrique, Amérique du Nord, Amérique du Sud, Asie, Océanie)

### Pour déployer sur Supabase :
1. Rendez-vous sur votre dashboard [Supabase](https://supabase.com).
2. Ouvrez le **SQL Editor**.
3. Copiez et collez le contenu du fichier `schema.sql` puis cliquez sur **Run**.
4. Récupérez vos clés dans **Project Settings > API**.

---

## ⚙️ Configuration (.env.local)

Créez un fichier `.env.local` à la racine (ou copiez `.env.example`) :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_publique
```

*(Si ces variables ne sont pas définies, l'application fonctionne automatiquement en mode local avec cache persistant).*

---

## 🚀 Lancement Local

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrage du serveur de développement
```bash
npm run dev
```

L'application est accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

### 3. Build pour la production
```bash
npm run build
npm run start
```

---

## 📁 Structure du Projet

```text
├── schema.sql                       # Script SQL d'initialisation Supabase / Postgres
├── package.json                     # Dépendances & scripts npm
├── tsconfig.json                    # Configuration TypeScript
├── tailwind.config.js               # Configuration TailwindCSS
├── postcss.config.js                # Configuration PostCSS
├── next.config.mjs                  # Configuration Next.js
├── .env.example                     # Exemple de variables d'environnement
├── src/
│   ├── app/
│   │   ├── globals.css              # Styles globaux & variables Tailwind
│   │   ├── layout.tsx               # Layout racine Next.js (App Router)
│   │   └── page.tsx                 # Page principale de l'application
│   ├── components/
│   │   ├── Header.tsx               # En-tête avec indicateur de connexion et thème
│   │   ├── StatsCards.tsx           # Cartes KPI statistiques
│   │   ├── Filters.tsx              # Recherche & filtres en cascade
│   │   ├── GeoTable.tsx             # Tableau interactif avec tri et pagination
│   │   ├── GeoModal.tsx             # Modale de création et édition (CRUD)
│   │   ├── DeleteConfirmModal.tsx   # Modale de confirmation de suppression
│   │   └── ExportButtons.tsx        # Boutons d'export CSV / JSON
│   ├── lib/
│   │   ├── supabase.ts              # Client Supabase avec détection dynamique
│   │   ├── seed-data.ts             # Jeu de données d'exemple riche
│   │   └── geo-storage.ts           # Service unifié Supabase & Stockage Local
│   └── types/
│       └── geo.ts                   # Interfaces TypeScript pour la hiérarchie
```
