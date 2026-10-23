'use client';

import React from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';
import { GeoLocation, SortConfig, SortField } from '@/types/geo';

interface GeoTableProps {
  data: GeoLocation[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  onEdit: (item: GeoLocation) => void;
  onDelete: (item: GeoLocation) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const getContinentBadgeClass = (continent: string) => {
  switch (continent.toLowerCase()) {
    case 'europe':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800';
    case 'afrique':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800';
    case 'amérique du nord':
    case 'amerique du nord':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800';
    case 'amérique du sud':
    case 'amerique du sud':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800';
    case 'asie':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800';
    case 'océanie':
    case 'oceanie':
      return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  }
};

export const GeoTable: React.FC<GeoTableProps> = ({
  data,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              {/* Continent */}
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none" onClick={() => onSort('continent')}>
                <div className="flex items-center space-x-1.5">
                  <span>Continent</span>
                  {renderSortIcon('continent')}
                </div>
              </th>

              {/* Pays */}
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none" onClick={() => onSort('pays')}>
                <div className="flex items-center space-x-1.5">
                  <span>Pays</span>
                  {renderSortIcon('pays')}
                </div>
              </th>

              {/* Liste langue officiel */}
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none" onClick={() => onSort('langue_officielle')}>
                <div className="flex items-center space-x-1.5">
                  <span>Liste langue officiel</span>
                  {renderSortIcon('langue_officielle')}
                </div>
              </th>

              {/* Ville */}
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none" onClick={() => onSort('ville')}>
                <div className="flex items-center space-x-1.5">
                  <span>Ville</span>
                  {renderSortIcon('ville')}
                </div>
              </th>

              {/* Quartier / Arrondissement */}
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none" onClick={() => onSort('quartier_arrondissement')}>
                <div className="flex items-center space-x-1.5">
                  <span>Quartier / Arrondissement</span>
                  {renderSortIcon('quartier_arrondissement')}
                </div>
              </th>

              {/* Code Postal */}
              <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none" onClick={() => onSort('code_postal')}>
                <div className="flex items-center space-x-1.5">
                  <span>Code Postal</span>
                  {renderSortIcon('code_postal')}
                </div>
              </th>

              {/* Actions */}
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FolderOpen className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      Aucune localisation trouvée
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Essayez de modifier votre recherche ou ajoutez un quartier et son code postal.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Continent Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border ${getContinentBadgeClass(
                        item.continent
                      )}`}
                    >
                      {item.continent}
                    </span>
                  </td>

                  {/* Pays */}
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {item.pays}
                  </td>

                  {/* Liste langue officiel */}
                  <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {item.langue_officielle || 'Non spécifié'}
                    </span>
                  </td>

                  {/* Ville */}
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium whitespace-nowrap">
                    {item.ville}
                  </td>

                  {/* Quartier / Arrondissement */}
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {item.quartier_arrondissement}
                  </td>

                  {/* Code Postal */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700">
                      {item.code_postal}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center space-x-1.5">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-md transition-colors"
                        title="Modifier cette ligne"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
                        title="Supprimer cette ligne"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="py-3 px-4 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <span>Lignes par page :</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded border border-slate-200 dark:border-slate-700 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="hidden sm:inline">
            Affichage de {totalItems === 0 ? 0 : startIndex + 1} à {Math.min(startIndex + pageSize, totalItems)} sur {totalItems}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Page précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 font-medium text-slate-900 dark:text-white">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Page suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
