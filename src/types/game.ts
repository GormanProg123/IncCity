import type { ThreeElements, ThreeEvent } from "@react-three/fiber";

export interface BuildingRendererProps {
  buildingHere: string | null;
  cellSize: number;
}

export type CellProps = Omit<ThreeElements["mesh"], "onClick"> & {
  size?: number;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
};

export type GridProps = {
  size?: number;
  color?: string;
  lineWidth?: number;
};
