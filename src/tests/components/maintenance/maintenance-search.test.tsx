import { render, screen, fireEvent } from "@testing-library/react";
import { MaintenanceSearch } from "@/components/maintenance/maintenance-search";
import "@testing-library/jest-dom";

describe("MaintenanceSearch", () => {
  it("renderiza el input con el valor y placeholder correctos", () => {
    render(
      <MaintenanceSearch value="test" onChange={jest.fn()} placeholder="Buscar..." />
    );
    const input = screen.getByPlaceholderText("Buscar...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test");
  });

  it("llama onChange al escribir en el input", () => {
    const onChange = jest.fn();
    render(
      <MaintenanceSearch value="" onChange={onChange} />
    );
    const input = screen.getByPlaceholderText("Buscar mantenimiento...");
    fireEvent.change(input, { target: { value: "Mac" } });
    expect(onChange).toHaveBeenCalledWith("Mac");
  });

  it("renderiza correctamente la UI base", () => {
    render(
      <MaintenanceSearch value="" onChange={jest.fn()} />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("pl-10");
  });
});
