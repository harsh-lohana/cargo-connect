import React from 'react'
import Card from '../../../components/Cardcomponent/Card'
import axios from 'axios';
import { useState , useEffect  } from 'react';
import "../Allorder/styles.css"
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TruckerNavbar from '../../../components/Navbars/TruckerNavbar';
import Footer from '../../LandingPage/Components/Footer';

export const Allorders = () => {
  const [cargoList, setCargoList] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/allcargoP");
        console.log(response.data);
        setCargoList(response.data); 
      } catch (error) {
        console.error("Error fetching cargo data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      setLoggedInUserId(user.id); // Set loggedInUserId if user is not null
    }
  }, []);

  // Log all contents of local storage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }

  const navigate = useNavigate();

  const handleCommitment = () =>{
    navigate("/commit");
  }

  return (
    <div className='all'>
      <TruckerNavbar/>
      <h1 style={{ textAlign: 'center', fontWeight: 700 }}>CARGO LIST</h1>
      <div className="card-list">
        {cargoList.map((cargo) => (
          <Card key={cargo._id} cargo={cargo} loggedInUserId={loggedInUserId} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}
