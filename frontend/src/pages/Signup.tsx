import { useEffect, useRef } from "react";
import BackButton from "../components/BackButton";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_URL } from "../config/constant";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signupHandler = async () => {
    try {
      const data = {
        firstName: firstNameRef.current?.value || "",
        lastName: lastNameRef.current?.value || "",
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
      };
      const res = await axios.post(`${USER_URL}/signup`, data);
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className=" border-4 min-h-screen bg-blue-50">
      <BackButton />
      <div className="max-w-[60%] py-[3%] mx-auto border-2 rounded-2xl p-4 bg-blue-100">
        <Heading label="Sign Up" />
        <SubHeading label="Join now with Paytm, Create an account!" />
        <InputBox
          label="First Name"
          placeholder="Enter your first name"
          ref={firstNameRef}
        />
        <InputBox
          label="Last Name"
          placeholder="Enter your last name"
          ref={lastNameRef}
        />
        <InputBox
          label="Email"
          placeholder="abc@example.com"
          type="email"
          ref={emailRef}
        />
        <InputBox
          label="Password"
          placeholder="Type your password here"
          type="password"
          ref={passwordRef}
        />
        <Button onclick={signupHandler} label="Sign up" />
        <BottomWarning
          warning="Already have an account?"
          label="Sign In"
          to="/signin"
        />
      </div>
    </div>
  );
};

export default Signup;
