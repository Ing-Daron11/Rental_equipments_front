import { equipmentAPI } from "@/lib/api/equipment";
import api from "@/lib/api";

jest.mock("@/lib/api");

describe("equipmentAPI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

 


  describe("findAll", () => {
    it("debe retornar data con paginación", async () => {
      const mockData = [{ id: 1 }, { id: 2 }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.findAll({ limit: 10, offset: 0 });
      expect(api.get).toHaveBeenCalledWith("/equipment?limit=10");
      expect(result).toEqual(mockData);
    });
    it("debe retornar data sin paginación", async () => {
      const mockData = [{ id: 1 }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.findAll();
      expect(api.get).toHaveBeenCalledWith("/equipment?");
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.findAll()).rejects.toThrow("fail");
    });
  });

  describe("search", () => {
    it("debe construir correctamente los filtros y retornar data", async () => {
      const filters = {
        term: "foo",
        category: "cat1",
        status: "active",
        limit: 5,
        offset: 0,
      };
      const mockData = [{ id: 1 }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.search(filters as any);
      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining("/equipment/search?"),
      );
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.search({} as any)).rejects.toThrow("fail");
    });
  });

  describe("findOne", () => {
    it("debe retornar data de un equipo por id", async () => {
      const mockData = { id: 1 };
      (api.get as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.findOne("1");
      expect(api.get).toHaveBeenCalledWith("/equipment/1");
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.findOne("1")).rejects.toThrow("fail");
    });
  });

  describe("create", () => {
    it("debe crear un equipo", async () => {
      const payload = { foo: "bar" };
      const mockData = { id: 1 };
      (api.post as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.create(payload as any);
      expect(api.post).toHaveBeenCalledWith("/equipment", payload);
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.post as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.create({} as any)).rejects.toThrow("fail");
    });
  });

  describe("update", () => {
    it("debe actualizar un equipo", async () => {
      const payload = { foo: "bar" };
      const mockData = { id: 1 };
      (api.patch as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.update("1", payload as any);
      expect(api.patch).toHaveBeenCalledWith("/equipment/1", payload);
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.patch as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.update("1", {} as any)).rejects.toThrow("fail");
    });
  });

  describe("remove", () => {
    it("debe eliminar un equipo", async () => {
      const mockData = { success: true };
      (api.delete as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.remove("1");
      expect(api.delete).toHaveBeenCalledWith("/equipment/1");
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.delete as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.remove("1")).rejects.toThrow("fail");
    });
  });

  describe("updateStatus", () => {
    it("debe actualizar el estado de un equipo", async () => {
      const payload = { status: "active" };
      const mockData = { id: 1 };
      (api.patch as jest.Mock).mockResolvedValue({ data: mockData });
      const result = await equipmentAPI.updateStatus("1", payload as any);
      expect(api.patch).toHaveBeenCalledWith("/equipment/status/1", payload);
      expect(result).toEqual(mockData);
    });
    it("debe propagar el error si la petición falla", async () => {
      (api.patch as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(equipmentAPI.updateStatus("1", {} as any)).rejects.toThrow("fail");
    });
  });
});
