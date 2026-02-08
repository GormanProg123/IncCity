import type { ThreeElements, ThreeEvent } from "@react-three/fiber";

export interface BuildingRendererProps {
  buildingHere: string | null;
  cellSize: number;
  rotationY?: number;
}

export type CellProps = Omit<
  ThreeElements["mesh"],
  "onClick" | "onDoubleClick" | "onPointerDown"
> & {
  size?: number;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  onDoubleClick?: (e: ThreeEvent<MouseEvent>) => void;
  onPointerDown?: (e: ThreeEvent<PointerEvent>) => void;
};

export type GridProps = {
  size?: number;
  color?: string;
  lineWidth?: number;
};
