import React from "react";
import { Link } from "react-router-dom";
import "./S.css";
import "../Styles.css";

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <h1 className="Cargo"><div className="roboto-regular">CARGO CONNECT</div></h1>
        <h2 className="Stree"><div className="roboto-regular">Streamlining Your Logistics</div></h2>
      </div>
      <div className="button-container">
        <Link to="/login" className="login-button">
          LOGIN
        </Link>
        <Link to="/signup" className="signup-button">
          REGISTER
        </Link>
      </div>
    </div>
  );
};

export default Home;
