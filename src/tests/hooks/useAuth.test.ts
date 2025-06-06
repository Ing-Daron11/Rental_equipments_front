import { renderHook, waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import '@testing-library/jest-dom';
import { useAuth } from "@/hooks/useAuth";

jest.mock("js-cookie");

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|                    

describe("useAuth", () => {
  it("should return isAuthenticated true if token exists", async () => {
    (Cookies.get as jest.Mock).mockReturnValue("fake-token");
    const { result } = renderHook(() => useAuth());
    // Espera a que el useEffect termine
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.loading).toBe(false);
  });

/**
                _               _   _     
  ___  __ _  __| |  _ __   __ _| |_| |__  
 / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
 \__ \ (_| | (_| | | |_) | (_| | |_| | | |
 |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
                   |_|                    
*/                 
  it("should return isAuthenticated false if token does not exist", async () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);
    const { result } = renderHook(() => useAuth());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});