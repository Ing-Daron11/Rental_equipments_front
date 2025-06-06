import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EquipmentFormModal } from "@/components/equipment/equipment-form-modal";
import {
  EquipmentCategory,
  EquipmentStatus,
  Equipment,
} from "@/interfaces/equipment";

const baseProps = {
  isOpen: true,
  onClose: jest.fn(),
  onSave: jest.fn(),
  equipment: null,
};

describe("EquipmentFormModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente el formulario vacío", () => {
    render(<EquipmentFormModal {...baseProps} />);
    expect(screen.getByText("Crear Nuevo Equipo")).toBeInTheDocument();
    expect(screen.getByText("Nombre *")).toBeInTheDocument();
    expect(screen.getByText("Modelo *")).toBeInTheDocument();
    expect(screen.getByText("Descripción *")).toBeInTheDocument();
  });

  it("llama onClose al presionar botón de cerrar", () => {
    render(<EquipmentFormModal {...baseProps} />);
    const closeBtn = screen.getByRole("button", {
      name: "", // El botón X no tiene texto, solo ícono
    });
    fireEvent.click(closeBtn);
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it("muestra datos iniciales si equipment está presente y isEditing es true", () => {
    const equipmentData: Equipment = {
      id: "1",
      name: "Dell XPS",
      model: "9320",
      description: "Ultrabook",
      status: EquipmentStatus.RENTED,
      category: EquipmentCategory.LAPTOP,
      createdAt: new Date().toISOString(),
      location: "Bodega",
      dailyRate: 50,
      imageUrl: "https://example.com/img.jpg",
    };
    render(
      <EquipmentFormModal
        {...baseProps}
        equipment={equipmentData}
        isEditing={true}
      />
    );
    expect(screen.getByDisplayValue("Dell XPS")).toBeInTheDocument();
    expect(screen.getByDisplayValue("9320")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ultrabook")).toBeInTheDocument();
  });

  it("muestra el título de edición si isEditing es true", () => {
    const equipmentData = {
      id: "1",
      name: "Dell",
      model: "XPS",
      description: "Test",
      category: EquipmentCategory.LAPTOP,
    } as Equipment;
    render(
      <EquipmentFormModal
        {...baseProps}
        equipment={equipmentData}
        isEditing={true}
      />
    );
    expect(screen.getByText("Editar Equipo")).toBeInTheDocument();
  });

  it("llama onSave y onClose al enviar el formulario", async () => {
    render(<EquipmentFormModal {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText("Ej: MacBook Pro 16"), {
      target: { value: "MacBook Air" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ej: MacBook Pro M3 Max"), {
      target: { value: "M2" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Describe las características del equipo..."),
      {
        target: { value: "Liviano y potente" },
      }
    );

    fireEvent.click(screen.getByText("Crear Equipo"));

    expect(baseProps.onSave).toHaveBeenCalled();
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it("muestra texto del botón correcto según modo edición", () => {
    const { rerender } = render(<EquipmentFormModal {...baseProps} />);
    expect(screen.getByText("Crear Equipo")).toBeInTheDocument();

    rerender(<EquipmentFormModal {...baseProps} isEditing={true} />);
    expect(screen.getByText("Guardar Cambios")).toBeInTheDocument();
  });

  it("llama onClose al hacer clic en botón Cancelar", () => {
    render(<EquipmentFormModal {...baseProps} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it("no renderiza nada cuando isOpen es false", () => {
    const { container } = render(
      <EquipmentFormModal {...baseProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

});
