import { render, screen, fireEvent } from "@testing-library/react";
import { EquipmentList } from "@/components/equipment/equipment-list";
import "@testing-library/jest-dom";
import { EquipmentStatus, EquipmentCategory, type Equipment, type EquipmentFilters } from "@/interfaces/equipment";

describe("EquipmentList", () => {
  const baseEquipment: Equipment[] = [
    {
      id: "1",
      name: "MacBook Pro",
      model: "M3",
      description: "Alta gama",
      status: EquipmentStatus.AVAILABLE,
      category: EquipmentCategory.LAPTOP,
      createdAt: new Date().toISOString(),
      location: "Oficina",
      dailyRate: 100,
      imageUrl: "",
    },
    {
      id: "2",
      name: "Dell XPS",
      model: "9320",
      description: "Ultrabook",
      status: EquipmentStatus.RENTED,
      category: EquipmentCategory.LAPTOP,
      createdAt: new Date().toISOString(),
      location: "Bodega",
      dailyRate: 80,
      imageUrl: "",
    },
  ];

  const baseFilters: EquipmentFilters = {
    category: "all",
    status: "all",
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  };

  it("muestra loading cuando loading es true", () => {
    render(
      <EquipmentList
        equipment={baseEquipment}
        filters={baseFilters}
        loading={true}
        onViewDetails={jest.fn()}
      />
    );
    expect(screen.getByText(/Cargando equipos/i)).toBeInTheDocument();
  });

  it("muestra error cuando error está presente", () => {
    render(
      <EquipmentList
        equipment={baseEquipment}
        filters={baseFilters}
        error="Error de red"
        onViewDetails={jest.fn()}
      />
    );
    expect(screen.getAllByText(/Error al cargar equipos/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Error de red/i)).toBeInTheDocument();
  });

//   it("muestra mensaje de vacío si no hay equipos", () => {
//     render(
//       <EquipmentList
//         equipment={[]}
//         filters={baseFilters}
//         onViewDetails={jest.fn()}
//       />
//     );
//     expect(
//     screen.getAllByText((content) => content.includes("No se encontraron equipos")).length
//     ).toBeGreaterThan(0);
//   });

  it("muestra mensaje de vacío si no hay coincidencias con filtros", () => {
    render(
      <EquipmentList
        equipment={baseEquipment}
        filters={{ ...baseFilters, search: "NoExiste" }}
        onViewDetails={jest.fn()}
      />
    );
    expect(
    screen.getAllByText((content) => content.includes("No se encontraron equipos")).length
    ).toBeGreaterThan(0);
  });

  it("muestra la lista de equipos filtrados y ordenados", () => {
    render(
      <EquipmentList
        equipment={baseEquipment}
        filters={baseFilters}
        onViewDetails={jest.fn()}
      />
    );
    expect(screen.getByText("Equipos Disponibles")).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.getByText("Dell XPS")).toBeInTheDocument();
  });

  it("llama onViewDetails al hacer click en un equipo", () => {
    const onViewDetails = jest.fn();
    render(
      <EquipmentList
        equipment={baseEquipment}
        filters={baseFilters}
        onViewDetails={onViewDetails}
      />
    );
    // Simula click en el primer botón de detalles
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(onViewDetails).toHaveBeenCalled();
  });
});
