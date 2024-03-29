import React, { useState, useEffect } from 'react';
import Card from '../../../components/Cardcomponent/Card1';
import axios from 'axios';

export const Commitment = () => {
  const [cargoList, setCargoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/allcargo/${loggedInUserId}`);
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

        
  return (
    <div className='all'>
      <h1 style={{ textAlign: 'center', fontWeight: 700 }}>My pending works</h1>
      <div className="card-list">
        {cargoList.map((cargo) => (
          <Card key={cargo._id} cargo={cargo} loggedInUserId={cargo.user_id} />
        ))}
      </div>
    </div>
  );
}
