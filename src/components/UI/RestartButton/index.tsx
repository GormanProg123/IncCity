import "./styles/restartbutton.css";
import { IoReload } from "react-icons/io5";
import type { RestartButtonProps } from "../../../types/ui";

export const RestartButton = ({ onRestart }: RestartButtonProps) => {
  const handleClick = () => {
    const confirmed = window.confirm(
      "Are you sure? This restarts the game and you will lose all progress",
    );
    if (confirmed) {
      onRestart();
    }
  };

  return (
    <button className="restart-button" onClick={handleClick}>
      <IoReload />
    </button>
  );
};
