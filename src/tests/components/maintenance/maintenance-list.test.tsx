import { render, screen, fireEvent } from "@testing-library/react";
import { MaintenanceList } from "@/components/maintenance/maintenance-list";
import "@testing-library/jest-dom";
import { MaintenanceStatus } from "@/interfaces/maintenance";

describe("MaintenanceList", () => {
  const baseMaintenance = [
    {
      id: "1",
      description: "Cambio de disco",
      performedAt: new Date().toISOString(),
      equipment: {
        id: "e1",
        name: "Laptop X",
        model: "2023",
        category: "LAPTOP",
        status: "available",
        user: { id: "u1", name: "Juan", email: "juan@mail.com", roles: [], isActive: true },
      },
      technician: { id: "t1", name: "Pedro", email: "pedro@mail.com", roles: [], isActive: true },
      equipmentId: "e1",
      technicianId: "t1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "completed" as MaintenanceStatus,
    },
  ];

  it("muestra loading cuando loading es true", () => {
    render(
      <MaintenanceList maintenance={baseMaintenance} loading={true} onEdit={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText(/Cargando mantenimientos/i)).toBeInTheDocument();
  });

  it("muestra mensaje vacío si no hay mantenimientos", () => {
    render(
      <MaintenanceList maintenance={[]} loading={false} onEdit={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText(/No hay mantenimientos registrados/i)).toBeInTheDocument();
  });

  it("renderiza los datos del mantenimiento y botones", () => {
    render(
      <MaintenanceList maintenance={baseMaintenance} loading={false} onEdit={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText(/Cambio de disco/i)).toBeInTheDocument();
    expect(screen.getByText(/Laptop X/i)).toBeInTheDocument();
    expect(screen.getByText(/Pedro/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Editar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Eliminar/i })).toBeInTheDocument();
  });

  it("llama onEdit y onDelete al hacer click en los botones", () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    window.confirm = jest.fn(() => true);
    render(
      <MaintenanceList maintenance={baseMaintenance} loading={false} onEdit={onEdit} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByRole("button", { name: /Editar/i }));
    expect(onEdit).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Eliminar/i }));
    expect(onDelete).toHaveBeenCalled();
  });
});
