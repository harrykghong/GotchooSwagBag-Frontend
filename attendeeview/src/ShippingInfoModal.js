import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { useAuth } from './authContext';

const allStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const allCountries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Australia', 'Japan', 'China',
  'India', 'Brazil', 'Russia', 'South Africa', 'Mexico', 'Argentina', 'New Zealand', 'Netherlands', 'Sweden', 'Norway',
  // Add more countries as needed
];


function ShippingInfoModal({selectedGift}) {
  const { user, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ first_name: '', last_name:'', 
    address1: '', address2:'', city:'', state:'', zip:'', country:'United States' , gift_id: selectedGift});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:5001/shipping-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shippingInfo)
      
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('Success:', data);
      setOpen(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  // if (user) {
    return (
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="firstName"
                name="first_name"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="lastName"
                name="last_name"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.last_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.address2}
            />
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={allStates}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                />
              )}
              onChange={handleInputChange}
              value={shippingInfo.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.zip}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                onChange={handleInputChange}
                value={shippingInfo.country}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={allCountries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  variant="standard"
                />
              )}
              onChange={handleInputChange}
              value={shippingInfo.country}
            />
          </Grid>
          <Button onClick={handleSubmit} color="primary">
              Save
          </Button>
      </Grid>
    );
  // } else {
  //   return <button>Sign In</button>;
  // }
  
}

export default ShippingInfoModal;
