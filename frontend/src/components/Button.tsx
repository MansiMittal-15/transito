import type { ButtonProps } from "../config/types";

const Button = ({ label, onclick }: ButtonProps) => {
  return (
    <div className="pt-4 px-2">
      <div onClick={onclick} className="p-2 border border-blue-800 rounded-3xl text-center font-semibold text-white cursor-pointer bg-blue-800 hover:bg-blue-900">
        {label}
      </div>
    </div>
  );
};

export default Button;
