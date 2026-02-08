import "./styles/restartbutton.css";
import { IoReload } from "react-icons/io5";
import type { RestartButtonProps } from "../../../types/ui";
import { useTranslation } from "react-i18next";

export const RestartButton = ({ onRestart }: RestartButtonProps) => {
  const { t } = useTranslation();
  const handleClick = () => {
    const confirmed = window.confirm(t("gameOver.ownrestart"));
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
