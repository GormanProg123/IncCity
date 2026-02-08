import type { BuildingType } from "./building";

export type CellCoord = {
  x: number;
  z: number;
};

export type BuiltBuildingsMap = Record<string, BuildingType>;

export type BuildingRotationsMap = Record<string, number>;

export const cellKey = (x: number, z: number) => `${x}:${z}`;

export const ROTATION_STEPS = [0, 90, 180, 270] as const;
export type RotationStep = (typeof ROTATION_STEPS)[number];
