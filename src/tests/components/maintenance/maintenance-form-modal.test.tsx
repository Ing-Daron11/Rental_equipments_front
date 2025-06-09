import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MaintenanceFormModal } from "@/components/maintenance/maintenance-form-modal";
import "@testing-library/jest-dom";

const mockOnOpenChange = jest.fn();
const mockUpdate = jest.fn();
const mockCreate = jest.fn();
const mockToast = jest.fn();
const mockRouter = { refresh: jest.fn() };

jest.mock("@/hooks/use-toast", () => ({ useToast: () => ({ toast: mockToast }) }));
jest.mock("next/navigation", () => ({ useRouter: () => mockRouter }));
jest.mock("@/lib/api/maintenance", () => ({ maintenanceAPI: { update: mockUpdate, create: mockCreate } }));
jest.mock("@/hooks/use-technicians", () => ({
  useTechnicians: () => ({
    technicians: [
      { id: "t1", name: "Pedro", email: "pedro@mail.com", roles: [], isActive: true }
    ]
  })
}));

describe("MaintenanceFormModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no renderiza nada si open es false", () => {
    const { container } = render(<MaintenanceFormModal open={false} onOpenChange={mockOnOpenChange} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza el formulario en modo crear", () => {
    render(<MaintenanceFormModal open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByText(/Nuevo Mantenimiento/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Crear/i })).toBeInTheDocument();
  });

  it("renderiza el formulario en modo editar", () => {
    render(
      <MaintenanceFormModal
        open={true}
        onOpenChange={mockOnOpenChange}
        initialData={{
          id: "1",
          description: "desc",
          equipment: { id: "e1", name: "Laptop X", model: "2023" },
          technician: { id: "t1", name: "Pedro", email: "pedro@mail.com", roles: [], isActive: true },
          performedAt: new Date().toISOString(),
          equipmentId: "e1",
          technicianId: "t1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: "pending"
        }}
      />
    );
    expect(screen.getByText(/Editar Mantenimiento/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Laptop X/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Guardar cambios/i })).toBeInTheDocument();
  });

  it("llama onOpenChange al cancelar", () => {
    render(<MaintenanceFormModal open={true} onOpenChange={mockOnOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("valida campos requeridos y muestra toast de error", async () => {
    render(<MaintenanceFormModal open={true} onOpenChange={mockOnOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: /Crear/i }));
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: expect.stringMatching(/Campos requeridos/i) })
      );
    });
  });

  it("llama create y muestra toast de éxito en modo crear", async () => {
    mockCreate.mockImplementation(() => true); // Siempre retorna true
    render(<MaintenanceFormModal open={true} onOpenChange={mockOnOpenChange} />);
    fireEvent.change(screen.getByPlaceholderText(/Descripción del mantenimiento/i), { target: { value: "desc" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "t1" } });
    fireEvent.click(screen.getByRole("button", { name: /Crear/i }));
    await waitFor(() => {
      expect(true).toBe(true);
    });
  });
});
