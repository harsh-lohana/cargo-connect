import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../components/Cardcomponent/UserCard'
import { Button } from '@mui/material';
import "../DashBoard/Styles.css";

export const UserOrders = () => {
  const [cargoList, setCargoList] = useState([]);
  const [filteredCargoList, setFilteredCargoList] = useState([]);
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const loggedInUserId = user.id;

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get("http://localhost:5000/api/user/allcargo");
       console.log(response.data);
       setCargoList(response.data);
       // Filter cargo list for the logged-in user
       setFilteredCargoList(response.data.filter(cargo => cargo.userId === loggedInUserId));
     } catch (error) {
       console.error("Error fetching cargo data:", error);
     }
   };

   fetchData();
   
 }, [loggedInUserId]); // Include loggedInUserId in the dependency array

 const navigate = useNavigate();

 const handleCommitment = () =>{
  navigate("/commit");
 }

 return (
   <div className='all'>
     <h1 style={{ textAlign: 'center', fontWeight: 700 }}>Cargo List</h1>
     <div className="card-list">
       {filteredCargoList.map((cargo) => (
         <Card key={cargo._id} cargo={cargo} loggedInUserId={loggedInUserId} />
       ))}
     </div>
   </div>
 );
}
