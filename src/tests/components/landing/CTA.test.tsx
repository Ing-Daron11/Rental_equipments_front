import { render, screen } from "@testing-library/react";
import CTA from "@/components/landing/CTA";
import "@testing-library/jest-dom";

describe("CTA", () => {
  it("renderiza los textos principales y los botones", () => {
    render(<CTA />);
    expect(screen.getByText(/optimizar tu gestión de equipos/i)).toBeInTheDocument();
    expect(screen.getByText(/AppNest/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explorar Equipos/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Comenzar Ahora/i })).toBeInTheDocument();
  });
});
