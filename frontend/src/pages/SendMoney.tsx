import { useRef } from "react";
import BackButton from "../components/BackButton";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useSearchParams } from "react-router-dom";
import { sendMoney } from "../config/api";

const SendMoney = () => {
  const amountRef = useRef<HTMLInputElement>(null);
  const params = useSearchParams()[0];
  const name = params.get("name"),
    to = params.get("to_id");

  const sendMoneyHandler = async () => {
    await sendMoney({ to: to || "", amount: Number(amountRef.current?.value) });
  };
  return (
    <div className="bg-[#F0F1F4] min-h-screen border ">
      <BackButton />
      <div className="flex items-center justify-center mt-[5%] ">
        <div className="flex flex-col mx-auto py-10 px-8 rounded-2xl w-[40%] bg-[#FFFDFF]">
          <Heading label="Send Money" />
          <SubHeading label="Initiate a transaction with your friend now!" />
          <div className="flex gap-4 items-center pl-2 my-2">
            <div className="rounded-[100%] w-10 border h-10 border-blue-900 flex justify-center items-center p-2 font-bold bg-blue-200 text-blue-900">
              {name?.[0].toUpperCase()}
            </div>
            <div className="font-medium text-blue-900">{name}</div>
          </div>
          <InputBox label="Amount In(Rs)" type="number" ref={amountRef} />
          <button
            onClick={sendMoneyHandler}
            className="border border-blue-800 text-center bg-blue-700 text-white p-2 text-sm rounded-2xl cursor-pointer hover:bg-blue-800 px-4 m-2"
          >
            Initiate transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
