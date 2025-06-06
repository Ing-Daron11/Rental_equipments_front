import './globals.css';
import { ReactNode } from 'react';
// import { AuthProvider } from '@/lib/auth';
import Navbar from '@/components/shared/navbar';

export const metadata = {
  title: 'AppNest | Gestión de Equipos',
  description: 'Sistema de gestión de equipos, reservas y mantenimiento',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        {/* <AuthProvider> */}
          <main className="p-6 max-w-7xl mx-auto">{children}</main>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
};
