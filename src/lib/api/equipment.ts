import api from "../api"
import type {
  Equipment,
  CreateEquipmentDto,
  UpdateEquipmentDto,
  UpdateEquipmentStatusDto,
  SearchEquipmentDto,
  PaginationDto,
  DeleteEquipmentResponse,
} from "@/interfaces/equipment"

// Funciones para interactuar con la API de equipos
export const equipmentAPI = {
  // GET /equipment - Obtener todos los equipos con paginación
  async findAll(pagination?: PaginationDto): Promise<Equipment[]> {
    const params = new URLSearchParams()
    if (pagination?.limit) params.append("limit", pagination.limit.toString())
    if (pagination?.offset) params.append("offset", pagination.offset.toString())

    const { data } = await api.get(`/equipment?${params.toString()}`)
    return data
  },

  // GET /equipment/search - Buscar equipos
  async search(filters: SearchEquipmentDto): Promise<Equipment[]> {
    const params = new URLSearchParams()
    if (filters.term) params.append("term", filters.term)
    if (filters.category) params.append("category", filters.category)
    if (filters.status) params.append("status", filters.status)
    if (filters.limit) params.append("limit", filters.limit.toString())
    if (filters.offset) params.append("offset", filters.offset.toString())

    const { data } = await api.get(`/equipment/search?${params.toString()}`)
    return data
  },

  // GET /equipment/:term - Obtener un equipo por ID o término
  async findOne(term: string): Promise<Equipment> {
    const { data } = await api.get(`/equipment/${term}`)
    return data
  },

  // POST /equipment - Crear nuevo equipo (solo admin)
  async create(equipmentDto: CreateEquipmentDto): Promise<Equipment> {
    const { data } = await api.post("/equipment", equipmentDto)
    return data
  },

  // PATCH /equipment/:id - Actualizar equipo (solo admin)
  async update(id: string, updateDto: UpdateEquipmentDto): Promise<Equipment> {
    const { data } = await api.patch(`/equipment/${id}`, updateDto)
    return data
  },

  // DELETE /equipment/:id - Eliminar equipo (solo admin)
  async remove(id: string): Promise<DeleteEquipmentResponse> {
    const { data } = await api.delete(`/equipment/${id}`)
    return data
  },

  // PATCH /equipment/status/:id - Actualizar estado (admin/technical)
  async updateStatus(id: string, statusDto: UpdateEquipmentStatusDto): Promise<Equipment> {
    const { data } = await api.patch(`/equipment/status/${id}`, statusDto)
    return data
  },
}
