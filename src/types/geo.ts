export interface GeoLocation {
  id: string;
  continent: string;
  pays: string;
  ville: string;
  quartier_arrondissement: string;
  modele_code_postal: string;       // Modèle ou plage (ex: "75001 à 75020 (750XX)", "Format H2X XXX", "BP 1000 - 1099")
  format_regle: string;             // Règle / structure (ex: "5 chiffres : 750 + n° arrondissement", "Alphanumérique ANA NAN")
  exemples_types: string;           // Exemples représentatifs (ex: "75001, 75008, 75018")
  created_at?: string;
  updated_at?: string;
}

export type GeoLocationInput = Omit<GeoLocation, 'id' | 'created_at' | 'updated_at'>;

export interface GeoFilters {
  search: string;
  continent: string;
  pays: string;
  ville: string;
}

export type SortField =
  | 'continent'
  | 'pays'
  | 'ville'
  | 'quartier_arrondissement'
  | 'modele_code_postal'
  | 'format_regle'
  | 'created_at';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface GeoStats {
  total: number;
  continentsCount: number;
  countriesCount: number;
  citiesCount: number;
}
