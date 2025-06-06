"use client"

import { useState } from "react"
import { useToast } from "./use-toast"
import { maintenanceAPI } from "@/lib/api/maintenance"
import type {
  Maintenance,
  SearchMaintenanceDto,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from "@/interfaces/maintenance"

export function useMaintenance() {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const searchMaintenance = async (
    filters: SearchMaintenanceDto = {}
  ): Promise<void> => {
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

  const createMaintenance = async (
    data: CreateMaintenanceDto
  ): Promise<Maintenance> => {
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

  const getMaintenanceById = async (id: string): Promise<Maintenance> => {
    setLoading(true)
    setError(null)
    try {
      const maintenance = await maintenanceAPI.findOne(id)
      return maintenance
    } catch (err: any) {
      const errorMessage =
        Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err.response?.data?.message || err.message || "Error al obtener mantenimiento"
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

  const updateMaintenance = async (
    id: string,
    data: UpdateMaintenanceDto
  ): Promise<Maintenance> => {
    setLoading(true)
    setError(null)
    try {
      const updated = await maintenanceAPI.update(id, data)
      setMaintenance((prev) =>
        prev.map((m) => (m.id === id ? updated : m))
      )
      toast({
        title: "Éxito",
        description: "Mantenimiento actualizado correctamente",
      })
      return updated
    } catch (err: any) {
      const errorMessage =
        Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err.response?.data?.message || err.message || "Error al actualizar mantenimiento"
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

  const deleteMaintenance = async (id: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      await maintenanceAPI.remove(id)
      setMaintenance((prev) => prev.filter((m) => m.id !== id))
      toast({
        title: "Éxito",
        description: "Mantenimiento eliminado correctamente",
      })
    } catch (err: any) {
      const errorMessage =
        Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(" | ")
          : err.response?.data?.message || err.message || "Error al eliminar mantenimiento"
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

  const refetch = (): void => {
    searchMaintenance({})
  }

  return {
    maintenance,
    loading,
    error,
    searchMaintenance,
    createMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
    refetch,
  }
}
