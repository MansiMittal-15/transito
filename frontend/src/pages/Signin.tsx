import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useEffect, useRef } from "react";
import axios from "axios";
import { USER_URL } from "../config/constant";
import toast from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signinHandler = async () => {
    try {
      const data = {
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
      };
      const res = await axios.post(`${USER_URL}/signin`, data);
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <>
      <div className=" border-4 min-h-screen bg-blue-50">
        <BackButton />
        <div className="max-w-[60%] py-[3%] mx-auto border-2 rounded-2xl p-4 bg-blue-100">
          <Heading label="Sign In" />
          <SubHeading label="Sign in to continue the transactions with Paytm!" />
          <InputBox
            ref={emailRef}
            label="Email"
            placeholder="abc@example.com"
            type="email"
          />
          <InputBox
            ref={passwordRef}
            label="Password"
            placeholder="Type your password here"
            type="password"
          />
          <Button onclick={signinHandler} label="Sign in" />
          <BottomWarning
            label="Sign up"
            to="/signup"
            warning="Don't have an account?"
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
