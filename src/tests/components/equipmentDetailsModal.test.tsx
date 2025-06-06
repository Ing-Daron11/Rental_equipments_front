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
  createdAt: new Date("2025-06-06").toISOString(),
  location: "Oficina",
  serialNumber: "XYZ123",
  dailyRate: 100,
  imageUrl: "",
};

describe("EquipmentDetailsModal", () => {
  const defaultProps = {
    equipment: mockEquipment,
    isOpen: true,
    onClose: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =======================================================
  // ==================== SAD PATH TESTS ===================
  // =======================================================
  // Tests that verify error handling and edge cases

  it("no renderiza si isOpen o equipment es null", () => {
    const { container } = render(
      <EquipmentDetailsModal
        {...defaultProps}
        equipment={null}
        isOpen={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("no muestra modal si isOpen es false", () => {
    const { container } = render(
      <EquipmentDetailsModal {...defaultProps} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("no muestra modal si equipment es null", () => {
    const { container } = render(
      <EquipmentDetailsModal {...defaultProps} equipment={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("no rompe si falta imageUrl", () => {
    const equipment = { ...mockEquipment, imageUrl: undefined };
    expect(() =>
      render(<EquipmentDetailsModal {...defaultProps} equipment={equipment} />)
    ).not.toThrow();
  });


  it("permite múltiples renderizados sin errores", () => {
    expect(() => {
      render(<EquipmentDetailsModal {...defaultProps} />);
      render(<EquipmentDetailsModal {...defaultProps} />);
    }).not.toThrow();
  });

  // =======================================================
  // =================== HAPPY PATH TESTS ==================
  // =======================================================
  // Tests that verify component works correctly under normal conditions

  it("renderiza correctamente el contenido del modal", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Detalles del Equipo")).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.getByText("Alta gama")).toBeInTheDocument();
    expect(screen.getByText("Ubicación: Oficina")).toBeInTheDocument();
    expect(screen.getByText("Serie: XYZ123")).toBeInTheDocument();
  });

  it("llama a onClose al hacer clic en el botón de cerrar", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    const closeBtn = screen.getAllByRole("button")[0];
    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("llama a onEdit y onDelete correctamente", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Editar"));
    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockEquipment);
    fireEvent.click(screen.getByText("Eliminar"));
    expect(defaultProps.onDelete).toHaveBeenCalledWith("1");
  });

  it("muestra el ícono y etiqueta de la categoría correctamente", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getAllByText("💻")).toHaveLength(2);
  });

  it("muestra fallback visual cuando no hay imagen", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Sin imagen disponible")).toBeInTheDocument();
  });

  it("muestra correctamente el precio por día", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("por día")).toBeInTheDocument();
  });

  it("renderiza correctamente la fecha de creación", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText(/Creado:/)).toBeInTheDocument();
  });

  it("muestra el modelo si está presente", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("M3")).toBeInTheDocument();
  });

  it("muestra correctamente la ubicación si está presente", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Ubicación: Oficina")).toBeInTheDocument();
  });

  it("muestra correctamente la serie si está presente", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Serie: XYZ123")).toBeInTheDocument();
  });

  it("renderiza botones Editar y Eliminar", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("renderiza correctamente el color verde para estado disponible", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    // Encontramos el status dot dentro del elemento padre de "Disponible"
    const parentElement = screen.getByText("Disponible").parentElement;
    const greenDot = parentElement?.querySelector(".w-2.h-2.rounded-full");
    expect(greenDot).toHaveClass("bg-green-500");
  });

  it("renderiza correctamente íconos SVG adicionales", () => {
    const { container } = render(<EquipmentDetailsModal {...defaultProps} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(1);
  });

  it("mantiene accesibilidad con etiquetas visibles", () => {
    render(<EquipmentDetailsModal {...defaultProps} />);
    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Información adicional")).toBeInTheDocument();
  });
});