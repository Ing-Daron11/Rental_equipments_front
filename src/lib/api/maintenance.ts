// lib/api/maintenance.ts

import { api } from "../api"
import type {
  Maintenance,
  SearchMaintenanceDto,
} from "@/interfaces/maintenance"

// GET /maintenance - Obtener todos los mantenimientos con paginación opcional
async function findAll(params?: { limit?: number; offset?: number }): Promise<Maintenance[]> {
  const { data } = await api.get("/maintenance", { params })
  return data
}

// GET /maintenance/:id - Obtener un mantenimiento por ID
async function findOne(id: string): Promise<Maintenance> {
  const { data } = await api.get(`/maintenance/${id}`)
  return data
}

// POST /maintenance - Crear un nuevo mantenimiento
async function create(payload: Partial<Maintenance>): Promise<Maintenance> {
  const { data } = await api.post("/maintenance", payload)
  return data
}

// PUT /maintenance/:id - Actualizar un mantenimiento
async function update(id: string, payload: Partial<Maintenance>): Promise<Maintenance> {
  const { data } = await api.put(`/maintenance/${id}`, payload)
  return data
}

// DELETE /maintenance/:id - Eliminar un mantenimiento
async function remove(id: string): Promise<void> {
  await api.delete(`/maintenance/${id}`)
}

// GET /maintenance/search - Buscar mantenimientos con filtros
async function search(filters: SearchMaintenanceDto): Promise<Maintenance[]> {
  const params = new URLSearchParams()

  if (filters.term) params.append("term", filters.term)
  if (filters.equipmentId) params.append("equipmentId", filters.equipmentId)
  if (filters.technicianId) params.append("technicianId", filters.technicianId)
  if (filters.status) params.append("status", filters.status)
  if (filters.startDate) params.append("startDate", filters.startDate)
  if (filters.endDate) params.append("endDate", filters.endDate)
  if (filters.limit) params.append("limit", filters.limit.toString())
  if (filters.offset) params.append("offset", filters.offset.toString())

  // ✅ Corregido: usamos /maintenance/search
  const { data } = await api.get(`/maintenance/search?${params.toString()}`)
  return data
}


export const maintenanceAPI = {
  findAll,
  findOne,
  create,
  update,
  remove,
  search,
}
