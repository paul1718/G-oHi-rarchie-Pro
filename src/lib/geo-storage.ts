import { GeoLocation, GeoLocationInput } from '@/types/geo';
import { INITIAL_GEO_DATA } from './seed-data';

const STORAGE_KEY = 'geo_hierarchy_data_v3';

const getLocalLocations = (): GeoLocation[] => {
  if (typeof window === 'undefined') return INITIAL_GEO_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GEO_DATA));
      return INITIAL_GEO_DATA;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].code_postal) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GEO_DATA));
      return INITIAL_GEO_DATA;
    }
    return parsed;
  } catch (e) {
    console.error('Erreur lecture localStorage:', e);
    return INITIAL_GEO_DATA;
  }
};

const saveLocalLocations = (items: GeoLocation[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Erreur sauvegarde localStorage:', e);
  }
};

export const geoService = {
  isReady(): boolean {
    return true;
  },

  async getAll(): Promise<GeoLocation[]> {
    return getLocalLocations();
  },

  async create(input: GeoLocationInput): Promise<GeoLocation> {
    const newEntry: GeoLocation = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `geo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      continent: input.continent.trim(),
      pays: input.pays.trim(),
      ville: input.ville.trim(),
      quartier_arrondissement: input.quartier_arrondissement.trim(),
      code_postal: input.code_postal.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const current = getLocalLocations();
    const updated = [newEntry, ...current];
    saveLocalLocations(updated);
    return newEntry;
  },

  async update(id: string, input: GeoLocationInput): Promise<GeoLocation> {
    const current = getLocalLocations();
    const target = current.find((item) => item.id === id);
    const updatedItem: GeoLocation = {
      id,
      continent: input.continent.trim(),
      pays: input.pays.trim(),
      ville: input.ville.trim(),
      quartier_arrondissement: input.quartier_arrondissement.trim(),
      code_postal: input.code_postal.trim(),
      created_at: target?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const next = current.map((item) => (item.id === id ? updatedItem : item));
    saveLocalLocations(next);
    return updatedItem;
  },

  async delete(id: string): Promise<boolean> {
    const current = getLocalLocations();
    const next = current.filter((item) => item.id !== id);
    saveLocalLocations(next);
    return true;
  },

  resetDefaults(): GeoLocation[] {
    saveLocalLocations(INITIAL_GEO_DATA);
    return INITIAL_GEO_DATA;
  },
};
