export interface GeoLocation {
  id: string;
  continent: string;
  pays: string;
  langue_officielle?: string;
  monnaie_devise?: string;
  ville: string;
  quartier_arrondissement: string;
  code_postal: string;
  population?: string;
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
  | 'langue_officielle'
  | 'monnaie_devise'
  | 'ville'
  | 'quartier_arrondissement'
  | 'code_postal'
  | 'population'
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
