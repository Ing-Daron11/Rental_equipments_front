import { renderHook, waitFor } from "@testing-library/react";
import * as authModule from "@/lib/auth";

const mockTechs = [
  { id: "1", name: "Tech 1", email: "t1@mail.com", roles: ["technical"], isActive: true },
  { id: "2", name: "Tech 2", email: "t2@mail.com", roles: ["other"], isActive: true },
];

// Ensure fetch is typed as a Jest mock for proper type inference
// @ts-ignore
if (!global.fetch) global.fetch = jest.fn();
const fetchMock = global.fetch as jest.Mock;

describe("useTechnicians", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   
  it("retorna técnicos filtrados correctamente", async () => {
    jest.spyOn(authModule, "getToken").mockReturnValue("token");
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTechs,
      status: 200,
      statusText: "OK",
    });
    const { result } = renderHook(() => require("@/hooks/use-technicians").useTechnicians());
    await waitFor(() => {
      expect(result.current.technicians.length).toBe(1);
      expect(result.current.technicians[0].name).toBe("Tech 1");
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|

  it("retorna error si la API responde con error", async () => {
    jest.spyOn(authModule, "getToken").mockReturnValue("token");
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });
    const { result } = renderHook(() => require("@/hooks/use-technicians").useTechnicians());
    await waitFor(() => {
      expect(result.current.error).toMatch("Error al cargar técnicos");
      expect(result.current.loading).toBe(false);
      expect(result.current.technicians.length).toBe(0);
    });
  });

  it("retorna error si fetch lanza excepción", async () => {
    jest.spyOn(authModule, "getToken").mockReturnValue("token");
    fetchMock.mockRejectedValueOnce(new Error("fail"));
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => require("@/hooks/use-technicians").useTechnicians());
    await waitFor(() => {
      expect(result.current.error).toBe("Error al cargar técnicos");
      expect(result.current.loading).toBe(false);
      expect(result.current.technicians.length).toBe(0);
      expect(consoleSpy).toHaveBeenCalled();
    });
    consoleSpy.mockRestore();
  });
});
