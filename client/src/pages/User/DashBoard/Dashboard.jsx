import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import "../DashBoard/Styles.css";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { UserOrders } from './UserOrders';


const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    const [cargoCredentials, setUserCredentials] = useState({
        userId: user.id,
        loadingPoint: "",
        unloadingPoint: "",
        truckType: "",
        weight: 0,
        shippingDate: "",
        deliveryDate: ""
    });

    const { userId, loadingPoint, unloadingPoint, truckType, weight, shippingDate, deliveryDate } = cargoCredentials;

    // const config = getAxiosConfig({});

        // try{
        //     const {data} = await axios.post("/api/user/login", {email,password}, config);
        //     localStorage.setItem("loggedInUser",JSON.stringify(data));
        //     navigate("/mess");
        // }catch(error){
        //     console.log(error);
        // }

    const handleInputChange = (prop) => (event) =>{
        setUserCredentials({
            ...cargoCredentials,
            [prop] : event.target.value,
        });
    };

    const navigate = useNavigate()

    const handleLogin = async(event) => {
        event.preventDefault();

        const apiUrl = 'http://localhost:5000';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
        };

        try{
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
                shippingDate: "",
                deliveryDate: ""
            });

            alert('Order has been posted.');

        }catch(error){
            console.log(error);
        }
    };

    
    const handleUserOrders = async(event) => {
        event.preventDefault();
        navigate('/userorders'); // Navigate to '/userorders' page
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <h1 style={{ fontSize: '26px', fontWeight: '32px', textAlign: 'center' }}>Post consignments</h1>
                <div style={{display: 'flex' , flexDirection: 'row'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="loadingpoint" className="label">Loading Point</label>
                        <label htmlFor="unloadingpoint" className="label">Unloading Point</label>
                        <label htmlFor="trucktype" className="label">Truck Type</label>
                        <label htmlFor="weight" className="label">Weight</label>
                        <label htmlFor="Shippingdate" className="label">Shipping Date</label>
                        <label htmlFor="deliverydate" className="label">Delivery Date</label>
                    </div>
                    <form style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
                                style={{width: '350px'}}
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
                                name="unloadingPoint"
                                id="unloadingpoint"
                                className="custom-textfield"
                                placeholder="Enter Unloading Point" 
                                style={{width: '350px'}}
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
                                style={{width: '350px'}}
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
                                style={{width: '350px'}}
                            />
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
                                style={{width: '350px'}}
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
                                style={{width: '350px'}}
                            />
                        </div>
                        <Button variant="contained" type="submit" name='submit_button' id="login_button" onClick={handleLogin} style={{ width: '150px' , marginTop: '12px'}}>Submit</Button>
                    </form>
                </div>
            </div>
            <Button variant="contained" name='my_Orders' type="submit" id="login_button" onClick={handleUserOrders} style={{ width: '150px' , marginTop: '12px'}}>My Posts</Button>
        </div>

    );
};

export default Dashboard;
