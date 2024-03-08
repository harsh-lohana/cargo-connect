import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast.success("Logged in!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Invalid email or password!");
      setLoading(false);
      console.log(error.message);
    }
  };

  const revealTestUSer = () => {
    setEmail("test@test.com");
    setPassword("test");
    toast.success("Test user revealed!");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-blue-500 bg-yellow-200 my-3">
        {loading ? "Loading..." : "Login"}
      </h1>
      {loading ? <Loader /> : null}
      <form action="" className="flex flex-col gap-2" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-lg font-semibold text-blue-500 bg-yellow-200"
          >
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 w-56 h-8"
          />
          <label
            htmlFor="password"
            className="text-lg font-semibold text-blue-500 bg-yellow-200"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 w-56 h-8"
          />
        </div>
        <button
          type="submit"
          className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2"
        >
          Login
        </button>
        <button
          onClick={revealTestUSer}
          type="button"
          className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2"
        >
          Reveal test user
        </button>
        <p className="font-semibold text-blue-700 rounded-md">
          New to Blog It?
          <Link to="/signup" className="underline text-blue-800">
            {" "}
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
