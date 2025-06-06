import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

interface Technician {
  id: string;
  name: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

export function useTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      const token = getToken();
      if (!token) {
        setError("No autenticado");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data: Technician[] = await res.json();

        // Filtramos solo los usuarios que tienen el rol "technical"
        const filtered = data.filter((user) => user.roles.includes("technical"));

        setTechnicians(filtered);
      } catch (err: any) {
        console.error("Error al cargar técnicos:", err);
        setError("Error al cargar técnicos");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  return { technicians, loading, error };
}
