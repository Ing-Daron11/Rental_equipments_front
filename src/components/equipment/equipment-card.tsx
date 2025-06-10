"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Equipment } from "@/interfaces/equipment";
import { EquipmentStatus } from "@/interfaces/equipment";
import { Calendar, MapPin, Eye, Clock } from "lucide-react";
import Image from "next/image";
import { statusConfig, categoryConfig } from "@/lib/data/equipment";

interface EquipmentCardProps {
  equipment: Equipment;
  onRent?: (equipmentId: string) => void;
  onViewDetails: (equipmentId: string) => void;
  onUpdateStatus?: (equipmentId: string, status: EquipmentStatus) => void;
  showActions?: boolean;
}

export function EquipmentCard({
  equipment,
  onRent,
  onViewDetails,
  onUpdateStatus,
  showActions = true,
}: EquipmentCardProps) {
  const statusInfo = statusConfig[equipment.status];
  const categoryInfo = categoryConfig[equipment.category];
  const isAvailable = equipment.status === EquipmentStatus.AVAILABLE;

  const handleRent = () => {
    if (onRent && isAvailable) {
      onRent(equipment.id);
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg overflow-hidden">
            {equipment.imageUrl ? (
              <Image
                src={equipment.imageUrl || "/placeholder.svg"}
                alt={equipment.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
            ) : null}
            <div
              className={`w-full h-48 flex items-center justify-center ${
                equipment.imageUrl ? "hidden" : ""
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{categoryInfo.icon}</div>
                <p className="text-sm text-muted-foreground">Sin imagen</p>
              </div>
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant={statusInfo.variant} className="shadow-sm">
              <div
                className={`w-2 h-2 rounded-full ${statusInfo.color} mr-2`}
              />
              {statusInfo.label}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {categoryInfo.icon} {categoryInfo.label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {equipment.name}
          </h3>
          <p className="text-sm text-muted-foreground">{equipment.model}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {equipment.description}
        </p>

        <div className="space-y-2">
          {equipment.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{equipment.location}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              Creado: {new Date(equipment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {equipment.dailyRate && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ${equipment.dailyRate}
              </p>
              <p className="text-sm text-muted-foreground">por día</p>
            </div>
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="pt-0 gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(equipment.id)}
            className="flex-1"
            name="view-details-button"
            data-testid={`view-details-${equipment.id}`}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles
          </Button>

          {onRent && (
            <Button
              size="sm"
              onClick={handleRent}
              disabled={!isAvailable}
              className="flex-1"
              data-testid={`rent-button-${equipment.id}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isAvailable ? "Alquilar" : "No disponible"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
