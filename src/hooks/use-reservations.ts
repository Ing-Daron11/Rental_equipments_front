import { useEffect, useState } from "react";
import { reservationsAPI } from "@/lib/api/reservations";
import type { Reservation } from "@/interfaces/reservation";

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    reservationsAPI.findAll()
      .then(setReservations)
      .catch(() => setError("Error al cargar reservas"))
      .finally(() => setLoading(false));
  }, []);

  return { reservations, loading, error };
}