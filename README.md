# GéoHiérarchie Pro (Next.js + TailwindCSS)

Application web moderne, 100% autonome et réactive permettant d'explorer, filtrer, trier et gérer une hiérarchie géographique structurée :

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

5. **Exportation des Données & Téléchargement Excel** :
   - Téléchargement direct du fichier **Excel (.xlsx)** depuis l'en-tête de l'application
   - Export au format **CSV** (compatible Excel / encodage UTF-8 avec BOM)
   - Export au format **JSON**
   - Bouton de restauration du jeu de données de test

6. **Base de Données Locale Autonome & Persistante** :
   - Fonctionnement autonome sans dépendance de service cloud externe
   - Persistance automatique dans le stockage local du navigateur
   - Jeu de données mondial complet préchargé au premier démarrage

---

## 🗄️ Schéma SQL Universel ([`schema.sql`](file:///schema.sql))

Pour les utilisateurs souhaitant exporter les données vers un SGBD relationnel (PostgreSQL, MySQL, SQLite), un script SQL propre est fourni avec :
- Création de la table `geolocations`
- Index d'optimisation
- Jeu complet de données de test

---

## 🚀 Lancement Local

### 1. En 1 clic (Windows) :
Double-cliquez sur :
```text
lancer-application.bat
```

### 2. En ligne de commande :
```bash
npm run dev
```

L'application est accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

### 3. Build pour la production :
```bash
npm run build
npm run start
```
