"use client"

import { useState } from "react"
import { useToast } from "./use-toast"
import { maintenanceAPI } from "@/lib/api/maintenance"
import type {
  Maintenance,
  SearchMaintenanceDto,
  CreateMaintenanceDto,
} from "@/interfaces/maintenance"

export function useMaintenance() {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const searchMaintenance = async (filters: SearchMaintenanceDto = {}) => {
    setLoading(true)
    setError(null)
    try {
      const data = await maintenanceAPI.search(filters)
      setMaintenance(Array.isArray(data) ? data : [])
    } catch (err: any) {
      const errorMessage =
        Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err.response?.data?.message || err.message || "Error al buscar mantenimientos"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createMaintenance = async (data: CreateMaintenanceDto) => {
    setLoading(true)
    setError(null)
    try {
      const newMaintenance = await maintenanceAPI.create(data)
      setMaintenance((prev) => [...prev, newMaintenance])
      toast({
        title: "Éxito",
        description: "Mantenimiento creado correctamente",
      })
      return newMaintenance
    } catch (err: any) {
      const errorMessage =
        Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err.response?.data?.message || err.message || "Error al crear mantenimiento"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    searchMaintenance({})
  }

  return {
    maintenance,
    loading,
    error,
    searchMaintenance,
    createMaintenance,
    refetch,
  }
}
