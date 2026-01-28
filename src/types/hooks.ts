import type { BuiltBuildingsMap } from "./cell";
import type { CellCoord } from "./cell";

export type ExpansionCell = CellCoord & {
  cost: number;
};

export type UseBuildingDeleteArgs = {
  builtBuildings: BuiltBuildingsMap;
  setBuiltBuildings: React.Dispatch<React.SetStateAction<BuiltBuildingsMap>>;
  money: number;
  onPay: (amount: number) => void;
};
