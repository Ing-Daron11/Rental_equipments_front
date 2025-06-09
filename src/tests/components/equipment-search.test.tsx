import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { EquipmentSearch } from "@/components/equipment/equipment-search";

describe("EquipmentSearch", () => {
  it("renderiza el input con el valor y placeholder correctos", () => {
    render(
      <EquipmentSearch value="test" onChange={jest.fn()} placeholder="Buscar..." />
    );
    const input = screen.getByPlaceholderText("Buscar...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test");
  });

  it("llama onChange al escribir en el input", () => {
    const onChange = jest.fn();
    render(
      <EquipmentSearch value="" onChange={onChange} />
    );
    const input = screen.getByPlaceholderText("Buscar equipos...");
    fireEvent.change(input, { target: { value: "Mac" } });
    expect(onChange).toHaveBeenCalledWith("Mac");
  });

  it("renderiza correctamente la UI base", () => {
    render(
      <EquipmentSearch value="" onChange={jest.fn()} />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("pl-10");
  });
});
