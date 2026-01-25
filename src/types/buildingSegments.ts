import type { BuildingType } from "./building";

export type BuildingSegmentKey =
  | "residential"
  | "commercial"
  | "industrial"
  | "government"
  | "education";

export const BUILDING_SEGMENTS: Record<
  BuildingSegmentKey,
  { label: string; buildings: { type: BuildingType; label: string }[] }
> = {
  residential: {
    label: "Residential",
    buildings: [
      { type: "five-floor", label: "Five-Storey House" },
      { type: "nine-floor", label: "Nine-Storey House" },
      { type: "hotel", label: "Hotel" },
    ],
  },

  commercial: {
    label: "Commercial",
    buildings: [
      { type: "supermarket", label: "Supermarket" },
      { type: "restaurant", label: "Restaurant" },
      { type: "cinema", label: "Cinema" },
      { type: "bank", label: "Bank" },
    ],
  },

  industrial: {
    label: "Industrial",
    buildings: [{ type: "factory", label: "Factory" }],
  },

  government: {
    label: "Government",
    buildings: [
      { type: "hospital", label: "Hospital" },
      { type: "police-station", label: "Police Station" },
      { type: "fire-station", label: "Fire Station" },
    ],
  },

  education: {
    label: "Education",
    buildings: [
      { type: "school", label: "School" },
      { type: "university", label: "University" },
    ],
  },
};
