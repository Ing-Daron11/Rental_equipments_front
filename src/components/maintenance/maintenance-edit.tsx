"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useMaintenance } from "@/hooks/use-maintenance"
import { useEquipment } from "@/hooks/use-equipment"
import { useTechnicians } from "@/hooks/use-technicians"
import type { Maintenance } from "@/interfaces/maintenance"

export default function MaintenanceEditPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const router = useRouter()

  const { getMaintenanceById, updateMaintenance, loading } = useMaintenance()
  const { equipment } = useEquipment()
  const { technicians } = useTechnicians()

  const [equipmentId, setEquipmentId] = useState("")
  const [technicianId, setTechnicianId] = useState("")
  const [description, setDescription] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      getMaintenanceById(id)
        .then((data: Maintenance) => {
          setEquipmentId(data.equipment?.id || "")
          setTechnicianId(data.technician?.id || "")
          setDescription(data.description || "")
        })
        .catch(() => {
          setFormError("Error al cargar el mantenimiento.")
        })
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!equipmentId || !technicianId || !description.trim()) {
      setFormError("Todos los campos son obligatorios.")
      return
    }

    try {
      setFormError(null)
      await updateMaintenance(id, {
        equipmentId,
        technicianId,
        description: description.trim(),
      })
      router.push("/maintenance")
    } catch (err: any) {
      const backendError =
        Array.isArray(err?.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err?.response?.data?.message || err?.message || "Error inesperado"
      setFormError(backendError)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Editar Mantenimiento</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Equipo</label>
          <select
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione un equipo</option>
            {equipment.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Técnico</label>
          <select
            value={technicianId}
            onChange={(e) => setTechnicianId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione un técnico</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="descripcion-mantenimiento">Descripción</label>
          <textarea
            id="descripcion-mantenimiento"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
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
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  )
}
