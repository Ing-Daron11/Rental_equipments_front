"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useMaintenance } from "@/hooks/use-maintenance";
import { MaintenanceFiltersComponent } from "@/components/maintenance/maintenance-filters";
import { MaintenanceSearch } from "@/components/maintenance/maintenance-search";
import { MaintenanceList } from "@/components/maintenance/maintenance-list";
import type { SearchMaintenanceDto } from "@/interfaces/maintenance";
import Navbar from "@/components/shared/navbar";

export default function MaintenancePage() {
  const { toast } = useToast();
  const {
    maintenance,
    loading,
    error,
    searchMaintenance,
    refetch,
  } = useMaintenance();

  const [isAuthenticated, setIsAuthenticated] = useState(true); // dummy auth

  const [filters, setFilters] = useState<SearchMaintenanceDto>({
    technicianId: undefined,
    equipmentId: undefined,
    status: "all",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    const searchParams: SearchMaintenanceDto = {};

    if (filters.search) searchParams.search = filters.search;
    if (filters.status && filters.status !== "all") {
      searchParams.status = filters.status;
    }
    if (filters.equipmentId) searchParams.equipmentId = filters.equipmentId;
    if (filters.technicianId) searchParams.technicianId = filters.technicianId;
    if (filters.sortBy) searchParams.sortBy = filters.sortBy;
    if (filters.sortOrder) searchParams.sortOrder = filters.sortOrder;

    searchMaintenance(searchParams);
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      technicianId: undefined,
      equipmentId: undefined,
      status: "all",
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Actualizado",
      description: "La lista de mantenimientos ha sido actualizada.",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Error al cargar mantenimientos
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="min-h-screen pt-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Header */}
        <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al inicio
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Gestión de Mantenimientos
                  </h1>
                  <p className="text-muted-foreground">
                    Administra registros de mantenimiento técnico
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Actualizar
                </Button>
                <Button asChild className="hidden sm:flex">
                  <Link href="/maintenance/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Mantenimiento
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtros */}
            <div className="lg:col-span-1 space-y-6">
              <MaintenanceSearch
                value={filters.search ?? ""}
                onChange={(search) => setFilters({ ...filters, search })}
              />
              <MaintenanceFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Lista de mantenimientos */}
            <div className="lg:col-span-3">
              <MaintenanceList maintenance={maintenance} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
