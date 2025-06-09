import { renderHook, waitFor } from "@testing-library/react";
import { useTechnicianOptions } from "@/hooks/use-technician-options";
import { userAPI } from "@/lib/api/user";

describe("useTechnicianOptions", () => {
  afterEach(() => jest.clearAllMocks());

 //  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   

  it("actualiza el estado con técnicos si la API responde correctamente", async () => {
    const mockTechs = [
      { id: "1", name: "Tech 1", email: "t1@mail.com", role: "technician" },
      { id: "2", name: "Tech 2", email: "t2@mail.com", role: "technician" },
    ];
    jest.spyOn(userAPI, "findAllTechnicians").mockResolvedValueOnce(mockTechs);
    const { result } = renderHook(() => useTechnicianOptions());
    await waitFor(() => {
      expect(result.current.technicianOptions.length).toBe(2);
      expect(result.current.technicianOptions[0].name).toBe("Tech 1");
    });
  });

  //                _               _   _     
  //  ___  __ _  __| |  _ __   __ _| |_| |__  
  // / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
  // \__ \ (_| | (_| | | |_) | (_| | |_| | | |
  // |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
  //                   |_|                     
    it("actualiza el estado con un array vacío si no hay técnicos", async () => {
        jest.spyOn(userAPI, "findAllTechnicians").mockResolvedValueOnce([]);
        const { result } = renderHook(() => useTechnicianOptions());
        await waitFor(() => {
        expect(result.current.technicianOptions.length).toBe(0);
        });
    });
  
  it("maneja errores y no actualiza el estado si la API falla", async () => {
    const error = new Error("API error");
    jest.spyOn(userAPI, "findAllTechnicians").mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useTechnicianOptions());
    await waitFor(() => {
      expect(result.current.technicianOptions.length).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith("Error al cargar técnicos:", error);
    });
    consoleSpy.mockRestore();
  });

   it("retorna un array vacío por defecto", () => {
    const { result } = renderHook(() => useTechnicianOptions());
    expect(Array.isArray(result.current.technicianOptions)).toBe(true);
    expect(result.current.technicianOptions.length).toBe(0);
  });

});
