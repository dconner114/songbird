import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function OrderSelect() {
  const [orderOptions, setOrderOptions] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');

  useEffect(() => {
    const fetchOrderOptions = async () => {
      try {
        const response = await axios.get('/api/orders/'); // Replace with your API endpoint
        setOrderOptions(response.data); // Assuming data is an array of { id, name } objects
      } catch (error) {
        console.error('Error fetching order options:', error);
      }
    };

    fetchOrderOptions();
  }, []); // only run once on component mount

  const handleChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="order-select-label">Order</InputLabel>
        <Select
          labelId="order-select-label"
          id="order-simple-select"
          value={selectedOrder}
          label="Order"
          onChange={handleChange}
        > 
          <MenuItem value="0" selected={true}>Any Order</MenuItem>
          { 
            orderOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.common_name} ({option.scientific_name})
            </MenuItem>
          ))
        }
        </Select>
      </FormControl>
    </Box>
  );
}