'use client';

import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';
import { GeoFilters } from '@/types/geo';

interface FiltersProps {
  filters: GeoFilters;
  onChange: (newFilters: GeoFilters) => void;
  availableContinents: string[];
  availableCountries: string[];
  availableCities: string[];
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  availableContinents,
  availableCountries,
  availableCities,
  onReset,
  filteredCount,
  totalCount,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const continent = e.target.value;
    onChange({
      ...filters,
      continent,
      pays: '', // cascade reset child filters
      ville: '',
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pays = e.target.value;
    onChange({
      ...filters,
      pays,
      ville: '', // cascade reset child filter
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      ville: e.target.value,
    });
  };

  const hasActiveFilters = Boolean(
    filters.search || filters.continent || filters.pays || filters.ville
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Search Bar & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Rechercher par continent, pays, ville, quartier, code postal..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
          <span>
            Affichage : <strong className="text-slate-900 dark:text-white">{filteredCount}</strong> sur {totalCount} localisations
          </span>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-1 px-2.5 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md border border-red-200 dark:border-red-900/50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Réinitialiser filtres</span>
            </button>
          )}
        </div>
      </div>

      {/* Cascading Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Continent Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-brand-600" />
            <span>Continent</span>
          </label>
          <select
            value={filters.continent}
            onChange={handleContinentChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            <option value="">Tous les continents ({availableContinents.length})</option>
            {availableContinents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        {/* Pays Filter (Cascading) */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-purple-600" />
            <span>Pays {filters.continent ? `(${filters.continent})` : ''}</span>
          </label>
          <select
            value={filters.pays}
            onChange={handleCountryChange}
            disabled={availableCountries.length === 0}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {filters.continent ? `Tous les pays (${availableCountries.length})` : 'Sélectionner d’abord un continent ou tout afficher'}
            </option>
            {availableCountries.map((pays) => (
              <option key={pays} value={pays}>
                {pays}
              </option>
            ))}
          </select>
        </div>

        {/* Ville Filter (Cascading) */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-600" />
            <span>Ville {filters.pays ? `(${filters.pays})` : ''}</span>
          </label>
          <select
            value={filters.ville}
            onChange={handleCityChange}
            disabled={availableCities.length === 0}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {filters.pays ? `Toutes les villes (${availableCities.length})` : 'Sélectionner d’abord un pays ou tout afficher'}
            </option>
            {availableCities.map((ville) => (
              <option key={ville} value={ville}>
                {ville}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
