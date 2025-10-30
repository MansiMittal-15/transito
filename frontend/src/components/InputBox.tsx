import type { InputBoxProps } from "../config/types";

const InputBox = ({label, placeholder, type, ref}: InputBoxProps) => {
  return (
    <div className="px-2 flex flex-col">
      <label htmlFor={label} className="font-semibold text-blue-800 p-2">
        {label}
      </label>
      <input
        ref={ref}
        type={type || "text"}
        id={label}
        placeholder={placeholder}
        className="outline-blue-800 border text-blue-950 bg-blue-200/50 border-blue-800 placeholder:text-xs placeholder:font-mono p-2 rounded-3xl font-mono text-xs"
      />
    </div>
  );
};

export default InputBox;
