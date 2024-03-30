import React from "react";
import "../Cardcomponent/styles.css";
import { Button } from "@mui/material";
import axios from "axios";

const Card = ({ cargo, loggedInUserId }) => {
  const handleAccept = async () => { 
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const cargoId = cargo._id; 
      const payload = {
        cargoId,
        loggedInUserId
      };

      const response = await axios.put("/api/user/accept", payload , config);
      window.location.reload();
     // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const mp = new Map([
    [0, 'Pending'],
    [1, 'Accepted'],
    [2, 'Completed']
  ]);

  return (
    <div className="card">
      <div className="card-row shipping-dates">
        <div>Shipping Date: {cargo.shippingDate}</div>
        <div>Delivery Date: {cargo.deliveryDate}</div>
      </div>

      <div className="card-row location-points">
        <div>Loading Point: {cargo.loadingPoint}</div>
        <div>Unloading Point: {cargo.unloadingPoint}</div>
      </div>

      <div className="card-row truck-details">
        <div>Truck Type: {cargo.truckType}</div>
        <div>Weight: {cargo.weight}kg</div>
      </div>
      
      <div className="btn flex justify-between">
        <Button onClick={handleAccept}>Accept</Button>
      </div>

      <div>Status: {mp.get(cargo.status)}</div>
    </div>
  );
};

export default Card;