import { useEffect, useState } from "react";
import api from "@/lib/api";

type DashboardData = {
  equiposDisponibles: number;
  equiposRentadosPorUsuario: number;
  totalEquipos: number;
  equiposEnMantenimiento: number;
  role: string | null;
  roles: string[];
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Trae todos los equipos
        const equiposRes = await api.get("/equipment");
        // Trae los equipos rentados por el usuario
        const misEquiposRes = await api.get("/equipment/rented");
        // Trae los equipos en mantenimiento
        const mantenimientoRes = await api.get("/maintenance");
        // Trae el usuario actual para obtener el rol
        const userRes = await api.get("/users/me");

        setData({
            equiposDisponibles: equiposRes.data.filter((e: any) => e.status === "available").length,
            totalEquipos: equiposRes.data.length,
            equiposRentadosPorUsuario: misEquiposRes.data.length,
            equiposEnMantenimiento: mantenimientoRes.data.length,
            // Cambia aquí: toma el primer rol o el array completo
            role: Array.isArray(userRes.data.roles) ? userRes.data.roles[0] : null,
            roles: userRes.data.roles || [],
        });
      } catch (e) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading };
}