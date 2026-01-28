import type { ThreeElements } from "@react-three/fiber";

export type FiveFloorHouseProps = ThreeElements["mesh"] & {
  floors?: number;
  cellSize?: number;
};

export type NineFloorHouseProps = ThreeElements["mesh"] & {
  floors?: number;
  cellSize?: number;
};

export type HotelProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export type FactoryProps = ThreeElements["mesh"] & {
  cellSize?: number;
};

export type SuperMarketProps = ThreeElements["mesh"] & {
  cellSize?: number;
};

export type HospitalProps = ThreeElements["group"] & {
  cellSize?: number;
  floors?: number;
};

export type SchoolProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export type UniversityProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export type PoliceStationProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};

export type RestaurantProps = ThreeElements["group"] & {
  cellSize?: number;
};

export type CinemaProps = ThreeElements["group"] & {
  cellSize?: number;
};

export type BankProps = ThreeElements["group"] & {
  cellSize?: number;
};

export type FireStationProps = ThreeElements["group"] & {
  floors?: number;
  cellSize?: number;
};
