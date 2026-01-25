import { useState, useEffect } from "react";
import type { CellCoord, BuiltBuildingsMap } from "../types/cell";
import { cellKey } from "../types/cell";
import type { BuildingType } from "../types/building";
import { BUILDINGS } from "../types/building";

const INITIAL_MONEY = 100;

const INITIAL_CELLS: CellCoord[] = [
  { x: 0, z: 0 },
  { x: 1, z: 0 },
  { x: 0, z: 1 },
  { x: 1, z: 1 },
];

export const useGameState = () => {
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

  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null,
  );

  useEffect(() => {
    localStorage.setItem("money", money.toString());
    localStorage.setItem("cells", JSON.stringify(cells));
    localStorage.setItem("builtBuildings", JSON.stringify(builtBuildings));
  }, [money, cells, builtBuildings]);

  const buyBuilding = (x: number, z: number, buildingType: BuildingType) => {
    const key = cellKey(x, z);
    if (builtBuildings[key]) return false;

    const cost = BUILDINGS[buildingType].cost;
    if (money < cost) {
      alert("Not enough money!");
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
      alert("Not enough money!");
      return false;
    }

    setMoney((prev) => prev - expandCost);
    setCells((prev) => [...prev, { x, z }]);

    return true;
  };

  const clearAllBuildings = () => {
    setBuiltBuildings({});
  };

  const resetCells = () => {
    setCells(INITIAL_CELLS);
  };

  const resetGame = () => {
    localStorage.removeItem("money");
    localStorage.removeItem("cells");
    localStorage.removeItem("builtBuildings");

    setMoney(INITIAL_MONEY);
    setCells(INITIAL_CELLS);
    setBuiltBuildings({});
    setSelectedBuilding(null);
  };

  useEffect(() => {
    localStorage.setItem("money", money.toString());
    localStorage.setItem("cells", JSON.stringify(cells));
    localStorage.setItem("builtBuildings", JSON.stringify(builtBuildings));

    if (money < 0) {
      const confirmed = window.confirm(
        "Your money has dropped below 0! Game will restart.",
      );
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
    selectedBuilding,
    setSelectedBuilding,
    buyBuilding,
    expandCell,
    clearAllBuildings,
    resetCells,
    resetGame,
  };
};
