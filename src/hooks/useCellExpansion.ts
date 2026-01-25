import { useMemo } from "react";
import type { CellCoord } from "../types/cell";
import { cellKey } from "../types/cell";

const START_CENTER = { x: 0.5, z: 0.5 };
const MAX_DISTANCE = 8;
const BASE_EXPAND_COST = 50;
const COST_STEP = 5;

export type ExpansionCell = CellCoord & {
  cost: number;
};

export const useCellExpansion = (cells: CellCoord[]) => {
  const canExpandTo = (x: number, z: number) => {
    return (
      Math.abs(x - START_CENTER.x) <= MAX_DISTANCE &&
      Math.abs(z - START_CENTER.z) <= MAX_DISTANCE
    );
  };

  const getExpandCost = (x: number, z: number) => {
    const dx = Math.abs(x - START_CENTER.x);
    const dz = Math.abs(z - START_CENTER.z);

    const distance = Math.max(dx, dz);

    return BASE_EXPAND_COST + Math.floor(distance - 1) * COST_STEP;
  };

  const expansionCells = useMemo<ExpansionCell[]>(() => {
    const owned = new Set(cells.map((c) => cellKey(c.x, c.z)));
    const expansionMap = new Map<string, ExpansionCell>();

    const dirs = [
      { x: 1, z: 0 },
      { x: -1, z: 0 },
      { x: 0, z: 1 },
      { x: 0, z: -1 },
    ];

    cells.forEach(({ x, z }) => {
      dirs.forEach((d) => {
        const nx = x + d.x;
        const nz = z + d.z;
        const key = cellKey(nx, nz);

        if (!owned.has(key) && canExpandTo(nx, nz)) {
          expansionMap.set(key, {
            x: nx,
            z: nz,
            cost: getExpandCost(nx, nz),
          });
        }
      });
    });

    return Array.from(expansionMap.values());
  }, [cells]);

  return {
    expansionCells,
    canExpandTo,
  };
};
