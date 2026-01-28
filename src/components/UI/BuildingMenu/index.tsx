import { useState } from "react";
import "./styles/buildingmenu.css";
import type { BuildingType } from "../../../types/building";
import { BsBuildingFill } from "react-icons/bs";
import type { BuildingSegmentKey } from "../../../types/buildingSegments";
import { BUILDING_SEGMENTS } from "../../../types/buildingSegments";
import { BUILDINGS } from "../../../types/building";
import type { BuildingMenuProps } from "../../../types/ui";

export const BuildingMenu = ({
  selectedBuilding,
  onSelectBuilding,
}: BuildingMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSegment, setActiveSegment] =
    useState<BuildingSegmentKey>("residential");

  const handleSelect = (buildingType: BuildingType) => {
    onSelectBuilding?.(selectedBuilding === buildingType ? null : buildingType);
  };

  return (
    <div className={`building-menu-container ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={() => setIsOpen((v) => !v)}>
        <BsBuildingFill size={36} color="white" />
      </button>

      {isOpen && (
        <div className="building-menu">
          <div className="building-segments">
            {Object.entries(BUILDING_SEGMENTS).map(([key, segment]) => (
              <button
                key={key}
                className={activeSegment === key ? "active" : ""}
                onClick={() => setActiveSegment(key as BuildingSegmentKey)}
              >
                {segment.label}
              </button>
            ))}
          </div>

          {selectedBuilding && (
            <div className="building-info">
              <div className="info-row">
                <span>Cost:</span>
                <span>{BUILDINGS[selectedBuilding].cost} 💰</span>
              </div>

              {BUILDINGS[selectedBuilding].incomePerTick && (
                <div className="info-row">
                  <span>Income:</span>
                  <span>
                    +{BUILDINGS[selectedBuilding].incomePerTick} 💵 / tick
                  </span>
                </div>
              )}

              {BUILDINGS[selectedBuilding].demolishCost && (
                <div className="info-row danger">
                  <span>Demolish:</span>
                  <span>-{BUILDINGS[selectedBuilding].demolishCost} 💣</span>
                </div>
              )}
            </div>
          )}

          <div className="building-buttons">
            {BUILDING_SEGMENTS[activeSegment].buildings.map((b) => (
              <button
                key={b.type}
                className={selectedBuilding === b.type ? "active" : ""}
                onClick={() => handleSelect(b.type)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
