'use client';

import React from 'react';
import { FileJson, FileSpreadsheet, RotateCcw } from 'lucide-react';
import { GeoLocation } from '@/types/geo';

interface ExportButtonsProps {
  data: GeoLocation[];
  onResetDefaults: () => void;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ data, onResetDefaults }) => {
  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = [
      'Continent',
      'Pays',
      'Liste langue officiel',
      'Monnaie / Devise',
      'Ville',
      'Quartier / Arrondissement',
      'Code Postal',
      'Population',
      'ID',
      'Date Création'
    ];

    const rows = data.map((item) => [
      `"${item.continent.replace(/"/g, '""')}"`,
      `"${item.pays.replace(/"/g, '""')}"`,
      `"${(item.langue_officielle || '').replace(/"/g, '""')}"`,
      `"${(item.monnaie_devise || '').replace(/"/g, '""')}"`,
      `"${item.ville.replace(/"/g, '""')}"`,
      `"${item.quartier_arrondissement.replace(/"/g, '""')}"`,
      `"${item.code_postal.replace(/"/g, '""')}"`,
      `"${(item.population || '').replace(/"/g, '""')}"`,
      `"${item.id}"`,
      `"${item.created_at || ''}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `geohierarchie_mondiale_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    if (data.length === 0) return;

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `geohierarchie_mondiale_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={exportToCSV}
          disabled={data.length === 0}
          className="inline-flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors disabled:opacity-50"
          title="Exporter la vue actuelle au format CSV (Excel)"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Exporter CSV</span>
        </button>

        <button
          onClick={exportToJSON}
          disabled={data.length === 0}
          className="inline-flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors disabled:opacity-50"
          title="Exporter la vue actuelle au format JSON"
        >
          <FileJson className="w-4 h-4 text-brand-600" />
          <span>Exporter JSON</span>
        </button>
      </div>

      <button
        onClick={onResetDefaults}
        className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        title="Recharger le catalogue complet des localisations mondiales"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Restaurer les données mondiales</span>
      </button>
    </div>
  );
};
