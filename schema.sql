-- ==============================================================================
-- SCHEMA DE BASE DE DONNEES : HIERARCHIE ET MODELES DE CODES POSTAUX
-- Table : geolocations (Continent > Pays > Ville > Quartier / Arrondissement > Modèle de Code Postal)
-- Compatible PostgreSQL / MySQL / SQLite
-- ==============================================================================

CREATE TABLE IF NOT EXISTS geolocations (
    id VARCHAR(64) PRIMARY KEY,
    continent VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    quartier_arrondissement VARCHAR(150) NOT NULL,
    modele_code_postal VARCHAR(150) NOT NULL,
    format_regle VARCHAR(255) NOT NULL,
    exemples_types VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_geolocations_continent ON geolocations(continent);
CREATE INDEX IF NOT EXISTS idx_geolocations_pays ON geolocations(pays);
CREATE INDEX IF NOT EXISTS idx_geolocations_ville ON geolocations(ville);

-- Insertion des modèles types par quartier et arrondissement
INSERT INTO geolocations (id, continent, pays, ville, quartier_arrondissement, modele_code_postal, format_regle, exemples_types) VALUES
('e1-fr-par-1', 'Europe', 'France', 'Paris', '1er Arrondissement (Louvre)', 'Modèle 75001 à 75020 (750XX)', '5 chiffres : 750 + N° d''arrondissement', '75001 (Louvre), 75002 (Bourse), 75004 (Marais)'),
('e2-fr-par-8', 'Europe', 'France', 'Paris', '8e Arrondissement (Élysée / Madeleine)', 'Modèle 75001 à 75020 (750XX)', '5 chiffres : 750 + N° d''arrondissement', '75008 (Champs-Élysées), 75009 (Opéra)'),
('e3-fr-par-18', 'Europe', 'France', 'Paris', '18e Arrondissement (Montmartre)', 'Modèle 75001 à 75020 (750XX)', '5 chiffres : 750 + N° d''arrondissement', '75018 (Montmartre), 75019 (Buttes-Chaumont)'),
('e4-fr-lyo-2', 'Europe', 'France', 'Lyon', '2e Arrondissement (Presqu''île)', 'Modèle 69001 à 69009 (6900X)', '5 chiffres : 6900 + N° d''arrondissement', '69001 (Terreaux), 69002 (Bellecour)'),
('e6-fr-mar-1', 'Europe', 'France', 'Marseille', '1er Arrondissement (Vieux-Port)', 'Modèle 13001 à 13016 (130XX)', '5 chiffres : 130 + N° d''arrondissement', '13001 (Vieux-Port), 13006 (Castellane)'),
('e8-be-bru', 'Europe', 'Belgique', 'Bruxelles', 'Pentagone / Centre Historique', 'Modèle 1000 à 1210 (1XXX)', '4 chiffres : 1XXX pour Bruxelles-Capitale', '1000 (Bruxelles-Ville), 1050 (Ixelles)'),
('e10-ch-gen', 'Europe', 'Suisse', 'Genève', 'Les Pâquis / Rive Droite', 'Modèle 1200 à 1211 (12XX)', '4 chiffres : 12XX pour le canton de Genève', '1201 (Pâquis/Gare), 1204 (Vieille-Ville)'),
('e14-uk-lon', 'Europe', 'Royaume-Uni', 'Londres', 'Westminster / City', 'Modèle Alphanumérique par Secteur', 'Lettres cardinales + Chiffres + Espace + Chiffre + Lettres', 'SW1A (Westminster), EC1A (City Nord)'),
('a1-cm-dla-1', 'Afrique', 'Cameroun', 'Douala', 'Douala 1er (Akwa / Bonanjo)', 'Modèle Boîte Postale / Agence (BP 1000 à 1500)', 'Mention BP + 4 chiffres selon l''agence de rattachement', 'BP 1024 (Akwa), BP 1010 (Bonanjo)'),
('a4-cm-yao-1', 'Afrique', 'Cameroun', 'Yaoundé', 'Yaoundé 1er (Bastos)', 'Modèle Boîte Postale / Agence (BP 8000 à 8500)', 'Mention BP + 4 chiffres selon le centre de tri', 'BP 8001 (Bastos), BP 8012 (Omnisports)'),
('a6-sn-dak-1', 'Afrique', 'Sénégal', 'Dakar', 'Dakar-Plateau / Médina', 'Modèle 10000 à 12500 (5 chiffres)', '5 chiffres : 10000 à 19999 pour la presqu''île', '10200 (Plateau), 10500 (Almadies)'),
('a8-ci-abj-1', 'Afrique', 'Côte d''Ivoire', 'Abidjan', 'Cocody / Deux-Plateaux', 'Modèle Boîte Postale Communale (01 BP à 30 BP)', 'Numéro communal (ex: 01 BP) + 4 chiffres de bureau', '01 BP 1200 (Cocody), 01 BP 1000 (Plateau)'),
('na1-ca-mtl-1', 'Amérique du Nord', 'Canada', 'Montréal', 'Le Plateau-Mont-Royal', 'Modèle Alphanumérique H2X / H2W (ANA NAN)', 'H (Région métropolitaine) + Alternance Chiffre/Lettre', 'H2W 1V8 (Plateau Ouest), H2T 2M5 (Mile End)'),
('na4-us-nyc-1', 'Amérique du Nord', 'États-Unis', 'New York', 'Manhattan (SoHo / Greenwich Village)', 'Modèle ZIP Code 10001 à 10282 (100XX)', '5 chiffres : 100XX spécifique à Manhattan', '10012 (SoHo), 10014 (West Village)'),
('sa1-br-sao', 'Amérique du Sud', 'Brésil', 'São Paulo', 'Jardins / Cerqueira César', 'Modèle CEP 01000-000 à 05999-999 (014XX-XXX)', '8 chiffres au format CEP (5 chiffres + tiret + 3 chiffres)', '01410-000 (Jardins), 01415-000'),
('as1-jp-tyo-1', 'Asie', 'Japon', 'Tokyo', 'Shibuya-ku', 'Modèle 150-0000 à 151-9999 (150-XXXX)', '7 chiffres : 3 chiffres + tiret + 4 chiffres d''arrondissement', '150-0001 (Jingumae), 150-0002 (Shibuya)'),
('oc1-au-syd', 'Océanie', 'Australie', 'Sydney', 'Sydney CBD / The Rocks', 'Modèle 2000 à 2010 (2XXX)', '4 chiffres : Préfixe 2 (NSW) + tranche 2000-2010', '2000 (The Rocks), 2010 (Surry Hills)');
