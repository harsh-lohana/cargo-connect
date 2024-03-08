import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/user/signup",
          { name, email, password },
          config
        );
        toast.success("Signed in!");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/");
      } catch (error) {
        setError(error.response.data.message);
        toast.error("Invalid email or password!");
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-blue-500 bg-yellow-200 my-3">
        {loading ? "Loading..." : "Signup"}
      </h1>
      {loading ? <Loader /> : null}
      <form action="" className="flex flex-col gap-2" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-lg font-semibold text-blue-500 bg-yellow-200"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            className="mb-2 w-56 h-8"
            onChange={(e) => setName(e.target.value)}
          />
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
            className="mb-2 w-56 h-8"
            onChange={(e) => setEmail(e.target.value)}
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
            className="mb-2 w-56 h-8"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="confirm-password"
            className="text-lg font-semibold text-blue-500 bg-yellow-200"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            className="mb-2 w-56 h-8"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border-solid border-2 bg-yellow-300 font-semibold border-blue-500 text-blue-700 rounded-md py-1 px-2 my-2"
        >
          Signup
        </button>
        <p className="font-semibold text-blue-700 rounded-md">
          Already a user?
          <Link to="/login" className="underline text-blue-800">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
