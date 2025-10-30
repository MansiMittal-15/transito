import type { UsersProps } from "../config/types";
import UserCard from "./UserCard";

const Users = ({ onchange, users }: UsersProps) => {
  return (
    <div className=" flex flex-col gap-2">
      <div className="font-medium text-xl mt-3 text-blue-800">Users</div>
      <input
        onChange={onchange}
        type="text"
        placeholder="search users here.."
        className="w-full p-2 outline-blue-800 rounded-2xl border border-blue-800 text-sm "
      />
      {users.map((user) => (
        <div key={user.id}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default Users;
