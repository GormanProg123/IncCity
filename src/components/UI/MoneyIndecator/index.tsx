import "./styles/monind.css";
import { MdAttachMoney } from "react-icons/md";

type MoneyIndicatorProps = {
  amount?: number;
};

export const MoneyIndicator = ({ amount }: MoneyIndicatorProps) => {
  return (
    <div className="money-indicator">
      <MdAttachMoney className="money-icon" />
      <span className="money-amount">{amount ?? 0}</span>
    </div>
  );
};
