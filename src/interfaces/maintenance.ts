// Tipos auxiliares
export type MaintenanceStatus = "pending" | "in_progress" | "completed" | "canceled";

// Entidad principal
export interface Maintenance {
  id: string
  description: string
  performedAt: string // Fecha de realización del mantenimiento
  equipmentId: string
  createdAt: string
  updatedAt: string
  status: MaintenanceStatus

  // ✅ Incluye todos los datos opcionales si vienen del backend
  equipment?: {
    id: string
    name: string
    model: string
    description?: string
    category?: string
    status?: string
    createdAt?: string

    user?: {
      id: string
      email: string
      name: string
      roles: string[]
      isActive: boolean
    }
  }

  technician?: {
    id: string
    email: string
    name: string
    roles: string[]
    isActive: boolean
  }
}

export interface CreateMaintenanceDto {
  equipmentId: string;
  technicianId: string; // ¿ESTO existe? ← Asegúrate de que esté
  description: string;
}

// DTO para actualización
export interface UpdateMaintenanceDto {
  description?: string;
  performedAt?: string;
}
//prueba
export interface SearchMaintenanceDto {
  search?: string;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  term?: string
  equipmentId?: string
  technicianId?: string // 👈 asegúrate de agregar esta línea
  status?: string
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}

// DTO genérico para paginación
export interface PaginationDto {
  limit?: number;
  offset?: number;
}

// Filtros para el frontend
export interface MaintenanceFilters {
  status: MaintenanceStatus | "all"
  technicianId: string | "all"
  equipmentId: string | "all"
  search: string
  sortBy: "date" | "status" | "createdAt"
  sortOrder: "asc" | "desc"
}

// Tipo de respuesta genérica del backend
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}
