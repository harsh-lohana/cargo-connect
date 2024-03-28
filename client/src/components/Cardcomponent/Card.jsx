
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

      const response = await axios.put("http://localhost:5000/api/user/accept", payload , config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
      // Handle the error response properly
      // Here, you can log the error and set a proper error message
      // For example, if you're using this in a React component, you can set state to display an error message
      // For now, I'm logging the error and not sending any specific response
    }
  };

  const mp = new Map([
    [0, 'Pending'],
    [1, 'Accepted'],
    [2, 'Completed']
  ]);

  return (
    <div>
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
          <div>status: {mp.get(cargo.status)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
