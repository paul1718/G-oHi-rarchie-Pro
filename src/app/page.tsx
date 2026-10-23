'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
import { Filters } from '@/components/Filters';
import { GeoTable } from '@/components/GeoTable';
import { GeoModal } from '@/components/GeoModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { ExportButtons } from '@/components/ExportButtons';
import { geoService } from '@/lib/geo-storage';
import {
  GeoLocation,
  GeoLocationInput,
  GeoFilters,
  SortConfig,
  SortField,
  GeoStats,
} from '@/types/geo';

export default function HomePage() {
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Filters State
  const [filters, setFilters] = useState<GeoFilters>({
    search: '',
    continent: '',
    pays: '',
    ville: '',
  });

  // Sorting State
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'continent',
    direction: 'asc',
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modals State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<GeoLocation | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] = useState<GeoLocation | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Initial Load
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await geoService.getAll();
      setLocations(data);
    } catch (err) {
      console.error('Erreur de chargement:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Check system preference for dark mode
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, [loadData]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Extract available cascading filter values
  const availableContinents = useMemo(() => {
    return Array.from(new Set(locations.map((item) => item.continent))).sort();
  }, [locations]);

  const availableCountries = useMemo(() => {
    let pool = locations;
    if (filters.continent) {
      pool = pool.filter((item) => item.continent === filters.continent);
    }
    return Array.from(new Set(pool.map((item) => item.pays))).sort();
  }, [locations, filters.continent]);

  const availableCities = useMemo(() => {
    let pool = locations;
    if (filters.continent) {
      pool = pool.filter((item) => item.continent === filters.continent);
    }
    if (filters.pays) {
      pool = pool.filter((item) => item.pays === filters.pays);
    }
    return Array.from(new Set(pool.map((item) => item.ville))).sort();
  }, [locations, filters.continent, filters.pays]);

  // Filtered & Sorted Locations
  const filteredAndSortedLocations = useMemo(() => {
    const searchNormalized = filters.search.trim().toLowerCase();

    const filtered = locations.filter((item) => {
      // Global text search across all fields including models and rules
      if (searchNormalized) {
        const fullString = `${item.continent} ${item.pays} ${item.ville} ${item.quartier_arrondissement} ${item.modele_code_postal} ${item.format_regle} ${item.exemples_types || ''}`.toLowerCase();
        if (!fullString.includes(searchNormalized)) {
          return false;
        }
      }

      // Cascading continent filter
      if (filters.continent && item.continent !== filters.continent) {
        return false;
      }

      // Cascading pays filter
      if (filters.pays && item.pays !== filters.pays) {
        return false;
      }

      // Cascading ville filter
      if (filters.ville && item.ville !== filters.ville) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      const field = sortConfig.field;
      let valA = (a[field] || '').toString();
      let valB = (b[field] || '').toString();

      let cmp = valA.localeCompare(valB, 'fr', { sensitivity: 'base', numeric: true });
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });

    return filtered;
  }, [locations, filters, sortConfig]);

  // Statistics
  const stats: GeoStats = useMemo(() => {
    return {
      total: locations.length,
      continentsCount: new Set(locations.map((i) => i.continent)).size,
      countriesCount: new Set(locations.map((i) => i.pays)).size,
      citiesCount: new Set(locations.map((i) => i.ville)).size,
    };
  }, [locations]);

  // Handlers
  const handleSort = (field: SortField) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { field, direction: 'asc' };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      continent: '',
      pays: '',
      ville: '',
    });
    setCurrentPage(1);
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GeoLocation) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (item: GeoLocation) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitModal = async (input: GeoLocationInput) => {
    if (editingItem) {
      await geoService.update(editingItem.id, input);
      showToast(`Modèle "${input.quartier_arrondissement} (${input.ville})" mis à jour avec succès.`);
    } else {
      await geoService.create(input);
      showToast(`Nouveau modèle "${input.quartier_arrondissement} (${input.ville})" créé avec succès.`);
    }
    await loadData();
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      setIsDeleting(true);
      await geoService.delete(deletingItem.id);
      showToast(`Modèle "${deletingItem.quartier_arrondissement}" supprimé.`);
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      await loadData();
    } catch (err) {
      console.error('Erreur suppression:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetDefaults = () => {
    const def = geoService.resetDefaults();
    setLocations(def);
    handleResetFilters();
    showToast('Modèles types de codes postaux réinitialisés.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        onRefresh={loadData}
        isLoading={isLoading}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Stats Cards */}
        <StatsCards stats={stats} />

        {/* Filters and Cascading Selectors */}
        <Filters
          filters={filters}
          onChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          availableContinents={availableContinents}
          availableCountries={availableCountries}
          availableCities={availableCities}
          onReset={handleResetFilters}
          filteredCount={filteredAndSortedLocations.length}
          totalCount={locations.length}
        />

        {/* Data Table */}
        <GeoTable
          data={filteredAndSortedLocations}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />

        {/* Export & Utility Controls */}
        <ExportButtons
          data={filteredAndSortedLocations}
          onResetDefaults={handleResetDefaults}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50">
        <p>
          Architecture : <strong>Continent &gt; Pays &gt; Ville &gt; Quartier / Arrondissement &gt; Modèle / Type de Code Postal</strong>
        </p>
        <p className="mt-1 text-slate-400 dark:text-slate-500">
          Next.js (App Router) • Modèles & Structures Postales par Quartier • TailwindCSS • Lucide React
        </p>
      </footer>

      {/* Create / Edit Modal */}
      <GeoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitModal}
        initialData={editingItem}
        existingContinents={availableContinents}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        item={deletingItem}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
