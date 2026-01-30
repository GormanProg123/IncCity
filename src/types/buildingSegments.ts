import type { BuildingType } from "./building";

export type BuildingSegmentKey =
  | "residential"
  | "commercial"
  | "industrial"
  | "government"
  | "education";

export const BUILDING_SEGMENTS: Record<
  BuildingSegmentKey,
  {
    labelKey: string;
    buildings: { type: BuildingType; labelKey: string }[];
  }
> = {
  residential: {
    labelKey: "segment.residential",
    buildings: [
      { type: "five-floor", labelKey: "buildings.five-floor" },
      { type: "nine-floor", labelKey: "buildings.nine-floor" },
      { type: "hotel", labelKey: "buildings.hotel" },
    ],
  },

  commercial: {
    labelKey: "segment.commercial",
    buildings: [
      { type: "supermarket", labelKey: "buildings.supermarket" },
      { type: "restaurant", labelKey: "buildings.restaurant" },
      { type: "cinema", labelKey: "buildings.cinema" },
      { type: "bank", labelKey: "buildings.bank" },
    ],
  },

  industrial: {
    labelKey: "segment.industrial",
    buildings: [{ type: "factory", labelKey: "buildings.factory" }],
  },

  government: {
    labelKey: "segment.government",
    buildings: [
      { type: "hospital", labelKey: "buildings.hospital" },
      { type: "police-station", labelKey: "buildings.police-station" },
      { type: "fire-station", labelKey: "buildings.fire-station" },
    ],
  },

  education: {
    labelKey: "segment.education",
    buildings: [
      { type: "school", labelKey: "buildings.school" },
      { type: "university", labelKey: "buildings.university" },
    ],
  },
};
