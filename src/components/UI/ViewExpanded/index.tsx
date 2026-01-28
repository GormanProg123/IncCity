import "./styles/viewexp.css";
import { IoGrid } from "react-icons/io5";
import type { ViewExpandedProps } from "../../../types/ui";

export const ViewExpanded = ({ active, onToggle }: ViewExpandedProps) => {
  return (
    <button
      className={`button-expanded ${active ? "active" : ""}`}
      onClick={onToggle}
    >
      <IoGrid className="icon-expanded" />
    </button>
  );
};
