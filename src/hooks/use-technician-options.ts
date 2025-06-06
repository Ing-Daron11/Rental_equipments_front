import { useEffect, useState } from "react"
import { userAPI } from "@/lib/api/user"
import type { User } from "@/interfaces/user"

export function useTechnicianOptions() {
  const [technicianOptions, setTechnicianOptions] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const techs = await userAPI.findAllTechnicians()
        setTechnicianOptions(techs)
      } catch (error) {
        console.error("Error al cargar técnicos:", error)
      }
    }

    fetchData()
  }, [])

  return { technicianOptions }
}
