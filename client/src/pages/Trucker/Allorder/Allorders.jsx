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
        const response = await axios.get("/api/user/allcargoP");
        console.log(response.data);
        setCargoList(response.data); 
      } catch (error) {
        console.error("Error fetching cargo data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUserId(user.id); // Set loggedInUserId if user is not null
    }
  }, []);


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
      <Button>MY COMMITMENTS</Button>
      <Footer/>
    </div>
  );
}