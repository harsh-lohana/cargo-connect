import React, { useState, useEffect } from "react";
import BannerImage from "../Assets/truck.jpg";
import Navbar from "./Navbar";
import HomeNavbar from "../../../components/Navbars/HomeNavbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles.css";

const Home = () => {
  const [typedText0, setTypedText0] = useState("");
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");

  const text0 = "STREAMLINING".split("");
  const text1 = "YOUR".split("");
  const text2 = "LOGISTICS".split("");

  useEffect(() => {
    const typingDelay1 = 50; // Delay between each character
    const typingDelay2 = 17; // Delay between each character
    let currentIndex0 = 0;
    let currentIndex1 = 0;
    let currentIndex2 = 0;

    const typingInterval0 = setInterval(() => {
      setTypedText0((prevTypedText0) => {
        if (currentIndex0 === text0.length) {
          clearInterval(typingInterval0);
          return prevTypedText0;
        } else {
          currentIndex0++;
          return text0.slice(0, currentIndex0).join("");
        }
      });
    }, typingDelay1);

    const typingInterval1 = setInterval(() => {
      setTypedText1((prevTypedText1) => {
        if (currentIndex1 === text1.length) {
          clearInterval(typingInterval1);
          // Start typing text2 only after text1 has fully appeared
          const typingInterval2 = setInterval(() => {
            setTypedText2((prevTypedText2) => {
              if (currentIndex2 === text2.length) {
                clearInterval(typingInterval2);
                return prevTypedText2;
              } else {
                currentIndex2++;
                return text2.slice(0, currentIndex2).join("");
              }
            });
          }, typingDelay2);
          return prevTypedText1;
        } else {
          currentIndex1++;
          return text1.slice(0, currentIndex1).join("");
        }
      });
    }, typingDelay2 * text0.length); // Start after text0 is finished

    return () => {
      clearInterval(typingInterval0);
      clearInterval(typingInterval1);
    };
  }, []);

  return (
    <div className="home-container">
      <HomeNavbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {typedText0} <br />
            {typedText1} <br />
            {typedText2}
          </motion.h1>
          <p className="page-subtitle"></p>
          <div className="button-container">
            <Link to="/login" className="login-button">
              LOGIN
            </Link>
            <Link to="/signup" className="signup-button">
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
