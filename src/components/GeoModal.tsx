'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { GeoLocation, GeoLocationInput } from '@/types/geo';

interface GeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: GeoLocationInput) => Promise<void>;
  initialData?: GeoLocation | null;
  existingContinents: string[];
}

const COMMON_CONTINENTS = [
  'Europe',
  'Afrique',
  'Amérique du Nord',
  'Amérique du Sud',
  'Asie',
  'Océanie',
];

export const GeoModal: React.FC<GeoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  existingContinents,
}) => {
  const [formData, setFormData] = useState<GeoLocationInput>({
    continent: '',
    pays: '',
    langue_officielle: '',
    ville: '',
    quartier_arrondissement: '',
    code_postal: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        continent: initialData.continent,
        pays: initialData.pays,
        langue_officielle: initialData.langue_officielle || '',
        ville: initialData.ville,
        quartier_arrondissement: initialData.quartier_arrondissement,
        code_postal: initialData.code_postal,
      });
    } else {
      setFormData({
        continent: '',
        pays: '',
        langue_officielle: '',
        ville: '',
        quartier_arrondissement: '',
        code_postal: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.continent.trim()) errs.continent = 'Le continent est requis';
    if (!formData.pays.trim()) errs.pays = 'Le pays est requis';
    if (!formData.ville.trim()) errs.ville = 'La ville est requise';
    if (!formData.quartier_arrondissement.trim()) {
      errs.quartier_arrondissement = 'Le quartier ou arrondissement est requis';
    }
    if (!formData.code_postal.trim()) {
      errs.code_postal = 'Le code postal est requis';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const continentOptions = Array.from(
    new Set([...COMMON_CONTINENTS, ...existingContinents])
  ).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {initialData ? 'Modifier la localisation' : 'Ajouter une localisation (Quartier & Code Postal)'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Continent &gt; Pays &gt; Ville &gt; Quartier / Arrondissement &gt; Code Postal
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Continent */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Continent <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              list="continents-list"
              value={formData.continent}
              onChange={(e) => setFormData({ ...formData, continent: e.target.value })}
              placeholder="Ex: Europe, Afrique, Amérique du Nord, Asie..."
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.continent
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            <datalist id="continents-list">
              {continentOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.continent && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.continent}</span>
              </p>
            )}
          </div>

          {/* Pays */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Pays <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.pays}
              onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
              placeholder="Ex: France, Cameroun, Canada, Japon, Maroc..."
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.pays
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            {errors.pays && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.pays}</span>
              </p>
            )}
          </div>

          {/* Liste langue officiel */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Liste langue officiel
            </label>
            <input
              type="text"
              value={formData.langue_officielle || ''}
              onChange={(e) => setFormData({ ...formData, langue_officielle: e.target.value })}
              placeholder="Ex: Français, Anglais, Arabe, Espagnol..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Ville */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Ville <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.ville}
              onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
              placeholder="Ex: Paris, Douala, Montréal, Tokyo, Casablanca..."
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.ville
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            {errors.ville && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.ville}</span>
              </p>
            )}
          </div>

          {/* Quartier / Arrondissement */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Quartier / Arrondissement <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.quartier_arrondissement}
              onChange={(e) => setFormData({ ...formData, quartier_arrondissement: e.target.value })}
              placeholder="Ex: 8e Arrondissement - Élysée, Akwa, Plateau-Mont-Royal..."
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.quartier_arrondissement
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            {errors.quartier_arrondissement && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.quartier_arrondissement}</span>
              </p>
            )}
          </div>

          {/* Code Postal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Code Postal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.code_postal}
              onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
              placeholder="Ex: 75008, BP 1024, H2W 1V8, 10012, 10200..."
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-lg border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.code_postal
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            {errors.code_postal && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.code_postal}</span>
              </p>
            )}
          </div>

          {/* Buttons Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
