-- ==============================================================================
-- SCHEMA DE BASE DE DONNEES : HIERARCHIE GEOGRAPHIQUE
-- Table : geolocations (Continent > Pays > Ville > Quartier / Arrondissement > Code Postal)
-- Compatible Supabase / PostgreSQL
-- ==============================================================================

-- 1. Creation de l'extension uuid-ossp si necessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Creation de la table principale
CREATE TABLE IF NOT EXISTS public.geolocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    continent VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    quartier_arrondissement VARCHAR(150) NOT NULL,
    code_postal VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexation pour accelerer les filtres en cascade et recherches
CREATE INDEX IF NOT EXISTS idx_geolocations_continent ON public.geolocations(continent);
CREATE INDEX IF NOT EXISTS idx_geolocations_pays ON public.geolocations(pays);
CREATE INDEX IF NOT EXISTS idx_geolocations_ville ON public.geolocations(ville);
CREATE INDEX IF NOT EXISTS idx_geolocations_code_postal ON public.geolocations(code_postal);

-- 4. Trigger de mise a jour automatique du champ updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_timestamp ON public.geolocations;
CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON public.geolocations
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. Configuration de la securite RLS (Row Level Security)
ALTER TABLE public.geolocations ENABLE ROW LEVEL SECURITY;

-- Politiques RLS permettant la lecture et l'ecriture pour le client anon (a ajuster selon vos besoins d'auth)
DROP POLICY IF EXISTS "Lecture publique des localisations" ON public.geolocations;
CREATE POLICY "Lecture publique des localisations" 
    ON public.geolocations FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Insertion publique des localisations" ON public.geolocations;
CREATE POLICY "Insertion publique des localisations" 
    ON public.geolocations FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Modification publique des localisations" ON public.geolocations;
CREATE POLICY "Modification publique des localisations" 
    ON public.geolocations FOR UPDATE 
    USING (true);

DROP POLICY IF EXISTS "Suppression publique des localisations" ON public.geolocations;
CREATE POLICY "Suppression publique des localisations" 
    ON public.geolocations FOR DELETE 
    USING (true);

-- 6. Insertion du jeu de donnees de test varie (Seed Data)
INSERT INTO public.geolocations (continent, pays, ville, quartier_arrondissement, code_postal) VALUES
-- Europe
('Europe', 'France', 'Paris', '1er Arrondissement (Louvre)', '75001'),
('Europe', 'France', 'Paris', '8e Arrondissement (Élysée)', '75008'),
('Europe', 'France', 'Paris', '18e Arrondissement (Montmartre)', '75018'),
('Europe', 'France', 'Lyon', '2e Arrondissement (Presqu''île)', '69002'),
('Europe', 'France', 'Lyon', '5e Arrondissement (Vieux Lyon)', '69005'),
('Europe', 'France', 'Marseille', '1er Arrondissement (Vieux-Port)', '13001'),
('Europe', 'France', 'Bordeaux', 'Centre-ville / Quinconces', '33000'),
('Europe', 'Belgique', 'Bruxelles', 'Pentagone / Centre Historique', '1000'),
('Europe', 'Belgique', 'Ixelles', 'Flagey - Châtelain', '1050'),
('Europe', 'Suisse', 'Genève', 'Les Pâquis', '1201'),
('Europe', 'Espagne', 'Barcelone', 'Eixample', '08007'),
('Europe', 'Espagne', 'Madrid', 'Malasaña', '28004'),
('Europe', 'Allemagne', 'Berlin', 'Mitte', '10115'),
('Europe', 'Royaume-Uni', 'Londres', 'Westminster', 'SW1A 1AA'),

-- Afrique
('Afrique', 'Cameroun', 'Douala', 'Akwa', 'BP 1024'),
('Afrique', 'Cameroun', 'Douala', 'Bonanjo', 'BP 1010'),
('Afrique', 'Cameroun', 'Douala', 'Bonapriso', 'BP 1015'),
('Afrique', 'Cameroun', 'Yaoundé', 'Bastos', 'BP 8001'),
('Afrique', 'Cameroun', 'Yaoundé', 'Omnisports', 'BP 8012'),
('Afrique', 'Sénégal', 'Dakar', 'Plateau', '10200'),
('Afrique', 'Sénégal', 'Dakar', 'Almadies', '10500'),
('Afrique', 'Côte d''Ivoire', 'Abidjan', 'Cocody', '01 BP 1200'),
('Afrique', 'Côte d''Ivoire', 'Abidjan', 'Plateau', '01 BP 1000'),
('Afrique', 'Maroc', 'Casablanca', 'Maârif', '20100'),
('Afrique', 'Maroc', 'Marrakech', 'Guéliz', '40000'),

-- Amérique du Nord
('Amérique du Nord', 'Canada', 'Montréal', 'Plateau-Mont-Royal', 'H2W 1V8'),
('Amérique du Nord', 'Canada', 'Montréal', 'Vieux-Montréal', 'H2Y 1G5'),
('Amérique du Nord', 'Canada', 'Québec', 'Vieux-Québec', 'G1R 4P5'),
('Amérique du Nord', 'États-Unis', 'New York', 'Manhattan / SoHo', '10012'),
('Amérique du Nord', 'États-Unis', 'New York', 'Brooklyn / Williamsburg', '11211'),
('Amérique du Nord', 'États-Unis', 'San Francisco', 'Mission District', '94110'),

-- Amérique du Sud
('Amérique du Sud', 'Brésil', 'São Paulo', 'Jardins', '01410-000'),
('Amérique du Sud', 'Brésil', 'Rio de Janeiro', 'Copacabana', '22070-001'),
('Amérique du Sud', 'Argentine', 'Buenos Aires', 'Palermo', 'C1425'),

-- Asie
('Asie', 'Japon', 'Tokyo', 'Shibuya', '150-0002'),
('Asie', 'Japon', 'Tokyo', 'Shinjuku', '160-0022'),
('Asie', 'Singapour', 'Singapour', 'Marina Bay', '018956'),
('Asie', 'Émirats Arabes Unis', 'Dubaï', 'Downtown Dubai', 'PO 11111'),

-- Océanie
('Océanie', 'Australie', 'Sydney', 'The Rocks', '2000'),
('Océanie', 'Australie', 'Melbourne', 'Carlton', '3053');
