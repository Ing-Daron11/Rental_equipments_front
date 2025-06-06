import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { EquipmentDetailsModal } from "@/components/equipment/equipment-details-modal";
import { EquipmentStatus, EquipmentCategory } from "@/interfaces/equipment";

const mockEquipment = {
  id: "1",
  name: "MacBook Pro",
  model: "M3",
  description: "Alta gama",
  status: EquipmentStatus.AVAILABLE,
  category: EquipmentCategory.LAPTOP,
  createdAt: new Date().toISOString(),
  location: "Oficina",
  serialNumber: "XYZ123",
  dailyRate: 100,
  imageUrl: "",
};

describe("EquipmentDetailsModal", () => {
  it("no renderiza si isOpen o equipment es null", () => {
    const { container } = render(
      <EquipmentDetailsModal
        equipment={null}
        isOpen={false}
        onClose={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza correctamente el contenido del modal", () => {
    render(
      <EquipmentDetailsModal
        equipment={mockEquipment}
        isOpen={true}
        onClose={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText("Detalles del Equipo")).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.getByText("Alta gama")).toBeInTheDocument();
    expect(screen.getByText("Ubicación: Oficina")).toBeInTheDocument();
    expect(screen.getByText("Serie: XYZ123")).toBeInTheDocument();
  });

  it("llama a onClose al hacer clic en el botón de cerrar", () => {
    const onClose = jest.fn();
    render(
      <EquipmentDetailsModal
        equipment={mockEquipment}
        isOpen={true}
        onClose={onClose}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("llama a onEdit y onDelete correctamente", () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(
      <EquipmentDetailsModal
        equipment={mockEquipment}
        isOpen={true}
        onClose={jest.fn()}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByText("Editar"));
    expect(onEdit).toHaveBeenCalledWith(mockEquipment);
    fireEvent.click(screen.getByText("Eliminar"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });


  it("muestra el ícono y etiqueta de la categoría correctamente", () => {
    render(
      <EquipmentDetailsModal
        equipment={{ ...mockEquipment, category: EquipmentCategory.LAPTOP }}
        isOpen={true}
        onClose={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getAllByText("💻")).toHaveLength(2);
  });

});
