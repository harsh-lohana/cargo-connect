import React from 'react'
import Card from '../../../components/Cardcomponent/Card'
import axios from 'axios';
import { useState , useEffect  } from 'react';
import "../Allorder/styles.css"
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import BaseNavbar from '../../../components/Navbars/BaseNavbar';
import Footer from '../../LandingPage/Components/Footer';

export const Allorders = () => {

   const [cargoList, setCargoList] = useState([]);
   //const [loggedInUserId, setLoggedInUserId] = useState(null);

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

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const loggedInUserId = user.id;

  const navigate = useNavigate();

  const handleCommitment = () =>{
   navigate("/commit");
  }

  return (
    <div className='all'>
      <BaseNavbar/>
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
