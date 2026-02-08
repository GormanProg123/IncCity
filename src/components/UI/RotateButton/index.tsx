import "./styles/rotatebutton.css";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import type { RotateButtonProps } from "../../../types/ui";

export const RotateButton = ({
  active = false,
  onToggle,
  disabled = false,
  "aria-label": ariaLabel = "Rotation mode off",
  "aria-label-active": ariaLabelActive = "Rotation mode on",
}: RotateButtonProps) => {
  return (
    <button
      type="button"
      className={`rotate-button ${active ? "rotate-button--active" : ""}`}
      onClick={() => !disabled && onToggle()}
      disabled={disabled}
      aria-label={active ? ariaLabelActive : ariaLabel}
      aria-pressed={active}
      title={active ? ariaLabelActive : ariaLabel}
    >
      <FaBuildingCircleArrowRight />
    </button>
  );
};
