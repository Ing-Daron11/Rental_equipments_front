import type { Equipment, EquipmentFilters } from "@/interfaces/equipment";
import { EquipmentCard } from "./equipment-card";
import { Badge } from "@/components/ui/badge";
import { Package, Loader2, AlertCircle } from "lucide-react";

interface EquipmentListProps {
  equipment: Equipment[];
  filters: EquipmentFilters;
  loading?: boolean;
  error?: string | null;
  onRent?: (equipmentId: string) => void;
  onViewDetails: (equipmentId: string) => void;
}

export function EquipmentList({
  equipment,
  filters,
  loading = false,
  error = null,
  onRent,
  onViewDetails,
}: EquipmentListProps) {
  // Validar que equipment sea un array
  const equipmentArray = Array.isArray(equipment) ? equipment : [];

  // Mostrar loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Equipos Disponibles
            </h2>
            <p className="text-muted-foreground">Cargando equipos...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Equipos Disponibles
            </h2>
            <p className="text-muted-foreground">Error al cargar equipos</p>
          </div>
        </div>
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Error</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
        </div>
      </div>
    );
  }

  // Filtrar equipos
  const filteredEquipment = equipmentArray.filter((item) => {
    const matchesCategory =
      filters.category === "all" || item.category === filters.category;
    const matchesStatus =
      filters.status === "all" || item.status === filters.status;
    const matchesSearch =
      filters.search === "" ||
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.model.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Ordenar equipos
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }

    return filters.sortOrder === "desc" ? -comparison : comparison;
  });

  // Estado vacío
  if (sortedEquipment.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Equipos Disponibles
            </h2>
            <p className="text-muted-foreground">
              {equipmentArray.length === 0
                ? "No hay equipos registrados"
                : "No se encontraron equipos"}
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {equipmentArray.length === 0
              ? "No hay equipos registrados"
              : "No se encontraron equipos"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {equipmentArray.length === 0
              ? "Agrega equipos para comenzar a gestionar tu inventario."
              : "No hay equipos que coincidan con los filtros seleccionados."}
          </p>
          <Badge
            variant="outline"
            className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          >
            {filteredEquipment.length} de {equipmentArray.length} equipos
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Equipos Disponibles
          </h2>
          <p className="text-muted-foreground">
            Mostrando {sortedEquipment.length} de {equipmentArray.length}{" "}
            equipos
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-sm border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
        >
          {sortedEquipment.filter((e) => e.status === "available").length}{" "}
          disponibles
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEquipment.map((item) => (
          <EquipmentCard
            key={item.id}
            equipment={item}
            onRent={onRent}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
