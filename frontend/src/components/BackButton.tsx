import { Link } from "react-router-dom"
import type { BackButtonProps } from "../config/types"

const BackButton = ({link}: BackButtonProps) => {
  return (
    <Link to={link || ""} onClick={()=>{
      if(!link) {
        history.back();
      }
    }} className="cursor-pointer border border-blue-800 bg-blue-800 hover:bg-blue-900 text-white p-2 font-medium text-sm w-24 m-2 rounded-xl flex justify-center items-center gap-2 ">
      <strong className="font-extrabold text-xl">←</strong> Back
    </Link>
  )
}

export default BackButton
