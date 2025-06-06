import { api } from "../api"
import type {
  Maintenance,
  SearchMaintenanceDto,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
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
async function create(payload: CreateMaintenanceDto): Promise<Maintenance> {
  const { data } = await api.post("/maintenance", payload)
  return data
}

// PUT /maintenance/:id - Actualizar un mantenimiento
async function update(id: string, payload: UpdateMaintenanceDto): Promise<Maintenance> {
  const { data } = await api.patch(`/maintenance/${id}`, payload)
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

  // ✅ Asegúrate de que el backend espera "technicianId"
  if ((filters as any).technicianId) {
    params.append("technicianId", (filters as any).technicianId)
  }

  // Si el backend usa technician como objeto, cámbialo por esto:
  // if (filters.technician && filters.technician.id) {
  //   params.append("technicianId", filters.technician.id)
  // }

  if (filters.status) params.append("status", filters.status)
  if (filters.startDate) params.append("startDate", filters.startDate)
  if (filters.endDate) params.append("endDate", filters.endDate)
  if (filters.limit) params.append("limit", filters.limit.toString())
  if (filters.offset) params.append("offset", filters.offset.toString())

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
