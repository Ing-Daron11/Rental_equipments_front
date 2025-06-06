import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { EquipmentCard } from "@/components/equipment/equipment-card";
import { EquipmentStatus } from "@/interfaces/equipment";

import { EquipmentCategory } from "@/interfaces/equipment";

const baseEquipment = {
  id: "1",
  name: "Laptop HP",
  model: "EliteBook",
  description: "Una laptop potente",
  category: EquipmentCategory.LAPTOP,
  status: EquipmentStatus.AVAILABLE,
  imageUrl: "",
  location: "Oficina",
  createdAt: new Date().toISOString(),
  dailyRate: 100,
};

//  _   _                                       _   _     
// | | | | __ _ _ __  _ __  _   _   _ __   __ _| |_| |__  
// | |_| |/ _` | '_ \| '_ \| | | | | '_ \ / _` | __| '_ \ 
// |  _  | (_| | |_) | |_) | |_| | | |_) | (_| | |_| | | |
// |_| |_|\__,_| .__/| .__/ \__, | | .__/ \__,_|\__|_| |_|
//             |_|   |_|    |___/  |_|   

describe("EquipmentCard", () => {
  it("renderiza el nombre, modelo y descripción", () => {
    render(
      <EquipmentCard
        equipment={baseEquipment}
        onViewDetails={jest.fn()}
      />
    );
    expect(screen.getByText("Laptop HP")).toBeInTheDocument();
    expect(screen.getByText("EliteBook")).toBeInTheDocument();
    expect(screen.getByText("Una laptop potente")).toBeInTheDocument();
  });

  it("llama a onViewDetails al hacer click en Ver detalles", () => {
    const onViewDetails = jest.fn();
    render(
      <EquipmentCard
        equipment={baseEquipment}
        onViewDetails={onViewDetails}
      />
    );
    fireEvent.click(screen.getByText(/Ver detalles/i));
    expect(onViewDetails).toHaveBeenCalledWith("1");
  });

  it("llama a onRent solo si está disponible", () => {
    const onRent = jest.fn();
    render(
      <EquipmentCard
        equipment={baseEquipment}
        onViewDetails={jest.fn()}
        onRent={onRent}
      />
    );
    fireEvent.click(screen.getByText(/Alquilar/i));
    expect(onRent).toHaveBeenCalledWith("1");
  });

//                _               _   _     
//  ___  __ _  __| |  _ __   __ _| |_| |__  
// / __|/ _` |/ _` | | '_ \ / _` | __| '_ \ 
// \__ \ (_| | (_| | | |_) | (_| | |_| | | |
// |___/\__,_|\__,_| | .__/ \__,_|\__|_| |_|
//                   |_|       

  it("no llama a onRent si el equipo no está disponible", () => {
    const onRent = jest.fn();
    render(
      <EquipmentCard
        equipment={{ ...baseEquipment, status: EquipmentStatus.RENTED }}
        onViewDetails={jest.fn()}
        onRent={onRent}
      />
    );
    fireEvent.click(screen.getByText(/No disponible/i));
    expect(onRent).not.toHaveBeenCalled();
  });

  it("no muestra acciones si showActions es false", () => {
    render(
      <EquipmentCard
        equipment={baseEquipment}
        onViewDetails={jest.fn()}
        showActions={false}
      />
    );
    expect(screen.queryByText(/Ver detalles/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Alquilar/i)).not.toBeInTheDocument();
  });
});