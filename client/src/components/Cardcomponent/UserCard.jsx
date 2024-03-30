import React, { useState, useEffect } from "react";
import "../Cardcomponent/styles.css";
import { Button } from "@mui/material";
import axios from "axios";

const Card = ({ cargo, loggedInUserId }) => {
  const [price, setPrice] = useState(null);
  const [paymentButtonVisible, setPaymentButtonVisible] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await axios.post(
          "/api/admin/expectedPay",
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

  useEffect(() => {
    // Show payment button only if cargo status is 2 (completed)
    setPaymentButtonVisible(cargo.status === 2);
  }, [cargo.status]);

  const handlePayment = ((req,res)=>{

  })

  const mp = new Map([
    [0, "pending"],
    [1, "Accepted"],
    [2, "Completed"],
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

      <div>
        <div className="card-row truck-details">Price: {price}</div>
        <div>Status: {mp.get(cargo.status)}</div>
      </div>

      {/* Render payment button if status is completed */}
      {paymentButtonVisible && (
        <div className="btn flex justify-between">
          <Button onClick={handlePayment}>Make Payment</Button>
        </div>
      )}
    </div>
  );
};

export default Card;
