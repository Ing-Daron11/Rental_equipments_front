import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import DashboardPage from "@/app/dashboard/page";
import * as useAuthModule from "@/hooks/useAuth";
import * as useDashboardDataModule from "@/hooks/use-dashboard-data";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/dashboard"),
}));

// Mock useAuth y useDashboardData
jest.mock("@/hooks/useAuth");
jest.mock("@/hooks/use-dashboard-data");

describe("DashboardPage", () => {
  beforeEach(() => {
    (useAuthModule.useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|             

  it("muestra el mensaje de carga", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({ loading: true, data: null });
    render(<DashboardPage />);
    expect(screen.getByText(/Cargando datos/i)).toBeInTheDocument();
  });

  it("muestra el mensaje de carga si data es null", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
    });
    render(<DashboardPage />);
    expect(screen.getByText(/Cargando datos/i)).toBeInTheDocument();
  });

  it("muestra la card de mantenimiento solo para technical", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        totalEquipos: 10,
        equiposDisponibles: 5,
        equiposRentadosPorUsuario: 2,
        equiposEnMantenimiento: 1,
        roles: ["technical"],
      },
    });
    render(<DashboardPage />);
    expect(screen.getByTestId("mantenimiento-title")).toBeInTheDocument();
  });

  it("muestra las cards y el título", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        totalEquipos: 10,
        equiposDisponibles: 5,
        equiposRentadosPorUsuario: 2,
        equiposEnMantenimiento: 1,
        roles: ["admin"],
      },
    });
    render(<DashboardPage />);
    const dashboards = screen.getAllByText("Dashboard");
    expect(dashboards.length).toBeGreaterThan(0);
    expect(screen.getByTestId("equipos-title")).toBeInTheDocument();
    expect(screen.getByTestId("equipos-rentados-title")).toBeInTheDocument();
    expect(screen.getByTestId("mantenimiento-title")).toBeInTheDocument();
  });

    it("muestra el título Dashboard", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        totalEquipos: 10,
        equiposDisponibles: 5,
        equiposRentadosPorUsuario: 2,
        equiposEnMantenimiento: 1,
        roles: ["admin"],
      },
    });
    render(<DashboardPage />);
    const dashboards = screen.getAllByText("Dashboard");
    expect(dashboards.length).toBeGreaterThan(0);
  });

  it("si muestra la card de 'Tus Equipos Rentados' a cualquier usuario", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        totalEquipos: 10,
        equiposDisponibles: 5,
        equiposRentadosPorUsuario: 2,
        equiposEnMantenimiento: 1,
        roles: ["user"],
      },
    });
    render(<DashboardPage />);
    expect(screen.getByTestId("equipos-rentados-title")).toBeInTheDocument();
  });

    it("muestra la card de 'Equipos' a cualquier usuario", () => {
        (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
        loading: false,
        data: {
            totalEquipos: 10,
            equiposDisponibles: 5,
            equiposRentadosPorUsuario: 2,
            equiposEnMantenimiento: 1,
            roles: ["user"],
        },
        });
        render(<DashboardPage />);
        expect(screen.getByTestId("equipos-title")).toBeInTheDocument();
    });

    it("muestra la card de mantenimiento si el usuario es admin o technical", () => {
        (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
        loading: false,
        data: {
            totalEquipos: 10,
            equiposDisponibles: 5,
            equiposRentadosPorUsuario: 2,
            equiposEnMantenimiento: 1,
            roles: ["admin"],
        },
        });
        render(<DashboardPage />);
        expect(screen.getByTestId("mantenimiento-title")).toBeInTheDocument();
    });

it("navega a /equipment al hacer click en el botón de detalles de Equipos", () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });
  (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
    loading: false,
    data: {
      totalEquipos: 10,
      equiposDisponibles: 5,
      equiposRentadosPorUsuario: 2,
      equiposEnMantenimiento: 1,
      roles: ["admin"],
    },
  });
  render(<DashboardPage />);
  fireEvent.click(screen.getByTestId("equipos-button"));
  expect(push).toHaveBeenCalledWith("/equipment");
});

it("navega a /reservas al hacer click en el botón de detalles de Tus Equipos Rentados", () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });
  (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
    loading: false,
    data: {
      totalEquipos: 10,
      equiposDisponibles: 5,
      equiposRentadosPorUsuario: 2,
      equiposEnMantenimiento: 1,
      roles: ["admin"],
    },
  });
  render(<DashboardPage />);
  fireEvent.click(screen.getByTestId("equipos-rentados-button"));
  expect(push).toHaveBeenCalledWith("/reservas");
});

it("navega a /maintenance al hacer click en el botón de detalles de Mantenimiento", () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });
  (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
    loading: false,
    data: {
      totalEquipos: 10,
      equiposDisponibles: 5,
      equiposRentadosPorUsuario: 2,
      equiposEnMantenimiento: 1,
      roles: ["admin"],
    },
  });
  render(<DashboardPage />);
  fireEvent.click(screen.getByTestId("mantenimiento-button"));
  expect(push).toHaveBeenCalledWith("/maintenance");
});

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|          


  it("no muestra la card de mantenimiento si el usuario no es admin ni technical", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        totalEquipos: 10,
        equiposDisponibles: 5,
        equiposRentadosPorUsuario: 2,
        equiposEnMantenimiento: 1,
        roles: ["user"],
      },
    });
    render(<DashboardPage />);
    expect(
        screen.queryAllByRole("heading", { name: "Mantenimiento" })
            .filter((el) => el.textContent === "Mantenimiento").length
    ).toBe(0);
  });

  it("NO muestra la card de mantenimiento para user", () => {
    (useDashboardDataModule.useDashboardData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        totalEquipos: 10,
        equiposDisponibles: 5,
        equiposRentadosPorUsuario: 2,
        equiposEnMantenimiento: 1,
        roles: ["user"],
      },
    });
    render(<DashboardPage />);
    expect(screen.queryByTestId("mantenimiento-title")).not.toBeInTheDocument();
  });

});