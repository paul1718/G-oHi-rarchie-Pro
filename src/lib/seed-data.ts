import { GeoLocation } from '@/types/geo';

export const INITIAL_GEO_DATA: GeoLocation[] = [
  // Europe
  {
    id: "e1-fr-par-1",
    continent: "Europe",
    pays: "France",
    ville: "Paris",
    quartier_arrondissement: "1er Arrondissement (Louvre)",
    code_postal: "75001",
    created_at: "2024-01-10T08:00:00Z"
  },
  {
    id: "e2-fr-par-8",
    continent: "Europe",
    pays: "France",
    ville: "Paris",
    quartier_arrondissement: "8e Arrondissement (Élysée)",
    code_postal: "75008",
    created_at: "2024-01-11T09:30:00Z"
  },
  {
    id: "e3-fr-par-18",
    continent: "Europe",
    pays: "France",
    ville: "Paris",
    quartier_arrondissement: "18e Arrondissement (Montmartre)",
    code_postal: "75018",
    created_at: "2024-01-12T11:00:00Z"
  },
  {
    id: "e4-fr-lyo-2",
    continent: "Europe",
    pays: "France",
    ville: "Lyon",
    quartier_arrondissement: "2e Arrondissement (Presqu'île)",
    code_postal: "69002",
    created_at: "2024-01-15T14:15:00Z"
  },
  {
    id: "e5-fr-lyo-5",
    continent: "Europe",
    pays: "France",
    ville: "Lyon",
    quartier_arrondissement: "5e Arrondissement (Vieux Lyon)",
    code_postal: "69005",
    created_at: "2024-01-16T10:00:00Z"
  },
  {
    id: "e6-fr-mar-1",
    continent: "Europe",
    pays: "France",
    ville: "Marseille",
    quartier_arrondissement: "1er Arrondissement (Vieux-Port)",
    code_postal: "13001",
    created_at: "2024-01-18T16:20:00Z"
  },
  {
    id: "e7-fr-bdx",
    continent: "Europe",
    pays: "France",
    ville: "Bordeaux",
    quartier_arrondissement: "Centre-ville / Quinconces",
    code_postal: "33000",
    created_at: "2024-01-19T09:45:00Z"
  },
  {
    id: "e8-be-bru",
    continent: "Europe",
    pays: "Belgique",
    ville: "Bruxelles",
    quartier_arrondissement: "Pentagone / Centre Historique",
    code_postal: "1000",
    created_at: "2024-01-20T12:00:00Z"
  },
  {
    id: "e9-be-ixe",
    continent: "Europe",
    pays: "Belgique",
    ville: "Ixelles",
    quartier_arrondissement: "Flagey - Châtelain",
    code_postal: "1050",
    created_at: "2024-01-21T13:30:00Z"
  },
  {
    id: "e10-ch-gen",
    continent: "Europe",
    pays: "Suisse",
    ville: "Genève",
    quartier_arrondissement: "Les Pâquis",
    code_postal: "1201",
    created_at: "2024-01-22T08:15:00Z"
  },
  {
    id: "e11-es-bar",
    continent: "Europe",
    pays: "Espagne",
    ville: "Barcelone",
    quartier_arrondissement: "Eixample",
    code_postal: "08007",
    created_at: "2024-01-23T15:00:00Z"
  },
  {
    id: "e12-es-mad",
    continent: "Europe",
    pays: "Espagne",
    ville: "Madrid",
    quartier_arrondissement: "Malasaña",
    code_postal: "28004",
    created_at: "2024-01-24T17:10:00Z"
  },
  {
    id: "e13-de-ber",
    continent: "Europe",
    pays: "Allemagne",
    ville: "Berlin",
    quartier_arrondissement: "Mitte",
    code_postal: "10115",
    created_at: "2024-01-25T11:40:00Z"
  },
  {
    id: "e14-uk-lon",
    continent: "Europe",
    pays: "Royaume-Uni",
    ville: "Londres",
    quartier_arrondissement: "Westminster",
    code_postal: "SW1A 1AA",
    created_at: "2024-01-26T14:50:00Z"
  },

  // Afrique
  {
    id: "a1-cm-dla-1",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Douala",
    quartier_arrondissement: "Akwa",
    code_postal: "BP 1024",
    created_at: "2024-02-01T09:00:00Z"
  },
  {
    id: "a2-cm-dla-2",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Douala",
    quartier_arrondissement: "Bonanjo",
    code_postal: "BP 1010",
    created_at: "2024-02-02T10:15:00Z"
  },
  {
    id: "a3-cm-dla-3",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Douala",
    quartier_arrondissement: "Bonapriso",
    code_postal: "BP 1015",
    created_at: "2024-02-03T11:30:00Z"
  },
  {
    id: "a4-cm-yao-1",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Yaoundé",
    quartier_arrondissement: "Bastos",
    code_postal: "BP 8001",
    created_at: "2024-02-04T14:00:00Z"
  },
  {
    id: "a5-cm-yao-2",
    continent: "Afrique",
    pays: "Cameroun",
    ville: "Yaoundé",
    quartier_arrondissement: "Omnisports",
    code_postal: "BP 8012",
    created_at: "2024-02-05T15:20:00Z"
  },
  {
    id: "a6-sn-dak-1",
    continent: "Afrique",
    pays: "Sénégal",
    ville: "Dakar",
    quartier_arrondissement: "Plateau",
    code_postal: "10200",
    created_at: "2024-02-06T08:45:00Z"
  },
  {
    id: "a7-sn-dak-2",
    continent: "Afrique",
    pays: "Sénégal",
    ville: "Dakar",
    quartier_arrondissement: "Almadies",
    code_postal: "10500",
    created_at: "2024-02-07T13:10:00Z"
  },
  {
    id: "a8-ci-abj-1",
    continent: "Afrique",
    pays: "Côte d'Ivoire",
    ville: "Abidjan",
    quartier_arrondissement: "Cocody",
    code_postal: "01 BP 1200",
    created_at: "2024-02-08T10:05:00Z"
  },
  {
    id: "a9-ci-abj-2",
    continent: "Afrique",
    pays: "Côte d'Ivoire",
    ville: "Abidjan",
    quartier_arrondissement: "Plateau",
    code_postal: "01 BP 1000",
    created_at: "2024-02-09T16:40:00Z"
  },
  {
    id: "a10-ma-cas",
    continent: "Afrique",
    pays: "Maroc",
    ville: "Casablanca",
    quartier_arrondissement: "Maârif",
    code_postal: "20100",
    created_at: "2024-02-10T11:25:00Z"
  },
  {
    id: "a11-ma-rak",
    continent: "Afrique",
    pays: "Maroc",
    ville: "Marrakech",
    quartier_arrondissement: "Guéliz",
    code_postal: "40000",
    created_at: "2024-02-11T12:50:00Z"
  },

  // Amérique du Nord
  {
    id: "na1-ca-mtl-1",
    continent: "Amérique du Nord",
    pays: "Canada",
    ville: "Montréal",
    quartier_arrondissement: "Plateau-Mont-Royal",
    code_postal: "H2W 1V8",
    created_at: "2024-02-12T09:15:00Z"
  },
  {
    id: "na2-ca-mtl-2",
    continent: "Amérique du Nord",
    pays: "Canada",
    ville: "Montréal",
    quartier_arrondissement: "Vieux-Montréal",
    code_postal: "H2Y 1G5",
    created_at: "2024-02-13T10:30:00Z"
  },
  {
    id: "na3-ca-que",
    continent: "Amérique du Nord",
    pays: "Canada",
    ville: "Québec",
    quartier_arrondissement: "Vieux-Québec",
    code_postal: "G1R 4P5",
    created_at: "2024-02-14T14:45:00Z"
  },
  {
    id: "na4-us-nyc-1",
    continent: "Amérique du Nord",
    pays: "États-Unis",
    ville: "New York",
    quartier_arrondissement: "Manhattan / SoHo",
    code_postal: "10012",
    created_at: "2024-02-15T15:55:00Z"
  },
  {
    id: "na5-us-nyc-2",
    continent: "Amérique du Nord",
    pays: "États-Unis",
    ville: "New York",
    quartier_arrondissement: "Brooklyn / Williamsburg",
    code_postal: "11211",
    created_at: "2024-02-16T17:10:00Z"
  },
  {
    id: "na6-us-sfo",
    continent: "Amérique du Nord",
    pays: "États-Unis",
    ville: "San Francisco",
    quartier_arrondissement: "Mission District",
    code_postal: "94110",
    created_at: "2024-02-17T18:25:00Z"
  },

  // Amérique du Sud
  {
    id: "sa1-br-sao",
    continent: "Amérique du Sud",
    pays: "Brésil",
    ville: "São Paulo",
    quartier_arrondissement: "Jardins",
    code_postal: "01410-000",
    created_at: "2024-02-18T12:00:00Z"
  },
  {
    id: "sa2-br-rio",
    continent: "Amérique du Sud",
    pays: "Brésil",
    ville: "Rio de Janeiro",
    quartier_arrondissement: "Copacabana",
    code_postal: "22070-001",
    created_at: "2024-02-19T13:40:00Z"
  },
  {
    id: "sa3-ar-bue",
    continent: "Amérique du Sud",
    pays: "Argentine",
    ville: "Buenos Aires",
    quartier_arrondissement: "Palermo",
    code_postal: "C1425",
    created_at: "2024-02-20T14:50:00Z"
  },

  // Asie
  {
    id: "as1-jp-tyo-1",
    continent: "Asie",
    pays: "Japon",
    ville: "Tokyo",
    quartier_arrondissement: "Shibuya",
    code_postal: "150-0002",
    created_at: "2024-02-21T07:10:00Z"
  },
  {
    id: "as2-jp-tyo-2",
    continent: "Asie",
    pays: "Japon",
    ville: "Tokyo",
    quartier_arrondissement: "Shinjuku",
    code_postal: "160-0022",
    created_at: "2024-02-22T08:30:00Z"
  },
  {
    id: "as3-sg-sin",
    continent: "Asie",
    pays: "Singapour",
    ville: "Singapour",
    quartier_arrondissement: "Marina Bay",
    code_postal: "018956",
    created_at: "2024-02-23T11:15:00Z"
  },
  {
    id: "as4-ae-dxb",
    continent: "Asie",
    pays: "Émirats Arabes Unis",
    ville: "Dubaï",
    quartier_arrondissement: "Downtown Dubai",
    code_postal: "PO 11111",
    created_at: "2024-02-24T16:00:00Z"
  },

  // Océanie
  {
    id: "oc1-au-syd",
    continent: "Océanie",
    pays: "Australie",
    ville: "Sydney",
    quartier_arrondissement: "The Rocks",
    code_postal: "2000",
    created_at: "2024-02-25T05:20:00Z"
  },
  {
    id: "oc2-au-mel",
    continent: "Océanie",
    pays: "Australie",
    ville: "Melbourne",
    quartier_arrondissement: "Carlton",
    code_postal: "3053",
    created_at: "2024-02-26T06:40:00Z"
  }
];
