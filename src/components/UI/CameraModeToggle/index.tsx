import "./styles/cameratoggle.css";
import { MdCameraswitch } from "react-icons/md";
import type { CameraModeToggleProps } from "../../../types/ui";

export const CameraModeToggle = ({
  cameraMode,
  onToggle,
}: CameraModeToggleProps) => {
  return (
    <button className="camera-button" onClick={onToggle}>
      <MdCameraswitch size={32} style={{ marginRight: 8 }} />
      {cameraMode === "orbit" ? "Orbit" : "Free"}
    </button>
  );
};
