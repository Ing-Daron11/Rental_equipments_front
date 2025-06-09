import { renderHook, act, waitFor } from "@testing-library/react";
import { useEquipment } from "@/hooks/use-equipment";
import { equipmentAPI } from "@/lib/api/equipment";
import { EquipmentCategory, EquipmentStatus } from "@/interfaces/equipment";

jest.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: jest.fn() }) }));

describe("useEquipment", () => {
  const mockEquipment = [
    { id: "1", name: "Laptop", model: "X1", description: "desc", category: EquipmentCategory.LAPTOP, status: EquipmentStatus.AVAILABLE, createdAt: "2024-01-01" },
    { id: "2", name: "Monitor", model: "M1", description: "desc2", category: EquipmentCategory.MONITOR, status: EquipmentStatus.AVAILABLE, createdAt: "2024-01-02" },
  ];
  afterEach(() => jest.clearAllMocks());
  
//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     
//===================================================
//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   



  it("fetchEquipment: éxito y error", async () => {
    jest.spyOn(equipmentAPI, "findAll").mockResolvedValueOnce(mockEquipment);
    const { result } = renderHook(() => useEquipment());
    await waitFor(() => expect(result.current.equipment.length).toBe(2));
    expect(result.current.equipment[0].name).toBe("Laptop");

    jest.spyOn(equipmentAPI, "findAll").mockRejectedValueOnce(new Error("fail"));
    await act(async () => {
      await result.current.fetchEquipment();
    });
    expect(result.current.error).toBe("fail");
  });

  it("searchEquipment: éxito y error", async () => {
    jest.spyOn(equipmentAPI, "search").mockResolvedValueOnce([mockEquipment[1]]);
    const { result } = renderHook(() => useEquipment());
    await act(async () => {
      await result.current.searchEquipment({ term: "Monitor" });
    });
    expect(result.current.equipment[0].name).toBe("Monitor");

    jest.spyOn(equipmentAPI, "search").mockRejectedValueOnce({ message: "search error" });
    await act(async () => {
      await result.current.searchEquipment({ term: "fail" });
    });
    expect(result.current.error).toBe("search error");
  });

  it("createEquipment: éxito y error", async () => {
    jest.spyOn(equipmentAPI, "create").mockResolvedValueOnce(mockEquipment[0]);
    const { result } = renderHook(() => useEquipment());
    await act(async () => {
      await result.current.createEquipment({
        name: "Laptop", model: "X1", description: "desc", category: EquipmentCategory.LAPTOP
      });
    });
    expect(result.current.equipment[0].name).toBe("Laptop");

    jest.spyOn(equipmentAPI, "create").mockRejectedValueOnce(new Error("create error"));
    await expect(result.current.createEquipment({ name: "fail", model: "", description: "", category: EquipmentCategory.LAPTOP })).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  

  it("updateEquipment: éxito y error", async () => {
    jest.spyOn(equipmentAPI, "update").mockResolvedValueOnce({ ...mockEquipment[0], name: "Updated" });
    const { result } = renderHook(() => useEquipment());
    act(() => { result.current.equipment.push(mockEquipment[0]); });
    await act(async () => {
      await result.current.updateEquipment("1", { name: "Updated" });
    });
    expect(result.current.equipment[0].name).toBe("Updated");

    jest.spyOn(equipmentAPI, "update").mockRejectedValueOnce(new Error("update error"));
    await expect(result.current.updateEquipment("1", { name: "fail" })).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("updateEquipmentStatus: éxito y error", async () => {
    jest.spyOn(equipmentAPI, "updateStatus").mockResolvedValueOnce({ ...mockEquipment[0], status: EquipmentStatus.RENTED });
    const { result } = renderHook(() => useEquipment());
    act(() => { result.current.equipment.push(mockEquipment[0]); });
    await act(async () => {
      await result.current.updateEquipmentStatus("1", { status: EquipmentStatus.RENTED });
    });
    expect(result.current.equipment[0].status).toBe(EquipmentStatus.RENTED);

    jest.spyOn(equipmentAPI, "updateStatus").mockRejectedValueOnce(new Error("status error"));
    await expect(result.current.updateEquipmentStatus("1", { status: EquipmentStatus.RENTED })).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("deleteEquipment: éxito y error", async () => {
    jest.spyOn(equipmentAPI, "remove").mockResolvedValueOnce({ message: "ok", equipmentId: "1" });
    const { result } = renderHook(() => useEquipment());
    act(() => { result.current.equipment.push(mockEquipment[0]); });
    await act(async () => {
      await result.current.deleteEquipment("1");
    });
    expect(result.current.equipment.length).toBe(0);

    jest.spyOn(equipmentAPI, "remove").mockRejectedValueOnce(new Error("delete error"));
    await expect(result.current.deleteEquipment("fail")).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("getEquipmentById retorna el equipo correcto o null", () => {
    const { result } = renderHook(() => useEquipment());
    act(() => { result.current.equipment.push(mockEquipment[0]); });
    expect(result.current.getEquipmentById("1")).toEqual(mockEquipment[0]);
    expect(result.current.getEquipmentById("nope")).toBeNull();
  });
});
