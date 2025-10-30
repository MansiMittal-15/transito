import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import { useEffect, useState } from "react";
import { getBalance, getFilteredUsers, tempUser } from "../config/api";
import type { User } from "../config/types";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]> ([tempUser]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
    async function onMount() { 
      const val = await getBalance();
      setBalance(val);
      const arr = await getFilteredUsers(searchValue);
      setUsers(arr);
    }
    onMount();
  }, [token, searchValue]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <Balance balance={balance} />
        <Users onchange={(e)=>{
          setSearchValue(e.target.value);
        }} users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
