import { Link } from "react-router-dom";
import type { User } from "../config/types";

const UserCard = ({user} : {user: User}) => {
  return (
    <div className="flex justify-between items-center p-2 mt-1 bg-blue-50 rounded-3xl ">
      <div className="flex gap-4 items-center">
        <div className="rounded-[100%] w-10 border h-10 flex items-center justify-center font-bold bg-blue-200">
          {user.firstName[0].toUpperCase()}
        </div>
          <div className="font-medium ">{user.firstName + " " + user.lastName}</div>
      </div>
        <div className="flex gap-8">
          <div className="font-medium ">email:- {user.email}</div>
      <Link
        to={`/send-money?to_id=${user.id}&name=${user.firstName + " " + user.lastName}`}
        className="border border-blue-800 bg-blue-700 text-white p-1 text-[13px] rounded-md cursor-pointer hover:bg-blue-800 px-4"
        >
        Send Money
      </Link>
        </div>
    </div>
  );
};

export default UserCard;
