import { useCallback } from "react";
import type { BuiltBuildingsMap } from "../types/cell";
import { cellKey } from "../types/cell";
import { BUILDINGS } from "../types/building";

type UseBuildingDeleteArgs = {
  builtBuildings: BuiltBuildingsMap;
  setBuiltBuildings: React.Dispatch<React.SetStateAction<BuiltBuildingsMap>>;
  money: number;
  onPay: (amount: number) => void;
};

export const useBuildingDelete = ({
  builtBuildings,
  setBuiltBuildings,
  money,
  onPay,
}: UseBuildingDeleteArgs) => {
  const canDeleteBuilding = useCallback(
    (x: number, z: number) => {
      const key = cellKey(x, z);
      return Boolean(builtBuildings[key]);
    },
    [builtBuildings],
  );

  const deleteBuilding = useCallback(
    (x: number, z: number) => {
      const key = cellKey(x, z);
      const buildingType = builtBuildings[key];

      if (!buildingType) return false;

      const demolishCost = BUILDINGS[buildingType]?.demolishCost ?? 0;

      if (money < demolishCost) {
        alert("Not enough money to demolish!");
        return false;
      }

      onPay(demolishCost);

      setBuiltBuildings((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });

      return true;
    },
    [builtBuildings, money, onPay, setBuiltBuildings],
  );

  return {
    canDeleteBuilding,
    deleteBuilding,
  };
};
