import { Link } from "react-router-dom"

import type { BottomWarningProps } from "../config/types.ts"

const BottomWarning = ({label, to, warning} : BottomWarningProps) => {
  return (
    <div className="px-2 py-2 text-[14px] text-blue-800 font-light flex justify-center gap-1">
      <div>{warning}</div>
      <Link className="hover:underline font-medium" to={`${to}`}>{label}</Link>
    </div>
  )
}

export default BottomWarning
