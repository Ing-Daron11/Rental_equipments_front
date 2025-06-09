import { render, screen } from "@testing-library/react";
import Footer from "@/components/landing/Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("renderiza el logo, textos y enlaces principales", () => {
    render(<Footer />);
    expect(screen.getByText(/Plataforma moderna/i)).toBeInTheDocument();
    expect(screen.getByText(/Navegación/i)).toBeInTheDocument();
    expect(screen.getByText(/Cuenta/i)).toBeInTheDocument();
    expect(screen.getByText(/AppNest. Todos los derechos reservados/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Equipos/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Reservas/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Mantenimiento/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Registrarse/i })).toBeInTheDocument();
  });
});
