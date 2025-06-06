import { renderHook, act, waitFor } from "@testing-library/react";
import { useReservations } from "@/hooks/use-reservations";
import { reservationsAPI } from "@/lib/api/reservations";

jest.mock("@/lib/api/reservations");

describe("useReservations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (reservationsAPI.findAll as jest.Mock).mockResolvedValue([]);
  });
//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   
  it("inicializa correctamente", () => {
        const { result } = renderHook(() => useReservations());
        expect(result.current.loading).toBe(true);
        expect(result.current.reservations).toEqual([]);
        expect(result.current.error).toBe("");
  });

  it("carga las reservas correctamente", async () => {
    (reservationsAPI.findAll as jest.Mock).mockResolvedValue([
      { id: "1", createdAt: "2024-01-01", name: "Equipo 1", model: "A", description: "desc", category: "cat", status: "rented" },
    ]);
    const { result } = renderHook(() => useReservations());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.reservations.length).toBe(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     

    it("carga reservas vacías si no hay datos", async () => {
        (reservationsAPI.findAll as jest.Mock).mockResolvedValue([]);
        const { result } = renderHook(() => useReservations());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.reservations.length).toBe(0);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("");
    });

  it("maneja error al cargar reservas", async () => {
    (reservationsAPI.findAll as jest.Mock).mockRejectedValue(new Error("API error"));
    const { result } = renderHook(() => useReservations());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.reservations.length).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Error al cargar reservas");
  });
});