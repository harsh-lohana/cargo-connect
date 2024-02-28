import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import "../DashBoard/Styles.css";

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

    const handleInputChange = (prop) => (event) =>{
        setUserCredentials({
            ...cargoCredentials,
            [prop] : event.target.value,
        });
    };

    const handleLogin = async(event) => {
        event.preventDefault();
        // const config = getAxiosConfig({});

        // try{
        //     const {data} = await axios.post("/api/user/login", {email,password}, config);
        //     localStorage.setItem("loggedInUser",JSON.stringify(data));
        //     navigate("/mess");
        // }catch(error){
        //     console.log(error);
        // }
        const apiUrl = 'http://localhost:5000';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // Replace with your actual access token
        };

        try{
            const data = await fetch(`${apiUrl}/api/user/cargo`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(cargoCredentials),
            });
            console.log(data);
        }catch(error){
            console.log(error);
        }
        console.log(cargoCredentials);
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
                    {/* <label htmlFor="loadingpoint" className="label">Loading Point</label> */}
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
                    {/* <label htmlFor="unloadingpoint" className="label">Unloading Point</label> */}
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
                    {/* <label htmlFor="trucktype" className="label">Truck Type</label> */}
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
                    {/* <label htmlFor="weight" className="label">Weight</label> */}
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
                    {/* <label htmlFor="shippingDate" className="label">shipping Date</label> */}
                    <TextField
                        required
                        variant="outlined"
                        type="date"
                        value={shippingDate}
                        onChange={handleInputChange("shippingDate")}
                        autoFocus
                        name="weight"
                        id="weight"
                        placeholder='Weight'
                        className="custom-textfield"
                        style={{width: '350px'}}
                    />
                </div>

                

                <div className="form-group">
                    {/* <label htmlFor="deliveryDate" className="label">Delivery Date</label> */}
                    <TextField
                        required
                        variant="outlined"
                        type="date"
                        value={deliveryDate}
                        onChange={handleInputChange("deliveryDate")}
                        autoFocus
                        name="deliveryDate"
                        id="deliveryDate"
                        placeholder='delivery date'
                        className="custom-textfield"
                        style={{width: '350px'}}
                    />
                </div>

                    <Button variant="contained" type="submit" name='submit_button' id="login_button" onClick={handleLogin} style={{ width: '150px' , marginTop: '12px'}}>Submit</Button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
