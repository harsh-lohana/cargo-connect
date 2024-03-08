import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../components/Cardcomponent/UserCard'
import { Button } from '@mui/material';
import "../DashBoard/Styles.css";

export const UserOrders = () => {
  const [cargoList, setCargoList] = useState([]);
  const [filteredCargoList, setFilteredCargoList] = useState([]);
  const [prices, setPrices] = useState([]);
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const loggedInUserId = user.id;

  const fetchPrice = async (cargoId) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await axios.post("http://localhost:5000/api/admin/expectedPay", { cargoId }, config);
      return response.data;
    } catch (error) {
      console.error("Error in fetching price:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/allcargo");
        setCargoList(response.data);
        // Filter cargo list for the logged-in user
        setFilteredCargoList(response.data.filter(cargo => cargo.userId === loggedInUserId));
      } catch (error) {
        console.error("Error fetching cargo data:", error);
      }
    };

    fetchData();   
  }, [loggedInUserId]); // Include loggedInUserId in the dependency array

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const prices = await Promise.all(filteredCargoList.map(cargo => fetchPrice(cargo._id)));
        setPrices(prices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    if (filteredCargoList.length > 0) {
      fetchPrices();
    }
  }, [filteredCargoList]);

  const navigate = useNavigate();

  const handleCommitment = () =>{
    navigate("/commit");
  }

  return (
    <div className='all'>
      <h1 style={{ textAlign: 'center', fontWeight: 700 }}>Cargo List</h1>
      <div className="card-list">
        {filteredCargoList.map((cargo, index) => (
          <div key={cargo._id}>
            <Card cargo={cargo} loggedInUserId={loggedInUserId} />
          </div>
        ))}
      </div>
    </div>
  );
}
