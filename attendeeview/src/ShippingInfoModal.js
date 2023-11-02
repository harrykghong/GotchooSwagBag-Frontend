import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


function ShippingInfoModal() {
  const [open, setOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ first_name: '', last_name:'', phone:'', email:'', 
    address1: '', address2:'', city:'', state:'', zip:'', country:'' });

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
    // Handle the shipping information, e.g., send it to a server
    console.log('Shipping info:', shippingInfo);
    setOpen(false);
  };

  return (
    <Grid Container className="shippingModal">
      <Button variant="outlined" onClick={handleOpen}>
        Select
      </Button>
      <Grid Container className="shippingModalDialog">
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Shipping Information</DialogTitle>
            <DialogContent>
            <TextField
                label="First Name"
                name="first_name"
                value={shippingInfo.first_name}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Last Name"
                name="Last_name"
                value={shippingInfo.last_name}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Phone Number"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Email Address"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Address 1"
                name="address1"
                value={shippingInfo.address1}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Address 2"
                name="address2"
                value={shippingInfo.address2}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="State"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Zip Code"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                label="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default ShippingInfoModal;
