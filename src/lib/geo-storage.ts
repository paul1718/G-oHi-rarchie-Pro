import { GeoLocation, GeoLocationInput } from '@/types/geo';
import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_GEO_DATA } from './seed-data';

const STORAGE_KEY = 'geo_hierarchy_data_v1';

const getLocalLocations = (): GeoLocation[] => {
  if (typeof window === 'undefined') return INITIAL_GEO_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GEO_DATA));
      return INITIAL_GEO_DATA;
    }
    return JSON.parse(raw);
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
  isCloudConnected(): boolean {
    return isSupabaseConfigured() && supabase !== null;
  },

  async getAll(): Promise<GeoLocation[]> {
    if (this.isCloudConnected() && supabase) {
      try {
        const { data, error } = await supabase
          .from('geolocations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase requête échouée, basculement mode local:', error.message);
          return getLocalLocations();
        }

        if (data && data.length > 0) {
          return data as GeoLocation[];
        }

        // Si la table distante est vide, proposer le jeu de données initial
        return getLocalLocations();
      } catch (err) {
        console.warn('Erreur de connexion Supabase:', err);
        return getLocalLocations();
      }
    }
    return getLocalLocations();
  },

  async create(input: GeoLocationInput): Promise<GeoLocation> {
    const newEntry: GeoLocation = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...input,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (this.isCloudConnected() && supabase) {
      try {
        const { data, error } = await supabase
          .from('geolocations')
          .insert([
            {
              continent: input.continent.trim(),
              pays: input.pays.trim(),
              ville: input.ville.trim(),
              quartier_arrondissement: input.quartier_arrondissement.trim(),
              code_postal: input.code_postal.trim(),
            },
          ])
          .select()
          .single();

        if (!error && data) {
          // Synchroniser aussi le cache local
          const local = getLocalLocations();
          saveLocalLocations([data as GeoLocation, ...local]);
          return data as GeoLocation;
        }
      } catch (err) {
        console.warn('Supabase insert échoué, enregistrement local:', err);
      }
    }

    const current = getLocalLocations();
    const updated = [newEntry, ...current];
    saveLocalLocations(updated);
    return newEntry;
  },

  async update(id: string, input: GeoLocationInput): Promise<GeoLocation> {
    if (this.isCloudConnected() && supabase) {
      try {
        const { data, error } = await supabase
          .from('geolocations')
          .update({
            continent: input.continent.trim(),
            pays: input.pays.trim(),
            ville: input.ville.trim(),
            quartier_arrondissement: input.quartier_arrondissement.trim(),
            code_postal: input.code_postal.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          const current = getLocalLocations();
          const next = current.map((item) => (item.id === id ? (data as GeoLocation) : item));
          saveLocalLocations(next);
          return data as GeoLocation;
        }
      } catch (err) {
        console.warn('Supabase update échoué, mise à jour locale:', err);
      }
    }

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
    if (this.isCloudConnected() && supabase) {
      try {
        const { error } = await supabase.from('geolocations').delete().eq('id', id);
        if (error) {
          console.warn('Supabase delete échoué, suppression locale:', error.message);
        }
      } catch (err) {
        console.warn('Supabase delete exception:', err);
      }
    }

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
