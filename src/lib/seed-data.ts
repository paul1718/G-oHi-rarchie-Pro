import { GeoLocation } from '@/types/geo';

export const INITIAL_GEO_DATA: GeoLocation[] = [
  // Europe - France
  {
    id: "e1-fr-par-1",
    continent: "Europe",
    pays: "France",
    ville: "Paris",
    quartier_arrondissement: "1er Arrondissement (Louvre)",
    modele_code_postal: "Modèle 75001 à 75020 (750XX)",
    format_regle: "5 chiffres : 750 + N° d'arrondissement (ex: 75001 pour le 1er)",
    exemples_types: "75001 (Louvre), 75002 (Bourse), 75004 (Marais)",
    created_at: "2024-01-10T08:00:00Z"
  },
  {
    id: "e2-fr-par-8",
    continent: "Europe",
    pays: "France",
    ville: "Paris",
    quartier_arrondissement: "8e Arrondissement (Élysée / Madeleine)",
    modele_code_postal: "Modèle 75001 à 75020 (750XX)",
    format_regle: "5 chiffres : 750 + N° d'arrondissement (ex: 75008 pour le 8e)",
    exemples_types: "75008 (Champs-Élysées), 75009 (Opéra)",
    created_at: "2024-01-11T09:30:00Z"
  },
  {
    id: "e3-fr-par-18",
    continent: "Europe",
    pays: "France",
    ville: "Paris",
    quartier_arrondissement: "18e Arrondissement (Montmartre / Goutte d'Or)",
    modele_code_postal: "Modèle 75001 à 75020 (750XX)",
    format_regle: "5 chiffres : 750 + N° d'arrondissement (ex: 75018 pour le 18e)",
    exemples_types: "75018 (Montmartre), 75019 (Buttes-Chaumont), 75020 (Ménilmontant)",
    created_at: "2024-01-12T11:00:00Z"
  },
  {
    id: "e4-fr-lyo-2",
    continent: "Europe",
    pays: "France",
    ville: "Lyon",
    quartier_arrondissement: "2e Arrondissement (Presqu'île / Bellecour)",
    modele_code_postal: "Modèle 69001 à 69009 (6900X)",
    format_regle: "5 chiffres : 6900 + N° d'arrondissement (ex: 69002 pour le 2e)",
    exemples_types: "69001 (Terreaux), 69002 (Bellecour), 69003 (Part-Dieu)",
    created_at: "2024-01-15T14:15:00Z"
  },
  {
    id: "e5-fr-lyo-5",
    continent: "Europe",
    pays: "France",
    ville: "Lyon",
    quartier_arrondissement: "5e Arrondissement (Vieux Lyon / Fourvière)",
    modele_code_postal: "Modèle 69001 à 69009 (6900X)",
    format_regle: "5 chiffres : 6900 + N° d'arrondissement (ex: 69005 pour le 5e)",
    exemples_types: "69005 (Vieux Lyon), 69004 (Croix-Rousse), 69006 (Brotteaux)",
    created_at: "2024-01-16T10:00:00Z"
  },
  {
    id: "e6-fr-mar-1",
    continent: "Europe",
    pays: "France",
    ville: "Marseille",
    quartier_arrondissement: "1er Arrondissement (Vieux-Port / Noailles)",
    modele_code_postal: "Modèle 13001 à 13016 (130XX)",
    format_regle: "5 chiffres : 130 + N° d'arrondissement (ex: 13001 pour le 1er)",
    exemples_types: "13001 (Vieux-Port), 13006 (Castellane), 13008 (Prado)",
    created_at: "2024-01-18T16:20:00Z"
  },
  {
    id: "e7-fr-bdx",
    continent: "Europe",
    pays: "France",
    ville: "Bordeaux",
    quartier_arrondissement: "Centre-ville / Quinconces / Chartrons",
    modele_code_postal: "Modèle 33000 à 33800 (33XXX)",
    format_regle: "5 chiffres : 33 (Gironde) + découpage sectoriel municipal",
    exemples_types: "33000 (Hypercentre), 33200 (Caudéran), 33300 (Bacalan)",
    created_at: "2024-01-19T09:45:00Z"
  },

  // Europe - Autres
  {
    id: "e8-be-bru",
    continent: "Europe",
    pays: "Belgique",
    ville: "Bruxelles",
    quartier_arrondissement: "Pentagone / Centre Historique",
    modele_code_postal: "Modèle 1000 à 1210 (1XXX)",
    format_regle: "4 chiffres : 1XXX pour la Région de Bruxelles-Capitale",
    exemples_types: "1000 (Bruxelles-Ville), 1050 (Ixelles), 1060 (Saint-Gilles)",
    created_at: "2024-01-20T12:00:00Z"
  },
  {
    id: "e10-ch-gen",
    continent: "Europe",
    pays: "Suisse",
    ville: "Genève",
    quartier_arrondissement: "Les Pâquis / Rive Droite",
    modele_code_postal: "Modèle 1200 à 1211 (12XX)",
    format_regle: "4 chiffres : 12XX pour le canton de Genève et ses arrondissements",
    exemples_types: "1201 (Pâquis/Gare), 1204 (Vieille-Ville), 1205 (Plainpalais)",
    created_at: "2024-01-22T08:15:00Z"
  },
  {
    id: "e11-es-bar",
    continent: "Europe",
    pays: "Espagne",
    ville: "Barcelone",
    quartier_arrondissement: "Eixample / Gràcia",
    modele_code_postal: "Modèle 08001 à 08042 (080XX)",
    format_regle: "5 chiffres : 08 (Province de Barcelone) + n° de district postal",
    exemples_types: "08007 (Eixample Dret), 08012 (Gràcia), 08001 (Raval)",
    created_at: "2024-01-23T15:00:00Z"
  },
  {
    id: "e13-de-ber",
    continent: "Europe",
    pays: "Allemagne",
    ville: "Berlin",
    quartier_arrondissement: "Mitte / Tiergarten",
    modele_code_postal: "Modèle 10115 à 14199 (1XXXX)",
    format_regle: "5 chiffres : Zone postale 1 (Berlin & Brandenburg) par secteur",
    exemples_types: "10115 (Mitte Nord), 10117 (Mitte Sud), 10435 (Prenzlauer Berg)",
    created_at: "2024-01-25T11:40:00Z"
  },
  {
    id: "e14-uk-lon",
    continent: "Europe",
    pays: "Royaume-Uni",
    ville: "Londres",
    quartier_arrondissement: "Westminster / City of London",
    modele_code_postal: "Modèle Alphanumérique par Secteur (Zone + District)",
    format_regle: "1-2 Lettres cardinales (SW, W, WC, EC) + 1-2 Chiffres + Espace + Chiffre + 2 Lettres",
    exemples_types: "SW1A (Westminster), EC1A (City Nord), W1D (Soho)",
    created_at: "2024-01-26T14:50:00Z"
  },

  // Afrique
  {
    id: "a1-cm-dla-1",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Douala",
    quartier_arrondissement: "Douala 1er (Akwa / Bonanjo)",
    modele_code_postal: "Modèle Boîte Postale / Agence (BP 1000 à 1500)",
    format_regle: "Mention 'BP' + 4 chiffres selon l'agence de rattachement du quartier",
    exemples_types: "BP 1024 (Akwa), BP 1010 (Bonanjo), BP 1015 (Bonapriso)",
    created_at: "2024-02-01T09:00:00Z"
  },
  {
    id: "a4-cm-yao-1",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Yaoundé",
    quartier_arrondissement: "Yaoundé 1er (Bastos / Omnisports)",
    modele_code_postal: "Modèle Boîte Postale / Agence (BP 8000 à 8500)",
    format_regle: "Mention 'BP' + 4 chiffres selon le centre de tri du secteur",
    exemples_types: "BP 8001 (Bastos), BP 8012 (Omnisports), BP 8110 (Mokolo)",
    created_at: "2024-02-04T14:00:00Z"
  },
  {
    id: "a6-sn-dak-1",
    continent: "Afrique",
    pays: "Sénégal",
    ville: "Dakar",
    quartier_arrondissement: "Dakar-Plateau / Médina",
    modele_code_postal: "Modèle 10000 à 12500 (5 chiffres)",
    format_regle: "5 chiffres : 10000 à 19999 pour la presqu'île de Dakar",
    exemples_types: "10200 (Dakar-Plateau), 10500 (Almadies / Ngor), 11000 (Grand Dakar)",
    created_at: "2024-02-06T08:45:00Z"
  },
  {
    id: "a8-ci-abj-1",
    continent: "Afrique",
    pays: "Côte d'Ivoire",
    ville: "Abidjan",
    quartier_arrondissement: "Cocody / Deux-Plateaux",
    modele_code_postal: "Modèle Boîte Postale Communale (01 BP à 30 BP)",
    format_regle: "Numéro communal (ex: 01 BP, 08 BP) + 4 chiffres de bureau postal",
    exemples_types: "01 BP 1200 (Cocody Centre), 01 BP 1000 (Plateau), 08 BP 2200 (Deux-Plateaux)",
    created_at: "2024-02-08T10:05:00Z"
  },
  {
    id: "a10-ma-cas",
    continent: "Afrique",
    pays: "Maroc",
    ville: "Casablanca",
    quartier_arrondissement: "Anfa / Maârif / Sidi Belyout",
    modele_code_postal: "Modèle 20000 à 20700 (5 chiffres)",
    format_regle: "5 chiffres : 20XXX pour le Grand Casablanca par arrondissement",
    exemples_types: "20100 (Maârif), 20000 (Sidi Belyout), 20250 (Ain Diab)",
    created_at: "2024-02-10T11:25:00Z"
  },

  // Amérique du Nord
  {
    id: "na1-ca-mtl-1",
    continent: "Amérique du Nord",
    pays: "Canada",
    ville: "Montréal",
    quartier_arrondissement: "Le Plateau-Mont-Royal / Mile-End",
    modele_code_postal: "Modèle Alphanumérique H2X / H2W (ANA NAN)",
    format_regle: "H (Région métropolitaine Montréal) + Alternance Chiffre/Lettre : H#X #X#",
    exemples_types: "H2W 1V8 (Plateau Ouest), H2T 2M5 (Mile End), H2J 3K2 (Plateau Est)",
    created_at: "2024-02-12T09:15:00Z"
  },
  {
    id: "na2-ca-mtl-2",
    continent: "Amérique du Nord",
    pays: "Canada",
    ville: "Montréal",
    quartier_arrondissement: "Ville-Marie / Vieux-Montréal",
    modele_code_postal: "Modèle Alphanumérique H2Y / H3B / H3C (ANA NAN)",
    format_regle: "H (Région métropolitaine Montréal) + Alternance Chiffre/Lettre",
    exemples_types: "H2Y 1G5 (Vieux-Montréal), H3B 4G7 (Centre-ville), H3C 5K4 (Griffintown)",
    created_at: "2024-02-13T10:30:00Z"
  },
  {
    id: "na4-us-nyc-1",
    continent: "Amérique du Nord",
    pays: "États-Unis",
    ville: "New York",
    quartier_arrondissement: "Manhattan (SoHo / Greenwich Village)",
    modele_code_postal: "Modèle ZIP Code 10001 à 10282 (100XX)",
    format_regle: "5 chiffres : 100XX spécifique aux quartiers de l'île de Manhattan",
    exemples_types: "10012 (SoHo), 10014 (West Village), 10003 (East Village)",
    created_at: "2024-02-15T15:55:00Z"
  },
  {
    id: "na5-us-nyc-2",
    continent: "Amérique du Nord",
    pays: "États-Unis",
    ville: "New York",
    quartier_arrondissement: "Brooklyn (Williamsburg / DUMBO)",
    modele_code_postal: "Modèle ZIP Code 11201 à 11256 (112XX)",
    format_regle: "5 chiffres : 112XX spécifique aux arrondissements de Brooklyn",
    exemples_types: "11211 (Williamsburg), 11201 (DUMBO/Brooklyn Heights), 11215 (Park Slope)",
    created_at: "2024-02-16T17:10:00Z"
  },

  // Amérique du Sud
  {
    id: "sa1-br-sao",
    continent: "Amérique du Sud",
    pays: "Brésil",
    ville: "São Paulo",
    quartier_arrondissement: "Jardins / Cerqueira César",
    modele_code_postal: "Modèle CEP 01000-000 à 05999-999 (014XX-XXX)",
    format_regle: "8 chiffres au format CEP : 5 chiffres + tiret + 3 chiffres de sous-secteur",
    exemples_types: "01410-000 (Jardins), 01415-000 (Cerqueira César)",
    created_at: "2024-02-18T12:00:00Z"
  },
  {
    id: "sa3-ar-bue",
    continent: "Amérique du Sud",
    pays: "Argentine",
    ville: "Buenos Aires",
    quartier_arrondissement: "Palermo / Recoleta",
    modele_code_postal: "Modèle CPA Alphanumérique (C14XX / C10XX)",
    format_regle: "Lettre C (Capital Federal) + 4 chiffres d'arrondissement + 3 lettres",
    exemples_types: "C1425 (Palermo), C1018 (Recoleta), C1002 (San Telmo)",
    created_at: "2024-02-20T14:50:00Z"
  },

  // Asie
  {
    id: "as1-jp-tyo-1",
    continent: "Asie",
    pays: "Japon",
    ville: "Tokyo",
    quartier_arrondissement: "Shibuya-ku",
    modele_code_postal: "Modèle 150-0000 à 151-9999 (150-XXXX)",
    format_regle: "7 chiffres : 3 chiffres + tiret + 4 chiffres pour l'arrondissement spécial",
    exemples_types: "150-0001 (Jingumae), 150-0002 (Shibuya), 150-0043 (Dogenzaka)",
    created_at: "2024-02-21T07:10:00Z"
  },
  {
    id: "as4-ae-dxb",
    continent: "Asie",
    pays: "Émirats Arabes Unis",
    ville: "Dubaï",
    quartier_arrondissement: "Downtown Dubai / Business Bay",
    modele_code_postal: "Modèle Système Makani / P.O. Box Sectoriel",
    format_regle: "Pas de code postal individuel obligatoire : Makani (10 chiffres) ou P.O. Box",
    exemples_types: "Makani 30032 95320 (Burj Khalifa), P.O. Box 11111",
    created_at: "2024-02-24T16:00:00Z"
  },

  // Océanie
  {
    id: "oc1-au-syd",
    continent: "Océanie",
    pays: "Australie",
    ville: "Sydney",
    quartier_arrondissement: "Sydney CBD / The Rocks / Haymarket",
    modele_code_postal: "Modèle 2000 à 2010 (2XXX)",
    format_regle: "4 chiffres : Préfixe 2 (New South Wales) + tranche 2000-2010 pour le centre",
    exemples_types: "2000 (CBD/The Rocks), 2010 (Surry Hills), 2008 (Chippendale)",
    created_at: "2024-02-25T05:20:00Z"
  }
];
