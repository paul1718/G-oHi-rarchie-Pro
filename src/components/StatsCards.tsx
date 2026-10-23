'use client';

import React from 'react';
import { Globe, MapPin, Building2, Map } from 'lucide-react';
import { GeoStats } from '@/types/geo';

interface StatsCardsProps {
  stats: GeoStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Localisations répertoriées',
      value: stats.total,
      icon: MapPin,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      label: 'Continents couverts',
      value: stats.continentsCount,
      icon: Globe,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      label: 'Pays représentés',
      value: stats.countriesCount,
      icon: Map,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    },
    {
      label: 'Villes & Métropoles',
      value: stats.citiesCount,
      icon: Building2,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                  {card.label}
                </p>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {card.value.toLocaleString('fr-FR')}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${card.bgColor} ${card.textColor}`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
