import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import image from "../pages/LandingPage/Assets/loginTruck.jpg";
import { TextField, Button, Typography } from "@mui/material";
import "../pages/User/DashBoard/Styles.css";

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
      localStorage.setItem("loggedInUser", JSON.stringify(data)); // Assuming the user role is stored in 'data.role'
      setLoading(false);
  
      // Redirect based on user role
      if (data.role === 2) {
        // Redirect to cargoconnect if user role is 2
        navigate("/cargoconnect");
      } else if (data.role === 1) {
        // Redirect to allorders if user role is 1
        navigate("/allorders");
      } else {
        // Default redirection (if user role is neither 1 nor 2)
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Invalid email or password!");
      setLoading(false);
      console.log(error.message);
    }
  };

  const revealTestUser = () => {
    setEmail("test@test.com");
    setPassword("test");
    toast.success("Test user revealed!");
  };

  return (
    <div className="main" style={{background : "black"}}>
    <div className="overlay"></div>
    <img src={image} style={{ filter: "blur(3px)" }}/>
    <div className="content">
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h4" color="white" style={{ marginBottom: "1rem" ,fontFamily: "Roboto, sans-serif" }}>
        {loading ? "Loading..." : "Login"}
      </Typography>
      {loading && <Loader />}
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={submitHandler}>
        <TextField
          id="email"
          type="email"
          label="E-Mail"
          placeholder="Enter e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: 300, color:"white" }}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: 300 , color: "white"}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 80 }}
        >
          Login
        </Button>
        <Button
          onClick={revealTestUser}
          variant="contained"
          color="primary"
          style={{ width: 200}}
        >
          Reveal test user
        </Button>
        <Typography variant="body1" color="white">
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "underline", color: "white", cursor: "pointer" }}>
            Signup
          </Link>
        </Typography>
      </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
