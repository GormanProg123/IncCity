import { useEffect } from "react";
import type { BuiltBuildingsMap } from "../types/cell";
import { BUILDINGS } from "../types/building";

const INCOME_TICK_MS = 2000;

export const useIncome = (
  builtBuildings: BuiltBuildingsMap,
  onIncome: (income: number) => void,
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      let income = 0;

      Object.values(builtBuildings).forEach((b) => {
        income += BUILDINGS[b]?.incomePerTick ?? 0;
      });

      if (income > 0) {
        onIncome(income);
      }
    }, INCOME_TICK_MS);

    return () => clearInterval(interval);
  }, [builtBuildings, onIncome]);
};
