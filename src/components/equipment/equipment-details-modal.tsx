"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Edit, Trash2, Calendar, MapPin, Hash } from "lucide-react"
import Image from "next/image"
import type { Equipment } from "@/interfaces/equipment"
import { statusConfig, categoryConfig } from "@/lib/data/equipment"

interface EquipmentDetailsModalProps {
  equipment: Equipment | null
  isOpen: boolean
  onClose: () => void
  onEdit: (equipment: Equipment) => void
  onDelete: (id: string) => void
}

export function EquipmentDetailsModal({ equipment, isOpen, onClose, onEdit, onDelete }: EquipmentDetailsModalProps) {
  if (!isOpen || !equipment) return null

  const status = statusConfig[equipment.status] || {
    label: "Desconocido",
    variant: "secondary" as const,
    color: "bg-gray-500",
  }

  const category = categoryConfig[equipment.category] || {
    label: "Otro",
    icon: "🔌",
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-xl font-semibold">Detalles del Equipo</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar" className="hover:bg-gray-100 dark:hover:bg-slate-800">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Imagen */}
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg overflow-hidden">
              {equipment.imageUrl ? (
                <Image
                  src={equipment.imageUrl || "/placeholder.svg"}
                  alt={equipment.name}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextElementSibling?.classList.remove("hidden")
                  }}
                />
              ) : null}
              <div className={`w-full h-64 flex items-center justify-center ${equipment.imageUrl ? "hidden" : ""}`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <p className="text-muted-foreground">Sin imagen disponible</p>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <Badge variant={status.variant} className="shadow-sm bg-white/90 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                {status.label}
              </Badge>
            </div>
          </div>

          {/* Información básica */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{equipment.name}</h2>
              <p className="text-lg text-muted-foreground">{equipment.model}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-foreground">{category.label}</span>
              </div>
              {equipment.dailyRate && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${equipment.dailyRate}</p>
                  <p className="text-sm text-muted-foreground">por día</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-foreground">Descripción</h3>
              <p className="text-muted-foreground">{equipment.description}</p>
            </div>

            {/* Información adicional */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Información adicional</h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Creado: {new Date(equipment.createdAt).toLocaleDateString()}</span>
              </div>

              {equipment.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Ubicación: {equipment.location}</span>
                </div>
              )}

              {equipment.serialNumber && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="w-4 h-4" />
                  <span>Serie: {equipment.serialNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={() => onEdit(equipment)} className="flex-1 transition-all duration-200 hover:scale-105">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(equipment.id)}
              className="flex-1 transition-all duration-200 hover:scale-105"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
