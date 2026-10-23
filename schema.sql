-- ==============================================================================
-- SCHEMA DE BASE DE DONNEES : HIERARCHIE GEOGRAPHIQUE
-- Table : geolocations (Continent > Pays > Ville > Quartier / Arrondissement > Code Postal)
-- Compatible PostgreSQL / MySQL / SQLite
-- ==============================================================================

-- 1. Creation de l'extension uuid-ossp si PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Creation de la table principale
CREATE TABLE IF NOT EXISTS geolocations (
    id VARCHAR(64) PRIMARY KEY,
    continent VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    quartier_arrondissement VARCHAR(150) NOT NULL,
    code_postal VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexation pour accelerer les filtres en cascade et recherches
CREATE INDEX IF NOT EXISTS idx_geolocations_continent ON geolocations(continent);
CREATE INDEX IF NOT EXISTS idx_geolocations_pays ON geolocations(pays);
CREATE INDEX IF NOT EXISTS idx_geolocations_ville ON geolocations(ville);
CREATE INDEX IF NOT EXISTS idx_geolocations_code_postal ON geolocations(code_postal);

-- 4. Insertion du jeu de donnees de test varie (Seed Data)
INSERT INTO geolocations (id, continent, pays, ville, quartier_arrondissement, code_postal) VALUES
-- Europe
('e1-fr-par-1', 'Europe', 'France', 'Paris', '1er Arrondissement (Louvre)', '75001'),
('e2-fr-par-8', 'Europe', 'France', 'Paris', '8e Arrondissement (Élysée)', '75008'),
('e3-fr-par-18', 'Europe', 'France', 'Paris', '18e Arrondissement (Montmartre)', '75018'),
('e4-fr-lyo-2', 'Europe', 'France', 'Lyon', '2e Arrondissement (Presqu''île)', '69002'),
('e5-fr-lyo-5', 'Europe', 'France', 'Lyon', '5e Arrondissement (Vieux Lyon)', '69005'),
('e6-fr-mar-1', 'Europe', 'France', 'Marseille', '1er Arrondissement (Vieux-Port)', '13001'),
('e7-fr-bdx', 'Europe', 'France', 'Bordeaux', 'Centre-ville / Quinconces', '33000'),
('e8-be-bru', 'Europe', 'Belgique', 'Bruxelles', 'Pentagone / Centre Historique', '1000'),
('e9-be-ixe', 'Europe', 'Belgique', 'Ixelles', 'Flagey - Châtelain', '1050'),
('e10-ch-gen', 'Europe', 'Suisse', 'Genève', 'Les Pâquis', '1201'),
('e11-es-bar', 'Europe', 'Espagne', 'Barcelone', 'Eixample', '08007'),
('e12-es-mad', 'Europe', 'Espagne', 'Madrid', 'Malasaña', '28004'),
('e13-de-ber', 'Europe', 'Allemagne', 'Berlin', 'Mitte', '10115'),
('e14-uk-lon', 'Europe', 'Royaume-Uni', 'Londres', 'Westminster', 'SW1A 1AA'),

-- Afrique
('a1-cm-dla-1', 'Afrique', 'Cameroun', 'Douala', 'Akwa', 'BP 1024'),
('a2-cm-dla-2', 'Afrique', 'Cameroun', 'Douala', 'Bonanjo', 'BP 1010'),
('a3-cm-dla-3', 'Afrique', 'Cameroun', 'Douala', 'Bonapriso', 'BP 1015'),
('a4-cm-yao-1', 'Afrique', 'Cameroun', 'Yaoundé', 'Bastos', 'BP 8001'),
('a5-cm-yao-2', 'Afrique', 'Cameroun', 'Yaoundé', 'Omnisports', 'BP 8012'),
('a6-sn-dak-1', 'Afrique', 'Sénégal', 'Dakar', 'Plateau', '10200'),
('a7-sn-dak-2', 'Afrique', 'Sénégal', 'Dakar', 'Almadies', '10500'),
('a8-ci-abj-1', 'Afrique', 'Côte d''Ivoire', 'Abidjan', 'Cocody', '01 BP 1200'),
('a9-ci-abj-2', 'Afrique', 'Côte d''Ivoire', 'Abidjan', 'Plateau', '01 BP 1000'),
('a10-ma-cas', 'Afrique', 'Maroc', 'Casablanca', 'Maârif', '20100'),
('a11-ma-rak', 'Afrique', 'Maroc', 'Marrakech', 'Guéliz', '40000'),

-- Amérique du Nord
('na1-ca-mtl-1', 'Amérique du Nord', 'Canada', 'Montréal', 'Plateau-Mont-Royal', 'H2W 1V8'),
('na2-ca-mtl-2', 'Amérique du Nord', 'Canada', 'Montréal', 'Vieux-Montréal', 'H2Y 1G5'),
('na3-ca-que', 'Amérique du Nord', 'Canada', 'Québec', 'Vieux-Québec', 'G1R 4P5'),
('na4-us-nyc-1', 'Amérique du Nord', 'États-Unis', 'New York', 'Manhattan / SoHo', '10012'),
('na5-us-nyc-2', 'Amérique du Nord', 'États-Unis', 'New York', 'Brooklyn / Williamsburg', '11211'),
('na6-us-sfo', 'Amérique du Nord', 'États-Unis', 'San Francisco', 'Mission District', '94110'),

-- Amérique du Sud
('sa1-br-sao', 'Amérique du Sud', 'Brésil', 'São Paulo', 'Jardins', '01410-000'),
('sa2-br-rio', 'Amérique du Sud', 'Brésil', 'Rio de Janeiro', 'Copacabana', '22070-001'),
('sa3-ar-bue', 'Amérique du Sud', 'Argentine', 'Buenos Aires', 'Palermo', 'C1425'),

-- Asie
('as1-jp-tyo-1', 'Asie', 'Japon', 'Tokyo', 'Shibuya', '150-0002'),
('as2-jp-tyo-2', 'Asie', 'Japon', 'Tokyo', 'Shinjuku', '160-0022'),
('as3-sg-sin', 'Asie', 'Singapour', 'Singapour', 'Marina Bay', '018956'),
('as4-ae-dxb', 'Asie', 'Émirats Arabes Unis', 'Dubaï', 'Downtown Dubai', 'PO 11111'),

-- Océanie
('oc1-au-syd', 'Océanie', 'Australie', 'Sydney', 'The Rocks', '2000'),
('oc2-au-mel', 'Océanie', 'Australie', 'Melbourne', 'Carlton', '3053');
