import { renderHook, act ,waitFor } from "@testing-library/react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import '@testing-library/jest-dom';
import api from "@/lib/api";

jest.mock("@/lib/api");

describe("useDashboardData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   
it("inicializa correctamente", () => {
       const { result } = renderHook(() => useDashboardData());
       expect(result.current.loading).toBe(true);
       expect(result.current.data).toBeNull();
   });

  it("carga los datos correctamente", async () => {
    (api.get as jest.Mock)
      .mockResolvedValueOnce({ data: [{ status: "available" }, { status: "rented" }] }) // /equipment
      .mockResolvedValueOnce({ data: [{}, {}] }) // /equipment/rented
      .mockResolvedValueOnce({ data: [{}] }) // /maintenance
      .mockResolvedValueOnce({ data: { roles: ["admin"] } }); // /users/me

    const { result } = renderHook(() => useDashboardData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual({
      equiposDisponibles: 1,
      totalEquipos: 2,
      equiposRentadosPorUsuario: 2,
      equiposEnMantenimiento: 1,
      role: "admin",
      roles: ["admin"],
    });
    expect(result.current.loading).toBe(false);
  });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     
  
  it("maneja error en la carga de datos", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useDashboardData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});