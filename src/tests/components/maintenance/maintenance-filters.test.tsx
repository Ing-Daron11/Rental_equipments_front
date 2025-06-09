import { render, screen, fireEvent } from "@testing-library/react";
import { MaintenanceFiltersComponent } from "@/components/maintenance/maintenance-filters";
import "@testing-library/jest-dom";

describe("MaintenanceFiltersComponent", () => {
  it("renderiza el texto y el botón de limpiar", () => {
    const onClearFilters = jest.fn();
    render(
      <MaintenanceFiltersComponent filters={{}} onFiltersChange={jest.fn()} onClearFilters={onClearFilters} />
    );
    expect(screen.getByText(/Filtros de mantenimiento/i)).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: /Limpiar filtros/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClearFilters).toHaveBeenCalled();
  });
});
