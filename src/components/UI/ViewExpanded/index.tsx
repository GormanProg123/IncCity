import "./styles/viewexp.css";
import { IoGrid } from "react-icons/io5";

type ViewExpanded = {
  active: boolean;
  onToggle: () => void;
};

export const ViewExpanded = ({ active, onToggle }: ViewExpanded) => {
  return (
    <button
      className={`button-expanded ${active ? "active" : ""}`}
      onClick={onToggle}
    >
      <IoGrid className="icon-expanded" />
    </button>
  );
};
