export type BuildingType =
  | "five-floor"
  | "nine-floor"
  | "supermarket"
  | "factory"
  | "hospital"
  | "school"
  | "police-station"
  | "restaurant"
  | "cinema"
  | "bank"
  | "fire-station"
  | "hotel"
  | "university";

export const BUILDINGS: Record<
  BuildingType,
  {
    cost: number;
    floors?: number;
    incomePerTick?: number;
    demolishCost?: number;
  }
> = {
  "five-floor": {
    cost: 10,
    floors: 5,
    demolishCost: 5,
  },

  "nine-floor": {
    cost: 15,
    floors: 9,
    demolishCost: 10,
  },

  supermarket: {
    cost: 15,
    floors: 1,
    incomePerTick: 1,
    demolishCost: 8,
  },

  factory: {
    cost: 20,
    floors: 1,
    incomePerTick: 2,
    demolishCost: 25,
  },

  hospital: {
    cost: 18,
    floors: 3,
    incomePerTick: 1,
    demolishCost: 20,
  },

  school: {
    cost: 15,
    floors: 3,
    demolishCost: 20,
  },

  "police-station": {
    cost: 25,
    floors: 2,
    incomePerTick: 1,
    demolishCost: 30,
  },

  restaurant: {
    cost: 20,
    floors: 1,
    incomePerTick: 3,
    demolishCost: 25,
  },

  cinema: {
    cost: 30,
    floors: 1,
    incomePerTick: 5,
    demolishCost: 40,
  },

  bank: {
    cost: 50,
    floors: 1,
    incomePerTick: 10,
    demolishCost: 80,
  },

  "fire-station": {
    cost: 25,
    floors: 2,
    incomePerTick: 1,
    demolishCost: 30,
  },

  hotel: {
    cost: 20,
    floors: 9,
    incomePerTick: 8,
    demolishCost: 30,
  },

  university: {
    cost: 20,
    floors: 5,
    incomePerTick: 5,
    demolishCost: 30,
  },
};
