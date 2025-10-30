import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-r from-blue-300 ">
      <div className="flex justify-between max-w-7xl p-2 mx-auto">
        <div className="font-medium text-blue-800 text-lg">Transito</div>
        {token ? (
          <div className="flex gap-4 items-center">
            <div>Hello, user!</div>
            <button onClick={()=>{
              localStorage.removeItem("token");
              navigate('/signin');
            }} className="border border-blue-800 bg-blue-700 text-white p-1 text-[13px] rounded-md cursor-pointer hover:bg-blue-800 px-4">Logout</button>
          </div>
        ) : (
          <Link
            to="/signin"
            className="border border-blue-800 bg-blue-700 text-white p-1 text-[13px] rounded-md cursor-pointer hover:bg-blue-800 px-4"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
