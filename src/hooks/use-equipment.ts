"use client";

import { useState, useEffect } from "react";
import { equipmentAPI } from "../lib/api/equipment";
import type {
  Equipment,
  SearchEquipmentDto,
  PaginationDto,
  CreateEquipmentDto,
  UpdateEquipmentDto,
  UpdateEquipmentStatusDto,
} from "@/interfaces/equipment";
import { useToast } from "./use-toast";

export function useEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEquipment = async (pagination?: PaginationDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await equipmentAPI.findAll(pagination);
      setEquipment(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error al cargar equipos";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchEquipment = async (filters: SearchEquipmentDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await equipmentAPI.search(filters);
      setEquipment(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error al buscar equipos";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEquipment = async (equipmentDto: CreateEquipmentDto) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Enviando a API:", equipmentDto)
      const newEquipment = await equipmentAPI.create(equipmentDto);
      setEquipment((prev) => [...prev, newEquipment]);
      toast({
        title: "Éxito",
        description: "Equipo creado correctamente",
      });
      return newEquipment;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Error al crear equipo";
      console.error("Error al crear equipo:", errorMessage, err);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEquipment = async (id: string, updateDto: UpdateEquipmentDto) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEquipment = await equipmentAPI.update(id, updateDto);
      setEquipment((prev) =>
        prev.map((item) => (item.id === id ? updatedEquipment : item))
      );
      toast({
        title: "Éxito",
        description: "Equipo actualizado correctamente",
      });
      return updatedEquipment;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error al actualizar equipo";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEquipmentStatus = async (
    id: string,
    statusDto: UpdateEquipmentStatusDto
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEquipment = await equipmentAPI.updateStatus(id, statusDto);
      setEquipment((prev) =>
        prev.map((item) => (item.id === id ? updatedEquipment : item))
      );
      toast({
        title: "Éxito",
        description: "Estado actualizado correctamente",
      });
      return updatedEquipment;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error al actualizar estado";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar equipo
  const deleteEquipment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await equipmentAPI.remove(id);
      setEquipment((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: "Éxito",
        description: "Equipo eliminado correctamente",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error al eliminar equipo";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener equipo por ID
  const getEquipmentById = (id: string) => {
    return equipment.find((item) => item.id === id) || null;
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return {
    equipment,
    loading,
    error,
    fetchEquipment,
    searchEquipment,
    createEquipment,
    updateEquipment,
    updateEquipmentStatus,
    deleteEquipment,
    getEquipmentById,
    refetch: fetchEquipment,
  };
}

export function useEquipmentDetails(id: string) {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEquipmentDetails = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await equipmentAPI.findOne(id);
      setEquipment(data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error al cargar detalles";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipmentDetails();
  }, [id]);

  return {
    equipment,
    loading,
    error,
    refetch: fetchEquipmentDetails,
  };
}
