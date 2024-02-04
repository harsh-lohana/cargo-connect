import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = ({ history }) => {

  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    if(!user) navigate("/login");
    if(user.role === 2) navigate('/cargoconnect');
    else if(user.role === 1) navigate('/truckerHome');
  },[])

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl text-blue-500 font-bold">Cargo Connect</h1>
      <div className="m-6 flex gap-4">
        <Link
          to="/login"
          className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;