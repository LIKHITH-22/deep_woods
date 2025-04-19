
export type VehicleType = "petrol" | "diesel" | "ev" | "bicycle" | "publicTransport" | "petrolRickshaw" | "evRickshaw";

export interface VehicleOption {
  id: VehicleType;
  name: string;
  icon: string;
  co2PerKm: number;
  particulates: number;
  nox: number;
}

export const vehicleOptions: VehicleOption[] = [
  {
    id: "petrol",
    name: "Petrol Car",
    icon: "car",
    co2PerKm: 192,
    particulates: 0.015,
    nox: 0.12,
  },
  {
    id: "diesel",
    name: "Diesel Car",
    icon: "car",
    co2PerKm: 171,
    particulates: 0.025,
    nox: 0.30,
  },
  {
    id: "petrolRickshaw",
    name: "Petrol Auto",
    icon: "car-taxi-front",
    co2PerKm: 85, // Lower than cars due to smaller engine
    particulates: 0.012,
    nox: 0.08,
  },
  {
    id: "evRickshaw",
    name: "EV Auto",
    icon: "zap",
    co2PerKm: 25, // Lower emissions due to electric power
    particulates: 0.001,
    nox: 0.001,
  },
  {
    id: "ev",
    name: "Electric Car",
    icon: "zap",
    co2PerKm: 53,
    particulates: 0.001,
    nox: 0.001,
  },
  {
    id: "publicTransport",
    name: "Bus/Metro",
    icon: "bus",
    co2PerKm: 68,
    particulates: 0.003,
    nox: 0.05,
  },
  {
    id: "bicycle",
    name: "Bicycle",
    icon: "bike",
    co2PerKm: 0,
    particulates: 0,
    nox: 0,
  },
];
