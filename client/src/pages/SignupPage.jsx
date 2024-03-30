import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/Navbars/HomeNavbar";
import { Typography, TextField, Button, Select, MenuItem, Card, CardContent } from "@mui/material";

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
    }
  };

  return (
    <div>
      <HomeNavbar/>
    <div className="main" style={{ backgroundColor: "#f0f4f8", color: "#333", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <CardContent style={{ padding: "40px", textAlign: "center" }}>
          <Typography variant="h4" style={{ marginBottom: "20px", color: "#333" }}>
            {loading ? "Loading..." : "Signup"}
          </Typography>
          {loading ? <Loader /> : null}
          <form action="" onSubmit={submitHandler}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                id="name"
                type="text"
                placeholder="Enter name"
                InputProps={{
                  style: { borderColor: "#ccc" },
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                type="email"
                placeholder="Enter e-mail"
                InputProps={{
                  style: { borderColor: "#ccc" },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Select
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ borderColor: "#ccc" }}
              >
                <MenuItem value={2}>Customer</MenuItem>
                <MenuItem value={1}>Trucker</MenuItem>
              </Select>
              <TextField
                id="password"
                type="password"
                placeholder="Enter password"
                InputProps={{
                  style: { borderColor: "#ccc" },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                InputProps={{
                  style: { borderColor: "#ccc" },
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Signup
            </Button>
            <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
              Already a user?
              <Link to="/login" style={{ textDecoration: "underline", marginLeft: "5px", color: "#007bff" }}>
                Login
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default SignupPage;
