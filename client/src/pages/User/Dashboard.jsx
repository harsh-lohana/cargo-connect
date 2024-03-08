import React, { useState } from 'react'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    const [cargoCredentials, setUserCredentials] = useState({
        userId: user.id,
        loadingPoint:"",
        unloadingPoint:"",
        truckType:"",
        weight:0,
        shippingDate:"",
        deliveryDate:""
    })

    const {userId, loadingPoint, unloadingPoint, truckType, weight, shippingDate, deliveryDate} = cargoCredentials;

    const handleInputChange = (prop) => (event) =>{
        setUserCredentials({
            ...cargoCredentials,
            [prop] : event.target.value,
        });
    };

    const handleLogin = async(event)=>{
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
    }

    return (
        <div>
            <h2>Post consignments </h2>
            <form style={{display:'flex', flexDirection:'column'}}>
                <label htmlFor='loadingpoint'/>
                <input
                    type="text"
                    value={loadingPoint}
                    onChange={handleInputChange("loadingPoint")}
                    required
                    autoFocus
                    name="loadingPoint"
                    id="loadingpoint"
                    placeholder='Loadin'
                />

                <label htmlFor='unloadingpoint'/>
                <input
                    type="text"
                    value={unloadingPoint}
                    onChange={handleInputChange("unloadingPoint")}
                    required
                    autoFocus
                    name="unloadingPoint"
                    id="unloadingpoint"
                    placeholder='Unloading'
                />

                <label htmlFor='trucktype'/>
                <input
                    type="text"
                    value={truckType}
                    onChange={handleInputChange("truckType")}
                    required
                    autoFocus
                    name="truckType"
                    id="trucktype"
                    placeholder='Truck Type'
                />

               <label htmlFor='weight'/>
                <input
                    type='number'
                    value={weight}
                    onChange={handleInputChange("weight")}
                    required
                    autoFocus
                    name="weight"
                    id="weight"
                    placeholder='Weight'
                />

                <label htmlFor='shippingDate'/>
                <input
                    type='date'
                    value={shippingDate}
                    onChange={handleInputChange("shippingDate")}
                    required
                    autoFocus
                    name="shippingDate"
                    id="shippingDate"
                    placeholder='shipping date'
                />

                <label htmlFor='deliveryDate'/>
                <input
                    type='date'
                    value={deliveryDate}
                    onChange={handleInputChange("deliveryDate")}
                    required
                    autoFocus
                    name="deliveryDate"
                    id="deliveryDate"
                    placeholder='delivery date'
                />

                <button
                    type="submit"
                    name='submit_button'
                    id="login_button"
                    onClick={handleLogin}
                >
                    "Submit"
                </button>
            </form>
        </div>
    )
}

export default Dashboard