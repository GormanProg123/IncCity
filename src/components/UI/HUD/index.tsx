import "./styles/hud.css";
import { MoneyIndicator } from "../MoneyIndecator";
import { BuildingMenu } from "../BuildingMenu";
import { ViewExpanded } from "../ViewExpanded";
import { ViewDeleted } from "../ViewDeleted";
import { TutorialButton } from "../TutorialButton";
import { RestartButton } from "../RestartButton";
import { RotateButton } from "../RotateButton";
import { CameraModeToggle } from "../CameraModeToggle";
import type { GameHUDProps } from "../../../types/ui";
import { LanguageSelector } from "../LanguageSelector";

export const GameHUD = ({
  selectedBuilding,
  onSelectBuilding,
  money,
  expandMode,
  onToggleExpandMode,
  deletedMode,
  onToggleDeletedMode,
  onOpenTutorial,
  onRestart,
  cameraMode,
  onToggleCameraMode,
  rotationMode = false,
  onToggleRotationMode,
}: GameHUDProps) => {
  return (
    <>
      <div className="hud-top-left">
        <TutorialButton onOpen={onOpenTutorial} />
        <LanguageSelector />
      </div>

      <div className="hud-top-center">
        <CameraModeToggle
          cameraMode={cameraMode}
          onToggle={onToggleCameraMode}
        />
      </div>

      <div className="hud-top-right">
        <RestartButton onRestart={onRestart} />
      </div>

      <div className="game-hud">
        <MoneyIndicator amount={money} />

        <div className="hud-modes">
          <RotateButton
            active={rotationMode}
            onToggle={onToggleRotationMode ?? (() => {})}
            disabled={deletedMode}
          />
          <ViewDeleted
            active={deletedMode}
            onToggle={onToggleDeletedMode}
            disabled={rotationMode}
          />
          <ViewExpanded active={expandMode} onToggle={onToggleExpandMode} />
        </div>

        <BuildingMenu
          selectedBuilding={selectedBuilding}
          onSelectBuilding={onSelectBuilding}
        />
      </div>
    </>
  );
};
