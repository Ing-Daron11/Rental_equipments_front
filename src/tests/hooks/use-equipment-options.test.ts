import { renderHook, waitFor } from "@testing-library/react";
import * as useEquipmentOptionsModule from "@/hooks/use-equipment-options";
import { act } from "react-dom/test-utils";
import { equipmentAPI } from "@/lib/api/equipment";
import { EquipmentCategory, EquipmentStatus } from "@/interfaces/equipment";

describe("useEquipmentOptions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("retorna un array vacío por defecto", () => {
    const { result } = renderHook(() => useEquipmentOptionsModule.useEquipmentOptions());
    expect(Array.isArray(result.current.equipmentOptions)).toBe(true);
    expect(result.current.equipmentOptions.length).toBe(0);
  });

  it("actualiza el estado con equipos si la API responde correctamente", async () => {
    const mockEquipment = [
      { id: "1", name: "Laptop", model: "X1", description: "desc", category: EquipmentCategory.LAPTOP, status: EquipmentStatus.AVAILABLE, createdAt: "2024-01-01" },
      { id: "2", name: "Monitor", model: "M1", description: "desc2", category: EquipmentCategory.MONITOR, status: EquipmentStatus.AVAILABLE, createdAt: "2024-01-02" },
    ];
    jest.spyOn(equipmentAPI, "findAll").mockResolvedValue(mockEquipment);

    const { result } = renderHook(() => useEquipmentOptionsModule.useEquipmentOptions());
    await waitFor(() => {
      expect(result.current.equipmentOptions.length).toBe(2);
      expect(result.current.equipmentOptions[0].name).toBe("Laptop");
    });
  });

  it("maneja errores y no actualiza el estado si la API falla", async () => {
    const error = new Error("API error");
    jest.spyOn(equipmentAPI, "findAll").mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useEquipmentOptionsModule.useEquipmentOptions());
    await waitFor(() => {
      expect(result.current.equipmentOptions.length).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith("Error al cargar equipos:", error);
    });
    consoleSpy.mockRestore();
  });
});
