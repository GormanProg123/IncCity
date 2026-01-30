import "./styles/cameratoggle.css";
import { MdCameraswitch } from "react-icons/md";
import type { CameraModeToggleProps } from "../../../types/ui";
import { useTranslation } from "react-i18next";

export const CameraModeToggle = ({
  cameraMode,
  onToggle,
}: CameraModeToggleProps) => {
  const { t } = useTranslation();

  return (
    <button className="camera-button" onClick={onToggle}>
      <MdCameraswitch size={32} style={{ marginRight: 8 }} />
      {cameraMode === "orbit" ? t("camera.orbit") : t("camera.free")}
    </button>
  );
};
