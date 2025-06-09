import { login, logout, getToken, getUser } from "@/lib/auth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode");

describe("auth utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   

  it("login guarda el token en cookies", () => {
    const spy = jest.spyOn(Cookies, "set");
    login("abc");
    expect(spy).toHaveBeenCalledWith("token", "abc");
  });

  it("logout elimina el token de cookies", () => {
    const spy = jest.spyOn(Cookies, "remove");
    logout();
    expect(spy).toHaveBeenCalledWith("token");
  });

  it("getToken retorna el token de cookies", () => {
    // @ts-ignore
    jest.spyOn(Cookies, "get").mockImplementation(() => "tok");
    expect(getToken()).toBe("tok");
  });

  it("getUser decodifica el token si existe", () => {
    // @ts-ignore
    jest.spyOn(Cookies, "get").mockImplementation(() => "tok");
    const spy = jest.spyOn(require("jwt-decode"), "jwtDecode");
    spy.mockImplementation(() => ({ id: 1, name: "test" }));
    expect(getUser()).toEqual({ id: 1, name: "test" });
    spy.mockRestore();
  });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|     

  it("getUser retorna null si no hay token", () => {
    // @ts-ignore
    jest.spyOn(Cookies, "get").mockImplementation(() => undefined);
    expect(getUser()).toBeNull();
  });

  it("getUser retorna null si jwtDecode lanza error", () => {
    // @ts-ignore
    jest.spyOn(Cookies, "get").mockImplementation(() => "tok");
    const spy = jest.spyOn(require("jwt-decode"), "jwtDecode");
    spy.mockImplementation(() => { throw new Error("fail"); });
    expect(getUser()).toBeNull();
    spy.mockRestore();
  });
});
