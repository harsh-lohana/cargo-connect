import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import "../DashBoard/Styles.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserOrders } from './UserOrders';
import BaseNavbar from '../../../components/Navbars/BaseNavbar';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const [cargoCredentials, setUserCredentials] = useState({
        userId: user.id,
        loadingPoint: "",
        unloadingPoint: "",
        truckType: "",
        weight: 0,
        weightUnit: "kg", // Default weight unit
        shippingDate: "",
        deliveryDate: ""
    });

    const { loadingPoint, unloadingPoint, truckType, weight, weightUnit, shippingDate, deliveryDate } = cargoCredentials;

    const handleInputChange = (prop) => (event) => {
        setUserCredentials({
            ...cargoCredentials,
            [prop]: event.target.value,
        });
    };

    const handleUnitChange = (event) => {
        setUserCredentials({
            ...cargoCredentials,
            weightUnit: event.target.value,
        });
    };

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Check if any field is empty
        if (!loadingPoint || !unloadingPoint || !truckType || !weight || !shippingDate || !deliveryDate) {
            alert('Please fill in all fields.');
            return;
        }

        const apiUrl = 'http://localhost:5000';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
        };

        try {
            const data = await fetch(`${apiUrl}/api/user/cargo`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(cargoCredentials),
            });
            console.log(data);

            // Clear form fields
            setUserCredentials({
                ...cargoCredentials,
                loadingPoint: "",
                unloadingPoint: "",
                truckType: "",
                weight: 0,
                weightUnit: "kg",
                shippingDate: "",
                deliveryDate: ""
            });

            alert('Order has been posted.');

        } catch (error) {
            console.log(error);
        }
    };

    const handleUserOrders = async (event) => {
        event.preventDefault();
        navigate('/userorders'); // Navigate to '/userorders' page
    };

    return (
        <>
         <BaseNavbar/>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           
           <div>
               <h1 style={{ fontSize: '26px', fontWeight: '32px', textAlign: 'center' }}>Post consignments</h1>
               <div style={{ display: 'flex', flexDirection: 'row' }}>
                   <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <label htmlFor="loadingpoint" className="label">Loading Point</label>
                       <label htmlFor="unloadingpoint" className="label">Unloading Point</label>
                       <label htmlFor="trucktype" className="label">Truck Type</label>
                       <label htmlFor="weight" className="label">Weight</label>
                       <label htmlFor="Shippingdate" className="label">Shipping Date</label>
                       <label htmlFor="deliverydate" className="label">Delivery Date</label>
                   </div>
                   <form style={{ display: 'flex', flexDirection: 'column', minHeight: '100 vh' }}>
                       <div className="form-group">
                           <TextField
                               required
                               variant="outlined"
                               type="text"
                               value={loadingPoint}
                               onChange={handleInputChange("loadingPoint")}
                               autoFocus
                               name="loadingPoint"
                               id="loadingpoint"
                               className="custom-textfield"
                               placeholder="Enter Loading Point"
                               style={{ width: '350px' }}
                           />
                       </div>
                       <div className="form-group">
                           <TextField
                               required
                               variant="outlined"
                               type="text"
                               value={unloadingPoint}
                               onChange={handleInputChange("unloadingPoint")}
                               autoFocus
                               className="custom-textfield"
                               placeholder="Enter Unloading Point"
                               style={{ width: '350px' }}
                           />
                       </div>
                       <div className="form-group">
                           <TextField
                               required
                               variant="outlined"
                               type="text"
                               value={truckType}
                               onChange={handleInputChange("truckType")}
                               autoFocus
                               name="truckType"
                               id="trucktype"
                               placeholder='Truck Type'
                               className="custom-textfield"
                               style={{ width: '350px' }}
                           />
                       </div>
                       <div className="form-group">
                           <TextField
                               required
                               variant="outlined"
                               type="text"
                               value={weight}
                               onChange={handleInputChange("weight")}
                               autoFocus
                               name="weight"
                               id="weight"
                               placeholder='Weight'
                               className="custom-textfield"
                               style={{ width: '250px' }}
                           />
                           <Select
                               value={weightUnit}
                               onChange={handleUnitChange}
                               variant="outlined"
                               style={{ width: '100px', marginLeft: '10px' }}
                           >
                               <MenuItem value="kg">kg</MenuItem>
                               <MenuItem value="lbs">lbs</MenuItem>
                               <MenuItem value="tonnes">tonnes</MenuItem>
                               <MenuItem value="quintal">quintal</MenuItem>
                           </Select>
                       </div>
                       <div className="form-group">
                           <TextField
                               required
                               variant="outlined"
                               type="date"
                               value={shippingDate}
                               onChange={handleInputChange("shippingDate")}
                               autoFocus
                               name="shippingDate"
                               id="shippingdate"
                               className="custom-textfield"
                               style={{ width: '350px' }}
                           />
                       </div>
                       <div className="form-group">
                           <TextField
                               required
                               variant="outlined"
                               type="date"
                               value={deliveryDate}
                               onChange={handleInputChange("deliveryDate")}
                               autoFocus
                               name="deliveryDate"
                               id="deliverydate"
                               className="custom-textfield"
                               style={{ width: '350px' }}
                           />
                       </div>
                       <Button variant="contained" type="submit" name='submit_button' id="login_button" onClick={handleLogin} style={{ width: '150px', marginTop: '12px' }}>Submit</Button>
                   </form>
               </div>
           </div>
           <Button variant="contained" name='my_Orders' type="submit" id="login_button" onClick={handleUserOrders} style={{ width: '150px', marginTop: '12px' }}>My Posts</Button>
       </div>
        
        </>
        
    );
};

export default Dashboard;
