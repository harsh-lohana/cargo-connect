import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/Navbars/HomeNavbar";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";


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
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setLoading(false);
  
      if (data.role === 2) {
        navigate("/cargoconnect");
      } else if (data.role === 1) {
        navigate("/allorders");
      } else {
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
    <div>
    <HomeNavbar/>
  <div className="main" style={{ backgroundColor: "#f0f4f8", color: "#333", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <CardContent style={{ padding: "40px", textAlign: "center" }}>
          <Typography variant="h4" style={{ marginBottom: "20px", color: "#333" }}>
            {loading ? "Loading..." : "Login"}
          </Typography>
          {loading && <Loader />}
          <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              id="email"
              type="email"
              label="E-Mail"
              placeholder="Enter e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { color: "#333" } }}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ style: { color: "#333" } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Login
            </Button>
            <Button
              onClick={revealTestUser}
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              Reveal test user
            </Button>
            <Typography variant="body1">
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "underline", color: "#007bff", cursor: "pointer" }}>
                Signup
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default LoginPage;
