"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EquipmentSearch } from "@/components/equipment/equipment-search";
import { EquipmentFiltersComponent } from "@/components/equipment/equipment-filters";
import { EquipmentList } from "@/components/equipment/equipment-list";
import { EquipmentDetailsModal } from "@/components/equipment/equipment-details-modal";
import { useEquipment } from "@/hooks/use-equipment";
import type {
  EquipmentFilters,
  SearchEquipmentDto,
} from "@/interfaces/equipment";
import {
  type EquipmentCategory,
  EquipmentStatus,
} from "@/interfaces/equipment";
import { ArrowLeft, Plus, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Equipment } from "@/interfaces/equipment";
import { EquipmentFormModal } from "@/components/equipment/equipment-form-modal";

import Navbar from "@/components/shared/navbar"; 

export default function EquiposPage() {
  const {
    equipment,
    loading,
    error,
    searchEquipment,
    updateEquipmentStatus,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getEquipmentById,
    refetch,
  } = useEquipment();

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [filters, setFilters] = useState<EquipmentFilters>({
    category: "all",
    status: "all",
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  // Estados para modales
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Efecto para buscar cuando cambien los filtros
  useEffect(() => {
    const searchParams: SearchEquipmentDto = {};

    if (filters.search) searchParams.term = filters.search;
    if (filters.category !== "all")
      searchParams.category = filters.category as EquipmentCategory;
    if (filters.status !== "all")
      searchParams.status = filters.status as EquipmentStatus;

    searchEquipment(searchParams);
  }, [filters.search, filters.category, filters.status]);

  const handleRent = async (equipmentId: string) => {
    try {
      await updateEquipmentStatus(equipmentId, {
        status: EquipmentStatus.RENTED,
      });
      console.log("Equipo alquilado exitosamente");
    } catch (error) {
      console.error("Error al alquilar equipo:", error);
    }
  };

  const handleViewDetails = (equipmentId: string) => {
    const equipment = getEquipmentById(equipmentId);
    if (equipment) {
      setSelectedEquipment(equipment);
      setShowDetailsModal(true);
    }
  };

  const handleCreateNew = () => {
    setSelectedEquipment(null);
    setIsEditing(false);
    setShowFormModal(true);
  };

  const handleEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsEditing(true);
    setShowDetailsModal(false);
    setShowFormModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este equipo?")) {
      deleteEquipment(id);
      setShowDetailsModal(false);
      console.log("Equipo eliminado");
    }
  };

  const handleSave = (equipmentData: any) => {
    if (isEditing && selectedEquipment) {
      updateEquipment(selectedEquipment.id, equipmentData);
      console.log("Equipo actualizado");
    } else {
      createEquipment(equipmentData);
      console.log("Equipo creado");
    }
    setShowFormModal(false);
    setSelectedEquipment(null);
  };

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      search: "",
      sortBy: "name",
      sortOrder: "asc",
    });
  };

  const handleRefresh = () => {
    refetch();
    console.log("Lista actualizada");
  };

  // Mostrar error si hay problemas críticos
  if (error && !Array.isArray(equipment)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Error al cargar equipos
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
                    Gestión de Equipos
                  </h1>
                  <p className="text-muted-foreground">
                    Administra y alquila equipos tecnológicos
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
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={handleCreateNew}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Equipo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar con filtros */}
            <div className="lg:col-span-1 space-y-6">
              <EquipmentSearch
                value={filters.search}
                onChange={(search) => setFilters({ ...filters, search })}
              />
              <EquipmentFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Lista de equipos */}
            <div className="lg:col-span-3">
              <EquipmentList
                equipment={equipment}
                filters={filters}
                onRent={handleRent}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </div>

        {/* Modales */}
        <EquipmentDetailsModal
          equipment={selectedEquipment}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <EquipmentFormModal
          equipment={selectedEquipment}
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          onSave={handleSave}
          isEditing={isEditing}
        />
      </div>
    </>
  );
}