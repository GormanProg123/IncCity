import "./styles/hud.css";
import { MoneyIndicator } from "../MoneyIndecator";
import { BuildingMenu } from "../BuildingMenu";
import type { BuildingType } from "../../../types/building";
import { ViewExpanded } from "../ViewExpanded";
import { ViewDeleted } from "../ViewDeleted";

type GameHUDProps = {
  selectedBuilding?: BuildingType | null;
  onSelectBuilding?: (buildingType: BuildingType | null) => void;
  money: number;
  expandMode: boolean;
  onToggleExpandMode: () => void;
  deletedMode: boolean;
  onToggleDeletedMode: () => void;
};

export const GameHUD = ({
  selectedBuilding,
  onSelectBuilding,
  money,
  expandMode,
  onToggleExpandMode,
  deletedMode,
  onToggleDeletedMode,
}: GameHUDProps) => {
  return (
    <div className="game-hud">
      <MoneyIndicator amount={money} />

      <div className="hud-modes">
        <ViewDeleted active={deletedMode} onToggle={onToggleDeletedMode} />

        <ViewExpanded active={expandMode} onToggle={onToggleExpandMode} />
      </div>

      <BuildingMenu
        selectedBuilding={selectedBuilding}
        onSelectBuilding={onSelectBuilding}
      />
    </div>
  );
};
