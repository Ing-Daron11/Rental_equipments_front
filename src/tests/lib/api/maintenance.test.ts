import { maintenanceAPI } from "@/lib/api/maintenance";
import { api } from "@/lib/api";

jest.mock("@/lib/api");

describe("maintenanceAPI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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


  
  describe("findAll", () => {
    it("debe retornar data cuando la petición es exitosa", async () => {
      const mockData = [{ id: 1 }, { id: 2 }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await maintenanceAPI.findAll({ limit: 10, offset: 0 });
      expect(api.get).toHaveBeenCalledWith("/maintenance", { params: { limit: 10, offset: 0 } });
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(maintenanceAPI.findAll()).rejects.toThrow("fail");
    });
  });

  describe("findOne", () => {
    it("debe retornar data de un mantenimiento por id", async () => {
      const mockData = { id: 1 };
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await maintenanceAPI.findOne("1");
      expect(api.get).toHaveBeenCalledWith("/maintenance/1");
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(maintenanceAPI.findOne("1")).rejects.toThrow("fail");
    });
  });

  describe("create", () => {
    it("debe crear un mantenimiento", async () => {
      const payload = { foo: "bar" };
      const mockData = { id: 1 };
      (api.post as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await maintenanceAPI.create(payload as any);
      expect(api.post).toHaveBeenCalledWith("/maintenance", payload);
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.post as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(maintenanceAPI.create({} as any)).rejects.toThrow("fail");
    });
  });

  describe("update", () => {
    it("debe actualizar un mantenimiento", async () => {
      const payload = { foo: "bar" };
      const mockData = { id: 1 };
      (api.patch as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await maintenanceAPI.update("1", payload as any);
      expect(api.patch).toHaveBeenCalledWith("/maintenance/1", payload);
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.patch as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(maintenanceAPI.update("1", {} as any)).rejects.toThrow("fail");
    });
  });

  describe("remove", () => {
    it("debe eliminar un mantenimiento", async () => {
      (api.delete as jest.Mock).mockResolvedValue({});
      await maintenanceAPI.remove("1");
      expect(api.delete).toHaveBeenCalledWith("/maintenance/1");
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.delete as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(maintenanceAPI.remove("1")).rejects.toThrow("fail");
    });
  });

  describe("search", () => {
    it("debe construir correctamente los filtros y retornar data", async () => {
      const filters = {
        term: "foo",
        equipmentId: "eq1",
        technicianId: "tech1",
        status: "pending",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        limit: 5,
        offset: 0,
      };
      const mockData = [{ id: 1 }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await maintenanceAPI.search(filters as any);
      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining("/maintenance/search?"),
      );
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(maintenanceAPI.search({} as any)).rejects.toThrow("fail");
    });
  });
});
