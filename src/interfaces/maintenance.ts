// Tipos auxiliares
export type MaintenanceStatus = "pending" | "in_progress" | "completed" | "canceled";

// Entidad principal
export interface Maintenance {
  id: string;
  description: string;
  performedAt: string; // Fecha de realización del mantenimiento
  equipmentId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
  status: MaintenanceStatus;

  equipment?: {
    id: string;
    name: string;
    model: string;
    description?: string;
    category?: string;
    status?: string;
    createdAt?: string;
    user?: {
      id: string;
      email: string;
      name: string;
      roles: string[];
      isActive: boolean;
    };
  };

  technician?: {
    id: string;
    email: string;
    name: string;
    roles: string[];
    isActive: boolean;
  };
}

// DTO para creación de mantenimientos
export interface CreateMaintenanceDto {
  equipmentId: string;
  technicianId: string;
  description: string;
  performedAt?: string | null;
}

// DTO para edición de mantenimientos
export interface UpdateMaintenanceDto {
  equipmentId?: string;
  technicianId?: string;
  description?: string;
  status?: MaintenanceStatus;
  performedAt?: string | null;
}

// DTO para búsqueda/filtrado desde el frontend hacia el backend
export interface SearchMaintenanceDto {
  search?: string;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  term?: string;
  equipmentId?: string;
  technicianId?: string;
  status?: MaintenanceStatus | "all";
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

// DTO genérico para paginación
export interface PaginationDto {
  limit?: number;
  offset?: number;
}

// Filtros usados en el frontend para el estado local
export interface MaintenanceFilters {
  status: MaintenanceStatus | "all";
  technicianId: string | "all";
  equipmentId: string | "all";
  search: string;
  sortBy: "date" | "status" | "createdAt";
  sortOrder: "asc" | "desc";
}

// Tipo genérico de respuesta del backend
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}
