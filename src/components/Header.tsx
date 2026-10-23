'use client';

import React from 'react';
import { Globe2, Plus, ShieldCheck, RefreshCw, Download } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  onRefresh,
  isLoading,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-brand-600 to-blue-400 rounded-xl text-white shadow-md shadow-brand-500/20">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  GéoHiérarchie Pro
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  Continent &gt; Pays &gt; Ville &gt; Quartier &gt; CP
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explorateur et gestionnaire de hiérarchies géographiques structurées
              </p>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Direct Excel Download Link */}
            <a
              href="/donnees-geographiques.xlsx"
              download="GéoHiérarchie-Mondiale-Exhaustive.xlsx"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 transition-colors shadow-sm"
              title="Télécharger le classeur Excel exhaustif complet (Toutes les feuilles par continent, 1.83M+ localisations)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Excel Mondial (.xlsx)</span>
            </a>

            {/* Direct CSV ZIP Download Link */}
            <a
              href="/donnees-geographiques.csv.zip"
              download="GéoHiérarchie-Mondiale-Exhaustive.csv.zip"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 transition-colors shadow-sm"
              title="Télécharger l'intégralité du catalogue mondial (CSV brut zippé, 1.83M+ enregistrements)"
            >
              <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>CSV Mondial (Zip)</span>
            </a>

            {/* Storage Status Badge */}
            <div
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
              title="Base de données locale autonome active (persistance automatique)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Base Locale Autonome</span>
            </div>

            {/* Refresh button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Rafraîchir les données"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {isDark ? '☀️ Clair' : '🌙 Sombre'}
            </button>

            {/* Add Button */}
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-semibold rounded-lg shadow-sm shadow-brand-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle localisation</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
