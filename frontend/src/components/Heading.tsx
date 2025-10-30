import type { HeadingProps } from "../config/types"

const Heading = ({label}:HeadingProps) => {
  return (
    <div className="pt-4 text-4xl text-blue-800 font-medium text-center">
      {label}
    </div>
  )
}

export default Heading
