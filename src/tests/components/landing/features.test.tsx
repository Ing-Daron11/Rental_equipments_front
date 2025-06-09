import { render, screen } from "@testing-library/react";
import Features from "@/components/landing/features";
import "@testing-library/jest-dom";

describe("Features", () => {
  it("renderiza el título, subtítulo y todas las features", () => {
    render(<Features />);
    expect(screen.getByText(/¿Por qué elegir AppNest/i)).toBeInTheDocument();
    expect(screen.getByText(/optimizar la gestión de equipos/i)).toBeInTheDocument();
    // Verifica que existan los títulos de features
    expect(screen.getByText(/Fácil de usar/i)).toBeInTheDocument();
    expect(screen.getByText(/100% Responsivo/i)).toBeInTheDocument();
    expect(screen.getByText(/Seguro/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestión de reservas/i)).toBeInTheDocument();
    expect(screen.getByText(/Mantenimiento/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-usuario/i)).toBeInTheDocument();
  });
});
