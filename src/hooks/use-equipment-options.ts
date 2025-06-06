import { useEffect, useState } from "react"
import { equipmentAPI } from "@/lib/api/equipment"
import type { Equipment } from "@/interfaces/equipment"

export function useEquipmentOptions() {
  const [equipmentOptions, setEquipmentOptions] = useState<Equipment[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const equipment = await equipmentAPI.findAll()
        setEquipmentOptions(equipment)
      } catch (error) {
        console.error("Error al cargar equipos:", error)
      }
    }

    fetchData()
  }, [])

  return { equipmentOptions }
}
