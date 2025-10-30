import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useEffect } from "react";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token) {
      navigate("/signin")
    }
    navigate("/dashboard")
  }, [token])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        this is the paytm's home page..
      </div>
    </div>
  )
}

export default Home
