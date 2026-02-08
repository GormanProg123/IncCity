import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
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
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSegment, setActiveSegment] =
    useState<BuildingSegmentKey>("residential");

  const handleSelect = (buildingType: BuildingType) => {
    onSelectBuilding?.(selectedBuilding === buildingType ? null : buildingType);
  };

  const overlayContent = isOpen && (
    <div className="building-menu-overlay open">
      <div
        className="building-menu-backdrop"
        onClick={() => setIsOpen(false)}
        aria-hidden
      />
      <div className="building-menu">
        <div className="building-segments">
          {Object.entries(BUILDING_SEGMENTS).map(([key, segment]) => (
            <button
              key={key}
              className={activeSegment === key ? "active" : ""}
              onClick={() => setActiveSegment(key as BuildingSegmentKey)}
            >
              {t(segment.labelKey)}
            </button>
          ))}
        </div>

        {selectedBuilding && (
          <div className="building-info">
            <div className="info-row">
              <span>{t("building.cost")}:</span>
              <span>{BUILDINGS[selectedBuilding].cost} 💰</span>
            </div>

            {BUILDINGS[selectedBuilding].incomePerTick && (
              <div className="info-row">
                <span>{t("building.income")}:</span>
                <span>
                  +{BUILDINGS[selectedBuilding].incomePerTick} 💵 /{" "}
                  {t("building.tick")}
                </span>
              </div>
            )}

            {BUILDINGS[selectedBuilding].demolishCost && (
              <div className="info-row danger">
                <span>{t("building.demolish")}:</span>
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
              {t(b.labelKey)}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="building-menu-close"
          onClick={() => setIsOpen(false)}
        >
          {t("building.close")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="building-menu-container">
      <button className="toggle-button" onClick={() => setIsOpen((v) => !v)}>
        <BsBuildingFill size={36} color="white" />
      </button>
      {createPortal(overlayContent, document.body)}
    </div>
  );
};
