
import type { SubHeadingProps } from "../config/types"

const SubHeading = ({label}: SubHeadingProps) => {
  return (
    <div className="pt-2 px-2 text-center text-[14px] font-light text-blue-800">
      {label}
    </div>
  )
}

export default SubHeading
