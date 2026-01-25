import "./styles/viewdel.css";
import { BsBuildingFillX } from "react-icons/bs";

type ViewDeleted = {
  active: boolean;
  onToggle: () => void;
};

export const ViewDeleted = ({ active, onToggle }: ViewDeleted) => {
  return (
    <button
      className={`button-deleted ${active ? "active" : ""}`}
      onClick={onToggle}
    >
      <BsBuildingFillX className="icon-deleted" />
    </button>
  );
};
