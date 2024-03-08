import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const UserOrders = () => {
  const [cargo, setCargo] = useState([]);

  useEffect(() => {
    const fetchCargo = async () => {
      try {
        const response = await axios.get('/allcargo'); // Fetching data from the getAllCargo route
        setCargo(response.data);
      } catch (error) {
        console.error('Error fetching cargo:', error);
      }
    };

    fetchCargo();
  }, []);

  return (
    <div>
      <Card sx={{ 
        maxWidth: 800,// Adjust as needed
        margin: '0 auto', // Center the card horizontally
        marginTop: 20, // Add some top margin
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
        borderRadius: 0, // Add rounded corners
      }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Cargo Details
          </Typography>
          <ul>
            {cargo.map(item => (
              <li key={item._id}>
                <div>
                  <strong>Loading Point:</strong> {item.loadingPoint}<br />
                  <strong>Unloading Point:</strong> {item.unloadingPoint}<br />
                  <strong>Truck Type:</strong> {item.truckType}<br />
                  <strong>Truck Type:</strong> {item.truckType}<br />
                  <strong>Truck Type:</strong> {item.truckType}<br />

                  {/* Render other cargo details as needed */}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOrders;
