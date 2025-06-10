"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/shared/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/use-reservations";
import { useState, useEffect } from "react";
import { Reservation } from "@/interfaces/reservation";
import { reservationsAPI } from "@/lib/api/reservations";

export default function ReservasPage() {
  const { isAuthenticated } = useAuth();
  const { reservations, loading, error } = useReservations();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reservation | null>(null);
  const [diasExtra, setDiasExtra] = useState(1);
  const [localReservations, setLocalReservations] = useState<Reservation[]>(reservations);
  const [diasExtraPorReserva, setDiasExtraPorReserva] = useState<{ [id: string]: number }>({});

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setLocalReservations(reservations);
  }, [reservations]);

  useEffect(() => {
    const stored = localStorage.getItem("diasExtraPorReserva");
    if (stored) {
      setDiasExtraPorReserva(JSON.parse(stored));
    }
  }, []);

  // Cada vez que cambie, guarda en localStorage
  useEffect(() => {
    localStorage.setItem("diasExtraPorReserva", JSON.stringify(diasExtraPorReserva));
  }, [diasExtraPorReserva]);

  
  const handleDelete = async (equipmentId: string) => {
    try {
      await reservationsAPI.release(equipmentId);
      setLocalReservations((prev) => prev.filter((r) => r.id !== equipmentId));
    } catch {
      alert("Error al liberar el equipo");
    }
  };

  const handleEdit = (reserva: Reservation) => {
    setSelectedReserva(reserva);
    setDiasExtra(1);
    setShowPopup(true);
  };

  const handleExtend = () => {
    if (!selectedReserva) return;
    setDiasExtraPorReserva(prev => ({
      ...prev,
      [selectedReserva.id]: (prev[selectedReserva.id] || 0) + diasExtra
    }));
    setShowPopup(false);
  };

  return (
    <ProtectedRoute>
      <>
        <Navbar isAuthenticated={isAuthenticated} />
        <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Tus Reservas</h1>

            {loading ? (
              <p>Cargando reservas...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : reservations.length === 0 ? (
              <p className="text-muted-foreground">No tienes reservas aún.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localReservations.map((res) => (
                  <Card key={res.id}>
                    <CardHeader>
                      <CardTitle>{res.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Categoría:</strong> {res.category}</p>
                      <p><strong>Estado:</strong> {res.status}</p>
                      <Badge variant="outline">Fecha: {new Date(res.createdAt).toLocaleDateString()}</Badge>
                      <Badge variant="outline">
                        Fecha devolución: {
                          new Date(
                            new Date(res.createdAt).getTime() +
                            (30 + (diasExtraPorReserva[res.id] || 0)) * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()
                        }
                      </Badge>
                      <div className="flex gap-2 mt-4">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                          onClick={() => handleEdit(res)}
                        >
                          Editar
                        </button>
                        <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => {
                          setDeleteId(res.id);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        Eliminar
                      </button>
                     </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(44, 52, 73, 0.09)", 
            backdropFilter: "blur(3px)",
          }}
        >
          <div className="bg-[#1a2236] p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-white">
              ¿Cuántos días desea ampliar la reserva?
            </h2>
            <input
              type="number"
              min={1}
              max={15}
              value={diasExtra}
              onChange={e => setDiasExtra(Math.max(1, Math.min(15, Number(e.target.value))))}
              className="border px-2 py-1 rounded w-20 text-white bg-[#222b44]"
            />
            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={handleExtend}
              >
                Confirmar
              </button>
              <button
                className="px-3 py-1 bg-gray-400 text-black rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(26, 34, 54, 0.09)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div className="bg-[#1a2236] p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-white">
              ¿Estás seguro de que deseas eliminar esta reserva?
            </h2>
            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={async () => {
                  if (deleteId) await handleDelete(deleteId);
                  setShowDeleteConfirm(false);
                  setDeleteId(null);
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="px-3 py-1 bg-gray-400 text-black rounded"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteId(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
