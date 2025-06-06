"use client"

import { Button } from "@/components/ui/button"

interface Props {
  filters: any
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

export function MaintenanceFiltersComponent({ filters, onFiltersChange, onClearFilters }: Props) {
  return (
    <div className="space-y-2">
      <p>Filtros de mantenimiento (a implementar)</p>
      <Button variant="outline" size="sm" onClick={onClearFilters}>
        Limpiar filtros
      </Button>
    </div>
  )
}
