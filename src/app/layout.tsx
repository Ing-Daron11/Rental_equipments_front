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
    <html lang="es" className="dark">
    <body className="bg-[#020617] text-white">

        {/* <AuthProvider> */}
          <main className="p-6 max-w-7xl mx-auto">{children}</main>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
};
