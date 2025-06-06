"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import type { Equipment } from "@/interfaces/equipment";

interface EquipmentFormModalProps {
  equipment?: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipmentData: any) => void;
  isEditing?: boolean;
}

export function EquipmentFormModal({
  equipment,
  isOpen,
  onClose,
  onSave,
  isEditing = false,
}: EquipmentFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    description: "",
    category: "",
    status: "available",
  });

  // Cargar datos del equipo si estamos editando
  useEffect(() => {
    if (isEditing && equipment) {
      setFormData({
        name: equipment.name || "",
        model: equipment.model || "",
        description: equipment.description || "",
        category: equipment.category || "",
        status: equipment.status || "available",
      });
    } else {
      // Limpiar formulario para nuevo equipo
      setFormData({
        name: "",
        model: "",
        description: "",
        category: "",
        status: "available",
      });
    }
  }, [equipment, isEditing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const equipmentData = {
      ...formData,
    };

    console.log("Datos enviados:", equipmentData);
    onSave(equipmentData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-xl font-semibold">
            {isEditing ? "Editar Equipo" : "Crear Nuevo Equipo"}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información básica */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Nombre *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ej: MacBook Pro 16"
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Modelo *
                </label>
                <Input
                  value={formData.model}
                  onChange={(e) => handleChange("model", e.target.value)}
                  placeholder="Ej: MacBook Pro M3 Max"
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-foreground">
                Descripción *
              </label>
              <textarea
                className="w-full p-3 border rounded-md resize-none h-24 bg-background text-foreground border-input"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe las características del equipo..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Categoría *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">💻 Laptop</SelectItem>
                    <SelectItem value="desktop">
                      🖥️ Computador de escritorio
                    </SelectItem>
                    {/* <SelectItem value="camera">📷 Cámara</SelectItem>
                    <SelectItem value="projector">📽️ Proyector</SelectItem>
                    <SelectItem value="audio">🎵 Audio</SelectItem>
                    <SelectItem value="mobile">📱 Móvil</SelectItem>
                    <SelectItem value="accessories">🔌 Accesorios</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">
                  Estado
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="rented">Alquilado</SelectItem>
                    <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 transition-all duration-200 hover:scale-105"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 border-white text-white hover:bg-white hover:text-blue-600"
              >
                {isEditing ? "Guardar Cambios" : "Crear Equipo"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
