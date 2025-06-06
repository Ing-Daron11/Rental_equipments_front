"use client";

import { useState } from "react";
import { useMaintenance } from "@/hooks/use-maintenance";
import { useRouter } from "next/navigation";

export default function MaintenanceCreate() {
  const router = useRouter();
  const { createMaintenance, loading } = useMaintenance();

  const [equipmentId, setEquipmentId] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación frontend básica
    if (!equipmentId || !technicianId || !description) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    try {
      setFormError(null);
      console.log("Enviando:", { equipmentId, technicianId, description });

      await createMaintenance({ equipmentId, technicianId, description });
      router.push("/maintenance");
    } catch (err: any) {
      // Captura y muestra errores del backend si están disponibles
      const backendError =
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err?.response?.data?.message || err?.message || "Error inesperado";

      setFormError(backendError);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Mantenimiento</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">ID del Equipo</label>
          <input
            type="text"
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="UUID del equipo"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">ID del Técnico</label>
          <input
            type="text"
            value={technicianId}
            onChange={(e) => setTechnicianId(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="UUID del técnico"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Descripción del mantenimiento"
            rows={4}
            required
          />
        </div>

        {formError && (
          <p className="text-red-600 text-sm whitespace-pre-line">{formError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear Mantenimiento"}
        </button>
      </form>
    </div>
  );
}
