import "./styles/monind.css";
import { MdAttachMoney } from "react-icons/md";
import type { MoneyIndicatorProps } from "../../../types/ui";

export const MoneyIndicator = ({ amount }: MoneyIndicatorProps) => {
  return (
    <div className="money-indicator">
      <MdAttachMoney className="money-icon" />
      <span className="money-amount">{amount ?? 0}</span>
    </div>
  );
};
