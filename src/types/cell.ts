import type { BuildingType } from "./building";

export type CellCoord = {
  x: number;
  z: number;
};

export type BuiltBuildingsMap = Record<string, BuildingType>;
export const cellKey = (x: number, z: number) => `${x}:${z}`;
