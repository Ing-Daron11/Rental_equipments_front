import { renderHook, act, waitFor } from "@testing-library/react";
import { useMaintenance } from "@/hooks/use-maintenance";
import { maintenanceAPI } from "@/lib/api/maintenance";
import type { Maintenance, MaintenanceStatus } from "@/interfaces/maintenance";

jest.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: jest.fn() }) }));

describe("useMaintenance", () => {
  const mockMaintenance: Maintenance[] = [
    {
      id: "1",
      description: "Cambio de disco",
      performedAt: "2024-01-01",
      equipmentId: "eq1",
      technicianId: "tech1",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      status: "pending",
    },
    {
      id: "2",
      description: "Limpieza",
      performedAt: "2024-01-02",
      equipmentId: "eq2",
      technicianId: "tech2",
      createdAt: "2024-01-02",
      updatedAt: "2024-01-02",
      status: "completed",
    },
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


  it("searchMaintenance: éxito y error", async () => {
    jest.spyOn(maintenanceAPI, "search").mockResolvedValueOnce([mockMaintenance[0]]);
    const { result } = renderHook(() => useMaintenance());
    await act(async () => {
      await result.current.searchMaintenance({ term: "Cambio" });
    });
    expect(result.current.maintenance[0].description).toBe("Cambio de disco");

    jest.spyOn(maintenanceAPI, "search").mockRejectedValueOnce(new Error("search error"));
    await act(async () => {
      await result.current.searchMaintenance({ term: "fail" });
    });
    expect(result.current.error).toBe("search error");
  });

  it("createMaintenance: éxito y error", async () => {
    jest.spyOn(maintenanceAPI, "create").mockResolvedValueOnce(mockMaintenance[0]);
    const { result } = renderHook(() => useMaintenance());
    await act(async () => {
      await result.current.createMaintenance({ equipmentId: "eq1", technicianId: "tech1", description: "Cambio de disco" });
    });
    expect(result.current.maintenance[0].description).toBe("Cambio de disco");

    jest.spyOn(maintenanceAPI, "create").mockRejectedValueOnce(new Error("create error"));
    await expect(result.current.createMaintenance({ equipmentId: "fail", technicianId: "fail", description: "fail" })).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("getMaintenanceById: éxito y error", async () => {
    jest.spyOn(maintenanceAPI, "findOne").mockResolvedValueOnce(mockMaintenance[0]);
    const { result } = renderHook(() => useMaintenance());
    await act(async () => {
      const m = await result.current.getMaintenanceById("1");
      expect(m.id).toBe("1");
    });

    jest.spyOn(maintenanceAPI, "findOne").mockRejectedValueOnce(new Error("find error"));
    await expect(result.current.getMaintenanceById("fail")).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("updateMaintenance: éxito y error", async () => {
    jest.spyOn(maintenanceAPI, "update").mockResolvedValueOnce({ ...mockMaintenance[0], description: "Actualizado" });
    const { result } = renderHook(() => useMaintenance());
    act(() => { result.current.maintenance.push(mockMaintenance[0]); });
    await act(async () => {
      await result.current.updateMaintenance("1", { description: "Actualizado" });
    });
    expect(result.current.maintenance[0].description).toBe("Actualizado");

    jest.spyOn(maintenanceAPI, "update").mockRejectedValueOnce(new Error("update error"));
    await expect(result.current.updateMaintenance("1", { description: "fail" })).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("deleteMaintenance: éxito y error", async () => {
    jest.spyOn(maintenanceAPI, "remove").mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useMaintenance());
    act(() => { result.current.maintenance.push(mockMaintenance[0]); });
    await act(async () => {
      await result.current.deleteMaintenance("1");
    });
    expect(result.current.maintenance.length).toBe(0);

    jest.spyOn(maintenanceAPI, "remove").mockRejectedValueOnce(new Error("delete error"));
    await expect(result.current.deleteMaintenance("fail")).rejects.toBeTruthy();
    expect(result.current.error).toBe(null);
  });

  it("refetch ejecuta searchMaintenance", async () => {
    jest.spyOn(maintenanceAPI, "search").mockResolvedValueOnce([mockMaintenance[1]]);
    const { result } = renderHook(() => useMaintenance());
    await act(async () => {
      await result.current.refetch();
    });
    expect(result.current.maintenance[0].description).toBe("Limpieza");
  });
});
