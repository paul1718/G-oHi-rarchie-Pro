export interface GeoLocation {
  id: string;
  continent: string;
  pays: string;
  langue_officielle?: string;
  ville: string;
  quartier_arrondissement: string;
  code_postal: string;
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
  | 'ville'
  | 'quartier_arrondissement'
  | 'code_postal'
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
