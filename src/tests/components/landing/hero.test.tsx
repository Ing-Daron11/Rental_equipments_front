import { render, screen } from "@testing-library/react";
import Hero from "@/components/landing/hero";
import "@testing-library/jest-dom";

describe("Hero", () => {
  it("renderiza el título, subtítulo y botón de equipos", () => {
    render(<Hero isAuthenticated={false} />);
    expect(screen.getByText(/Administra tus equipos/i)).toBeInTheDocument();
    expect(screen.getByText(/AppNest facilita la reserva/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver Equipos Disponibles/i })).toBeInTheDocument();
  });

  it("muestra botón de login si no está autenticado", () => {
    render(<Hero isAuthenticated={false} />);
    expect(screen.getByRole("link", { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it("muestra botón de dashboard si está autenticado", () => {
    render(<Hero isAuthenticated={true} />);
    expect(screen.getByRole("link", { name: /Ir al Dashboard/i })).toBeInTheDocument();
  });
});
