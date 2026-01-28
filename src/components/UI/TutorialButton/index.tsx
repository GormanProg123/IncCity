import "./styles/tutorial-button.css";
import { FaInfoCircle } from "react-icons/fa";
import type { TutorialButtonProps } from "../../../types/ui";

export const TutorialButton = ({ onOpen }: TutorialButtonProps) => {
  return (
    <button className="button-tutorial" onClick={onOpen} title="View Tutorial">
      <FaInfoCircle className="icon-tutorial" />
    </button>
  );
};
