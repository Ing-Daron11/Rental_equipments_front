// Actualizando tipos para coincidir con el backend
export interface Equipment {
  id: string
  name: string
  model: string
  description: string
  category: EquipmentCategory
  status: EquipmentStatus
  createdAt: string
  // Campos adicionales que podrías agregar en el futuro
  imageUrl?: string
  location?: string
  serialNumber?: string
  dailyRate?: number
}

// Enums que coinciden con tu backend
export enum EquipmentCategory {
  LAPTOP = "laptop",
  DESKTOP = "desktop",
  MONITOR = "monitor",
//   CAMERA = "camera",
//   PROJECTOR = "projector",
//   AUDIO = "audio",
//   NETWORKING = "networking",
//   MOBILE = "mobile",
//   ACCESSORIES = "accessories",
}

export enum EquipmentStatus {
  AVAILABLE = "available",
  RENTED = "rented",
  MAINTENANCE = "maintenance"
}

// DTOs para las requests
export interface CreateEquipmentDto {
  name: string
  model: string
  description: string
  category: EquipmentCategory
  status?: EquipmentStatus
}

export interface UpdateEquipmentDto {
  name?: string
  model?: string
  description?: string
  category?: EquipmentCategory
}

export interface UpdateEquipmentStatusDto {
  status: EquipmentStatus
}

export interface SearchEquipmentDto {
  term?: string
  category?: EquipmentCategory
  status?: EquipmentStatus
  limit?: number
  offset?: number
}

export interface PaginationDto {
  limit?: number
  offset?: number
}

// Filtros para el frontend
export interface EquipmentFilters {
  category: EquipmentCategory | "all"
  status: EquipmentStatus | "all"
  search: string
  sortBy: "name" | "category" | "status" | "createdAt"
  sortOrder: "asc" | "desc"
}

// Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  statusCode: number
}

export interface DeleteEquipmentResponse {
  message: string
  equipmentId: string
}
