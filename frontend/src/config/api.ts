import axios from "axios";
import { ACCOUNT_URL, USER_URL } from "./constant";
import toast from "react-hot-toast";
import type { SendMoneyProps, User } from "./types";

export const tempUser: User = {
  firstName: "Mansi",
  lastName: "Mittal",
  email: "mansi@gmail.com",
  id: "1"
}

export const getBalance = async():Promise<number> => {
  try {
    const token =  localStorage.getItem("token")
    const res = await axios.get(`${ACCOUNT_URL}/balance`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    return res.data.balance;
  } catch (error: any) {
    toast.error(error.response?.data?.message);
  }
  return 0;
}

export const getFilteredUsers = async(search: string): Promise<User[]> =>{
  try {
    const res = await axios.get(`${USER_URL}?search=${search}`);
    return res.data.users;
  } catch (error: any) {
    toast.error(error.response?.data?.message);
  }
  return [tempUser];
}

export const sendMoney = async({to, amount}: SendMoneyProps)=>{
  try {
    const res = await axios.post(`${ACCOUNT_URL}/transfer`, {
      to, amount
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    });
    toast.success(res.data.message);
  } catch (error: any) {
    toast.error(error.response?.data?.message);
  }
}