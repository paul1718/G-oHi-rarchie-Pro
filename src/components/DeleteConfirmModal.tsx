'use client';

import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { GeoLocation } from '@/types/geo';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  item: GeoLocation | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  item,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-full flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Supprimer ce modèle de localisation ?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Êtes-vous sûr de vouloir supprimer la définition de ce modèle de quartier ?
              </p>

              {/* Summary box */}
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Emplacement :</strong>{' '}
                  <span className="text-slate-900 dark:text-white font-medium">
                    {item.ville} ({item.pays})
                  </span>
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Quartier :</strong>{' '}
                  {item.quartier_arrondissement}
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Modèle CP :</strong>{' '}
                  {item.modele_code_postal}
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Règle :</strong>{' '}
                  {item.format_regle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Suppression...' : 'Confirmer la suppression'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
