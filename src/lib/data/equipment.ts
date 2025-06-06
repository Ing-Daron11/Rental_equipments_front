import { EquipmentCategory, EquipmentStatus } from "@/interfaces/equipment"

// Configuración de categorías actualizada
export const equipmentCategories = [
    { value: "all", label: "Todas las categorías" },
    { value: EquipmentCategory.LAPTOP, label: "Laptops" },
    { value: EquipmentCategory.DESKTOP, label: "Escritorios" },
    { value: EquipmentCategory.MONITOR, label: "Monitores" },
//   { value: EquipmentCategory.CAMERA, label: "Cámaras" },
//   { value: EquipmentCategory.PROJECTOR, label: "Proyectores" },
//   { value: EquipmentCategory.AUDIO, label: "Audio" },
//   { value: EquipmentCategory.NETWORKING, label: "Redes" },
//   { value: EquipmentCategory.MOBILE, label: "Móviles" },
//   { value: EquipmentCategory.ACCESSORIES, label: "Accesorios" },
]

// Estados actualizados según tu backend
export const equipmentStatuses = [
    { value: "all", label: "Todos los estados" },
    { value: EquipmentStatus.AVAILABLE, label: "Disponible" },
    { value: EquipmentStatus.RENTED, label: "Alquilado" },
    { value: EquipmentStatus.MAINTENANCE, label: "Mantenimiento" },

]

// Configuración de estados para UI
export const statusConfig = {
  [EquipmentStatus.AVAILABLE]: {
    label: "Disponible",
    variant: "default" as const,
    color: "bg-green-500",
  },
  [EquipmentStatus.RENTED]: {
    label: "Alquilado",
    variant: "secondary" as const,
    color: "bg-yellow-500",
  },
  [EquipmentStatus.MAINTENANCE]: {
    label: "Mantenimiento",
    variant: "outline" as const,
    color: "bg-blue-500",
  },
}

// Configuración de categorías para UI
export const categoryConfig = {
    [EquipmentCategory.LAPTOP]: { label: "Laptop", icon: "💻" },
    [EquipmentCategory.DESKTOP]: { label: "Escritorio", icon: "🖥️" },
    [EquipmentCategory.MONITOR]: { label: "Monitor", icon: "🖥️" },
//   [EquipmentCategory.CAMERA]: { label: "Cámara", icon: "📷" },
//   [EquipmentCategory.PROJECTOR]: { label: "Proyector", icon: "📽️" },
//   [EquipmentCategory.AUDIO]: { label: "Audio", icon: "🎵" },
//   [EquipmentCategory.NETWORKING]: { label: "Redes", icon: "🌐" },
//   [EquipmentCategory.MOBILE]: { label: "Móvil", icon: "📱" },
//   [EquipmentCategory.ACCESSORIES]: { label: "Accesorios", icon: "🔌" },
}
