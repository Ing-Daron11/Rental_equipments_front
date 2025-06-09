import { reservationsAPI } from "@/lib/api/reservations";
import api from "@/lib/api";

jest.mock("@/lib/api");

describe("reservationsAPI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
      const result = await reservationsAPI.findAll();
      expect(api.get).toHaveBeenCalledWith("/equipment/rented");
      expect(result).toEqual(mockData);
    });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     


    it("debe propagar el error si la petición falla", async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(reservationsAPI.findAll()).rejects.toThrow("fail");
    });
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|  
  describe("release", () => {
    it("debe llamar api.patch con el endpoint correcto", async () => {
      (api.patch as jest.Mock).mockResolvedValue({ data: "ok" });
      const equipmentId = "123";
      const result = await reservationsAPI.release(equipmentId);
      expect(api.patch).toHaveBeenCalledWith(`/equipment/${equipmentId}/release`);
      expect(result).toEqual({ data: "ok" });
    });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     
    it("debe propagar el error si la petición falla", async () => {
      (api.patch as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(reservationsAPI.release("123")).rejects.toThrow("fail");
    });
  });
});
