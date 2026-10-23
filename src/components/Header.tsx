'use client';

import React from 'react';
import { Globe2, Plus, Database, Laptop, RefreshCw } from 'lucide-react';

interface HeaderProps {
  isCloud: boolean;
  onOpenCreateModal: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isCloud,
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
            {/* Status Badge */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                isCloud
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
              }`}
              title={
                isCloud
                  ? 'Connecté à la base Supabase PostgreSQL'
                  : 'Mode local actif avec cache persistant (configurez .env.local pour Supabase)'
              }
            >
              {isCloud ? (
                <>
                  <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Supabase Connecté</span>
                </>
              ) : (
                <>
                  <Laptop className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Mode Local Persistant</span>
                </>
              )}
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
