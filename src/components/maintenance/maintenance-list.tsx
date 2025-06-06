"use client"

import type { Maintenance } from "@/interfaces/maintenance"

interface Props {
  maintenance: Maintenance[]
  loading: boolean
}

export function MaintenanceList({ maintenance, loading }: Props) {
  if (loading) {
    return <p className="text-muted-foreground">Cargando mantenimientos...</p>
  }

  if (maintenance.length === 0) {
    return <p className="text-muted-foreground">No hay mantenimientos registrados.</p>
  }

  return (
    <ul className="space-y-4">
      {maintenance.map((item) => (
        <li key={item.id} className="p-4 border rounded-md bg-white dark:bg-slate-900 shadow-sm space-y-1">
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
                <p><strong>👤 Usuario dueño del equipo:</strong> {item.equipment.user.name} ({item.equipment.user.email})</p>
              )}
            </>
          )}

          {item.technician && (
            <p><strong>🧰 Técnico:</strong> {item.technician.name} ({item.technician.email})</p>
          )}
        </li>
      ))}
    </ul>
  )
}
