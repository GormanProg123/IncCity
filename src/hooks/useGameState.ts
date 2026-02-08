import { useState, useEffect } from "react";
import type {
  CellCoord,
  BuiltBuildingsMap,
  BuildingRotationsMap,
} from "../types/cell";
import { cellKey } from "../types/cell";
import type { BuildingType } from "../types/building";
import { BUILDINGS } from "../types/building";
import { useTranslation } from "react-i18next";

const INITIAL_MONEY = 100;

const INITIAL_CELLS: CellCoord[] = [
  { x: 0, z: 0 },
  { x: 1, z: 0 },
  { x: 0, z: 1 },
  { x: 1, z: 1 },
];

export type SelectedCell = { x: number; z: number } | null;

export const useGameState = () => {
  const { t } = useTranslation();
  const [money, setMoney] = useState<number>(() => {
    const saved = localStorage.getItem("money");
    return saved ? Number(saved) : 100;
  });

  const [cells, setCells] = useState<CellCoord[]>(() => {
    const saved = localStorage.getItem("cells");
    return saved ? JSON.parse(saved) : INITIAL_CELLS;
  });

  const [builtBuildings, setBuiltBuildings] = useState<BuiltBuildingsMap>(
    () => {
      const saved = localStorage.getItem("builtBuildings");
      return saved ? JSON.parse(saved) : {};
    },
  );

  const [buildingRotations, setBuildingRotations] =
    useState<BuildingRotationsMap>(() => {
      const saved = localStorage.getItem("buildingRotations");
      return saved ? JSON.parse(saved) : {};
    });

  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null);

  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null,
  );

  const rotateBuildingAt = (x: number, z: number) => {
    const key = cellKey(x, z);
    if (!builtBuildings[key]) return;
    const current = buildingRotations[key] ?? 0;
    const next = (current + 90) % 360;
    setBuildingRotations((prev) => ({
      ...prev,
      [key]: next as 0 | 90 | 180 | 270,
    }));
  };

  const setBuildingRotation = (x: number, z: number, degrees: number) => {
    const key = cellKey(x, z);
    if (!builtBuildings[key]) return;
    const normalized = ((degrees % 360) + 360) % 360;
    setBuildingRotations((prev) => ({
      ...prev,
      [key]: normalized,
    }));
  };

  const snapBuildingRotationAt = (x: number, z: number) => {
    const key = cellKey(x, z);
    if (!builtBuildings[key]) return;
    const current = buildingRotations[key] ?? 0;
    const snapped = Math.round(current / 90) * 90;
    const normalized = snapped % 360;
    setBuildingRotations((prev) => ({
      ...prev,
      [key]: normalized as 0 | 90 | 180 | 270,
    }));
  };

  useEffect(() => {
    localStorage.setItem("money", money.toString());
    localStorage.setItem("cells", JSON.stringify(cells));
    localStorage.setItem("builtBuildings", JSON.stringify(builtBuildings));
    localStorage.setItem(
      "buildingRotations",
      JSON.stringify(buildingRotations),
    );
  }, [money, cells, builtBuildings, buildingRotations]);

  const buyBuilding = (x: number, z: number, buildingType: BuildingType) => {
    const key = cellKey(x, z);
    if (builtBuildings[key]) return false;

    const cost = BUILDINGS[buildingType].cost;
    if (money < cost) {
      alert(t("gameOver.money"));
      return false;
    }

    setMoney((prev) => prev - cost);
    setBuiltBuildings((prev) => ({
      ...prev,
      [key]: buildingType,
    }));

    return true;
  };

  const expandCell = (x: number, z: number, expandCost: number) => {
    if (money < expandCost) {
      alert(t("gameOver.money"));
      return false;
    }

    setMoney((prev) => prev - expandCost);
    setCells((prev) => [...prev, { x, z }]);

    return true;
  };

  const clearAllBuildings = () => {
    setBuiltBuildings({});
    setBuildingRotations({});
    setSelectedCell(null);
  };

  const resetCells = () => {
    setCells(INITIAL_CELLS);
  };

  const resetGame = () => {
    localStorage.removeItem("money");
    localStorage.removeItem("cells");
    localStorage.removeItem("builtBuildings");
    localStorage.removeItem("buildingRotations");

    setMoney(INITIAL_MONEY);
    setCells(INITIAL_CELLS);
    setBuiltBuildings({});
    setBuildingRotations({});
    setSelectedCell(null);
    setSelectedBuilding(null);
  };

  useEffect(() => {
    localStorage.setItem("money", money.toString());
    localStorage.setItem("cells", JSON.stringify(cells));
    localStorage.setItem("builtBuildings", JSON.stringify(builtBuildings));

    if (money < 0) {
      const confirmed = window.confirm(t("gameOver.restart"));
      if (confirmed) {
        setTimeout(() => {
          resetGame();
        }, 0);
      }
    }
  }, [money, cells, builtBuildings]);

  return {
    money,
    setMoney,
    cells,
    setCells,
    builtBuildings,
    setBuiltBuildings,
    buildingRotations,
    selectedCell,
    setSelectedCell,
    rotateBuildingAt,
    setBuildingRotation,
    snapBuildingRotationAt,
    selectedBuilding,
    setSelectedBuilding,
    buyBuilding,
    expandCell,
    clearAllBuildings,
    resetCells,
    resetGame,
  };
};
