"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const openRoutes = ["/login", "/equipment"];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Esperar a que termine de verificar
    if (!loading && !isAuthenticated && !openRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, pathname, router]);

  // Mientras se verifica
  if (loading) {
    return <p className="text-center p-4">Cargando autenticación...</p>;
  }

  // Si no está autenticado en una ruta protegida, no renderiza
  if (!isAuthenticated && !openRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
