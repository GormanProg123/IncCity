import "./styles/viewdel.css";
import { BsBuildingFillX } from "react-icons/bs";
import type { ViewDeletedProps } from "../../../types/ui";

export const ViewDeleted = ({ active, onToggle }: ViewDeletedProps) => {
  return (
    <button
      className={`button-deleted ${active ? "active" : ""}`}
      onClick={onToggle}
    >
      <BsBuildingFillX className="icon-deleted" />
    </button>
  );
};
