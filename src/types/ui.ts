import type { BuildingType } from "./building";
import type { CameraMode } from "./CameraMode";

export type GameHUDProps = {
  selectedBuilding?: BuildingType | null;
  onSelectBuilding?: (buildingType: BuildingType | null) => void;
  money: number;
  expandMode: boolean;
  onToggleExpandMode: () => void;
  deletedMode: boolean;
  onToggleDeletedMode: () => void;
  onOpenTutorial: () => void;
  onRestart: () => void;
  cameraMode: CameraMode;
  onToggleCameraMode: () => void;
  rotationMode?: boolean;
  onToggleRotationMode?: () => void;
  onRotateSelectedBuilding?: () => void;
  canRotateSelected?: boolean;
};

export type CameraModeToggleProps = {
  cameraMode: CameraMode;
  onToggle: () => void;
};

export type TutorialButtonProps = {
  onOpen: () => void;
};

export type TutorialProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type BuildingMenuProps = {
  selectedBuilding?: BuildingType | null;
  onSelectBuilding?: (buildingType: BuildingType | null) => void;
};

export interface RestartButtonProps {
  onRestart: () => void;
}

export type ViewDeletedProps = {
  active: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export type RotateButtonProps = {
  active?: boolean;
  onToggle: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-label-active"?: string;
};

export type ViewExpandedProps = {
  active: boolean;
  onToggle: () => void;
};

export type MoneyIndicatorProps = {
  amount?: number;
};
