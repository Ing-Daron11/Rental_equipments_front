"use client"

import { useState } from "react"
import type { Maintenance } from "@/interfaces/maintenance"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface Props {
  maintenance: Maintenance[]
  loading: boolean
  onEdit: (maintenance: Maintenance) => void
  onDelete: (id: string) => void
}

export function MaintenanceList({ maintenance, loading, onEdit, onDelete }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (loading) {
    return <p className="text-muted-foreground">Cargando mantenimientos...</p>
  }

  if (maintenance.length === 0) {
    return <p className="text-muted-foreground">No hay mantenimientos registrados.</p>
  }

  const handleDeleteClick = (id: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este mantenimiento?")
    if (confirmed) {
      setDeletingId(id)
      onDelete(id)
    }
  }

  return (
    <ul className="space-y-4">
      {maintenance.map((item) => (
        <li
          key={item.id}
          className="p-4 border rounded-md bg-white dark:bg-slate-900 shadow-sm space-y-2"
        >
          <div className="space-y-1">
            <p><strong>🆔 ID:</strong> {item.id}</p>
            <p><strong>📝 Descripción:</strong> {item.description}</p>
            {item.performedAt && (
              <p><strong>📅 Fecha:</strong> {new Date(item.performedAt).toLocaleString()}</p>
            )}
            {item.equipment && (
              <>
                <p><strong>💻 Equipo:</strong> {item.equipment.name} ({item.equipment.model})</p>
                {item.equipment.category && (
                  <p><strong>📂 Categoría:</strong> {item.equipment.category}</p>
                )}
                {item.equipment.status && (
                  <p><strong>⚙️ Estado:</strong> {item.equipment.status}</p>
                )}
                {item.equipment.user && (
                  <p>
                    <strong>👤 Usuario dueño del equipo:</strong>{" "}
                    {item.equipment.user.name} ({item.equipment.user.email})
                  </p>
                )}
              </>
            )}
            {item.technician && (
              <p>
                <strong>🧰 Técnico:</strong> {item.technician.name} ({item.technician.email})
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
            >
              <Pencil className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClick(item.id)}
              disabled={deletingId === item.id}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {deletingId === item.id ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
