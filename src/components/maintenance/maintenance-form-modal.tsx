"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { maintenanceAPI } from "@/lib/api/maintenance"
import type { Maintenance } from "@/interfaces/maintenance"
import { useTechnicians } from "@/hooks/use-technicians"

interface CreateMaintenanceDto {
  equipmentId: string
  technicianId: string
  description: string
}

interface UpdateMaintenanceDto {
  technicianId: string
  description: string
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Maintenance
}

export function MaintenanceFormModal({ open, onOpenChange, initialData }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [technicianId, setTechnicianId] = useState("")
  const [equipmentName, setEquipmentName] = useState("")
  const [equipmentId, setEquipmentId] = useState("")

  const { technicians } = useTechnicians()

  useEffect(() => {
    if (open && initialData) {
      setDescription(initialData.description || "")
      setTechnicianId(initialData.technician?.id || initialData.technicianId || "")
      setEquipmentName(`${initialData.equipment?.name} (${initialData.equipment?.model})`)
      setEquipmentId(initialData.equipment?.id || initialData.equipmentId || "")
    }
  }, [initialData, open])

  const handleSubmit = async () => {
    if (!description || !technicianId || (!initialData?.id && !equipmentId)) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    try {
      if (initialData?.id) {
        const payload: UpdateMaintenanceDto = {
          description,
          technicianId,
        }

        await maintenanceAPI.update(initialData.id, payload)

        toast({
          title: "Mantenimiento actualizado",
          description: "Los cambios se han guardado correctamente.",
        })

        router.refresh() // <- recarga la página al editar
      } else {
        const payload: CreateMaintenanceDto = {
          description,
          technicianId,
          equipmentId,
        }

        await maintenanceAPI.create(payload)
        toast({
          title: "Mantenimiento creado",
          description: "El mantenimiento se ha registrado exitosamente.",
        })
      }

      onOpenChange(false)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar el mantenimiento.",
        variant: "destructive",
      })
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Editar Mantenimiento" : "Nuevo Mantenimiento"}
        </h2>

        <div className="space-y-4">
          <Textarea
            placeholder="Descripción del mantenimiento"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">Equipo</label>
            <input
              type="text"
              value={equipmentName}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>

          <select
            className="w-full p-2 border rounded-md"
            value={technicianId}
            onChange={(e) => setTechnicianId(e.target.value)}
          >
            <option value="">Seleccionar técnico</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name} ({tech.email})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Guardar cambios" : "Crear"}
          </Button>
        </div>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-4 text-xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  )
}
