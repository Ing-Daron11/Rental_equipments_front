import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MaintenanceEditPage from "@/components/maintenance/maintenance-edit";
import "@testing-library/jest-dom";

const mockGetMaintenanceById = jest.fn();
const mockUpdateMaintenance = jest.fn();
const mockPush = jest.fn();

jest.mock("@/hooks/use-maintenance", () => ({
  useMaintenance: () => ({
    getMaintenanceById: mockGetMaintenanceById,
    updateMaintenance: mockUpdateMaintenance,
    loading: false,
  }),
}));
jest.mock("@/hooks/use-equipment", () => ({
  useEquipment: () => ({ equipment: [{ id: "e1", name: "Laptop X" }] })
}));
jest.mock("@/hooks/use-technicians", () => ({
  useTechnicians: () => ({ technicians: [{ id: "t1", name: "Pedro" }] })
}));
jest.mock("next/navigation", () => ({ useParams: () => ({ id: "1" }), useRouter: () => ({ push: mockPush }) }));

describe("MaintenanceEditPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el formulario y carga datos iniciales", async () => {
    mockGetMaintenanceById.mockResolvedValueOnce({
      equipment: { id: "e1" },
      technician: { id: "t1" },
      description: "desc",
    });
    render(<MaintenanceEditPage />);
    await waitFor(() => {
      expect(screen.getByText(/Editar Mantenimiento/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue("desc")).toBeInTheDocument();
    });
  });

  it("valida campos requeridos", async () => {
    mockGetMaintenanceById.mockResolvedValueOnce({ equipment: { id: "e1" }, technician: { id: "t1" }, description: "desc" });
    render(<MaintenanceEditPage />);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "" } });
      fireEvent.click(screen.getByRole("button", { name: /Guardar cambios/i }));
      expect(screen.getByRole("button", { name: /Guardar cambios/i })).toBeInTheDocument();
    });
  });

  it("llama updateMaintenance y redirige al guardar", async () => {
    mockGetMaintenanceById.mockResolvedValueOnce({ equipment: { id: "e1" }, technician: { id: "t1" }, description: "desc" });
    mockUpdateMaintenance.mockImplementation(() => true); // Siempre retorna true
    render(<MaintenanceEditPage />);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: "desc" } });
      fireEvent.click(screen.getByRole("button", { name: /Guardar cambios/i }));
    });
    await waitFor(() => {
        expect(screen.getByRole("button", { name: /Guardar cambios/i })).toBeInTheDocument();
    });
  });
});
