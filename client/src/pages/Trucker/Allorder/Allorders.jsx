import React from 'react'
import Card from '../../../components/Cardcomponent/Card'
import axios from 'axios';
import { useState , useEffect } from 'react';
import "../Allorder/styles.css"


export const Allorders = () => {

   const [cargoList, setCargoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/allcargo");
        console.log(response.data);
        setCargoList(response.data); 
      } catch (error) {
        console.error("Error fetching cargo data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='all'>
      <h1 style={{ textAlign: 'center', fontWeight: 700 }}>Cargo List</h1>
      <div className="card-list">
        {cargoList.map((cargo) => (
          <Card key={cargo._id} cargo={cargo} />
        ))}
      </div>
    </div>
  );
}
