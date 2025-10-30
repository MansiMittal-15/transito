import type { BalanceProps } from "../config/types";

const Balance = ({ balance }: BalanceProps) => {
  return (
    <div className="font-medium flex items-center gap-0.5">
      Your balance: <div className="text-blue-800 text-lg"> ₹</div>{" "}
      <div className="underline text-blue-800 text-lg">{balance}</div>
    </div>
  );
};

export default Balance;
