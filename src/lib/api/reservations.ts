import api from "../api";
import type { Reservation } from "@/interfaces/reservation";

export const reservationsAPI = {

  async findAll(): Promise<Reservation[]> {
    const { data } = await api.get("/equipment/rented");
    return data;
  },

  // Libera el equipo: desvincula usuario y pone el equipo como disponible
  async release(equipmentId: string) {
    return api.patch(`/equipment/${equipmentId}/release`);
    // El backend debe poner user: null y status: "available"
  },

};