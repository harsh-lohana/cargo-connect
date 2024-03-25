import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import image from "../pages/LandingPage/Assets/loginTruck.jpg";
import { Typography, TextField, Button, Select, MenuItem } from "@mui/material";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(2);
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
          { name, email, password, role },
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
    <div className="main">
      <div className="overlay"></div>
      <img src={image} style={{ filter: "blur(3px)" }}/>
      <div className="content">
        <div className="h-screen flex flex-col justify-center items-center">
          <Typography variant="h4" color="white" className="mb-3">
            {loading ? "Loading..." : "Signup"}
          </Typography>
          {loading ? <Loader /> : null}
          <form action="" className="flex flex-col gap-2" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <Typography variant="subtitle1" color="white" className="bg-transparent">
                Name
              </Typography>
                <TextField
                id="name"
                type="text"
                placeholder="Enter name"
                className="mb-2"
                InputProps={{
                  style: { borderColor: "white" },
                }}
              />
              <Typography variant="subtitle1" color="white" className="bg-transparent">
                E-Mail
              </Typography>
              <TextField
                id="email"
                type="email"
                placeholder="Enter e-mail"
                className="mb-2"
                onChange={(e) => setEmail(e.target.value)}
               
              />
              <Typography variant="subtitle1" color="white" className="bg-transparent">
                Role
              </Typography>
              <Select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mb-2"
              >
                <MenuItem value={2}>Customer</MenuItem>
                <MenuItem value={1}>Trucker</MenuItem>
              </Select>
              <Typography variant="subtitle1" color="white" className="bg-transparent" >
                Password
              </Typography>
              <TextField
                id="password"
                type="password"
                placeholder="Enter password"
                className="mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography variant="subtitle1" color="white" className="bg-transparent">
                Confirm Password
              </Typography>
              <TextField
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                className="mb-2"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="my-2"
            >
              Signup
            </Button>
            <Typography variant="subtitle1" color="white" className="font-semibold">
              Already a user?
              <Link to="/login" className="underline">
                {" "}
                Login
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
