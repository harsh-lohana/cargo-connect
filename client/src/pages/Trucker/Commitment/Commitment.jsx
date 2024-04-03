import React, { useState, useEffect } from 'react';
import Card from '../../../components/Cardcomponent/Card1';
import axios from 'axios';

export const Commitment = () => {
  const [cargoList, setCargoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      try {
        const response = await axios.get(`/api/user/allcargo/${loggedInUserId}`, config);
        console.log(response.data);
        setCargoList(response.data);
      } catch (error) {
        console.error("Error fetching cargo data:", error);
      }
    };

    fetchData();
  }, []);

  const user = JSON.parse(localStorage.getItem('loggedInUser'));
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
