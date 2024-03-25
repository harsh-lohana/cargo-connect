import React from "react";
import BannerImage from "../Assets/truck.jpg";                
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "../Styles.css";
import { Link } from "react-router-dom"; // Added missing semicolon here
import { motion } from "framer-motion";
const Home = () => {
  const [typedText, setTypedText] = useState("");
  const text = "Rudra Truckers is a fantastic company".split("");

  useEffect(() => {
    const typingDelay = 50; // Delay between each character
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setTypedText((prevTypedText) => {
        if (currentIndex === text.length) {
          clearInterval(typingInterval);
          return prevTypedText;
        } else {
          currentIndex++;
          return text.slice(0, currentIndex).join("");
        }
      });
    }, typingDelay);

    return () => clearInterval(typingInterval);
  }, []);


  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section"><motion.h1 
        className="page-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {typedText}
      </motion.h1>
          
          <p className="page-subtitle">Teppal ko pel do</p>
          <div className="button-container">
          <Link to="/login" className='login-button'>LOGIN</Link>
            <Link to="/signup" className='signup-button'>REGISTER</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
