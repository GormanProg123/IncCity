import "./styles/viewdel.css";
import { BsBuildingFillX } from "react-icons/bs";
import type { ViewDeletedProps } from "../../../types/ui";

export const ViewDeleted = ({
  active,
  onToggle,
  disabled = false,
}: ViewDeletedProps) => {
  return (
    <button
      type="button"
      className={`button-deleted ${active ? "active" : ""} ${disabled ? "button-deleted--disabled" : ""}`}
      onClick={() => !disabled && onToggle()}
      disabled={disabled}
    >
      <BsBuildingFillX className="icon-deleted" />
    </button>
  );
};
