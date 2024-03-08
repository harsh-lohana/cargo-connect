import React, { useState, useEffect } from "react";
import "../Cardcomponent/styles.css";
import { Button } from "@mui/material";
import axios from "axios";

const Card = ({ cargo, loggedInUserId }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await axios.post(
          "http://localhost:5000/api/admin/expectedPay",
          { cargoId: cargo._id },
          config
        );
        setPrice(response.data);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();
  }, [cargo._id]);

  const handleAccept = async (req, res) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const cargoId = cargo._id;
      const payload = {
        cargoId,
        loggedInUserId,
      };

      const response = await axios.put(
        "http://localhost:5000/api/user/accept",
        payload,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

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

      <div className="card-row truck-details">Price: {price}</div>

      {/* <div className="btn flex justify-between">
         <Button onClick={handleAccept}>Accept</Button>
         <Button>Reject</Button>
      </div> */}
    </div>
  );
};

export default Card;
