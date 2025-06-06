import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/loginForm";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import '@testing-library/jest-dom';

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/lib/api");
jest.mock("js-cookie");

describe("LoginForm", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    jest.clearAllMocks();
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|     

  it("renderiza el formulario", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  it("guarda el token y navega al dashboard si el login es exitoso", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (api.post as jest.Mock).mockResolvedValue({ data: { token: "fake-token" } });
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/Correo/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("token", "fake-token");
      expect(push).toHaveBeenCalledWith("/dashboard");
    });
  });


//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|   

  it("muestra error si las credenciales son incorrectas", async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error("Credenciales incorrectas"));
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/Correo/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));
    await waitFor(() => {
      expect(screen.getByText(/Credenciales incorrectas/i)).toBeInTheDocument();
    });
  });

  
});