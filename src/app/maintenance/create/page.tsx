"use client";

import { useState } from "react";
import { useMaintenance } from "@/hooks/use-maintenance";
import { useEquipment } from "@/hooks/use-equipment";
import { useTechnicians } from "@/hooks/use-technicians";
import { useRouter } from "next/navigation";

export default function MaintenanceCreate() {
  const router = useRouter();
  const { createMaintenance, loading } = useMaintenance();
  const { equipment, loading: loadingEquipment } = useEquipment();
  const { technicians, loading: loadingTechnicians, error: techError } = useTechnicians();

  const [equipmentId, setEquipmentId] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!equipmentId || !technicianId || !description.trim()) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    try {
      setFormError(null);
      await createMaintenance({ equipmentId, technicianId, description });
      router.push("/maintenance");
    } catch (err: any) {
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
        {/* Selección de equipo */}
        <div>
          <label className="block mb-1 font-medium">Equipo</label>
          <select
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full border p-2 rounded"
            required
            disabled={loadingEquipment}
          >
            <option value="">Seleccione un equipo</option>
            {equipment.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de técnico */}
        <div>
          <label className="block mb-1 font-medium">Técnico</label>
          {techError ? (
            <p className="text-red-600">Error al cargar técnicos</p>
          ) : (
            <select
              value={technicianId}
              onChange={(e) => setTechnicianId(e.target.value)}
              className="w-full border p-2 rounded"
              required
              disabled={loadingTechnicians}
            >
              <option value="">Seleccione un técnico</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name} ({tech.email})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Campo descripción */}
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

        {/* Errores */}
        {formError && (
          <p className="text-red-600 text-sm whitespace-pre-line">{formError}</p>
        )}

        {/* Botón */}
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
