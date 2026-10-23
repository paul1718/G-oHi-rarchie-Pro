import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Explorateur Hiérarchie Géographique | Next.js & Supabase',
  description: 'Application de gestion et exploration géographique : Continent > Pays > Ville > Quartier / Arrondissement > Code Postal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full font-sans antialiased text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
