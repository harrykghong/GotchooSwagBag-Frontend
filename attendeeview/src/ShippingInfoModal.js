import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
            <DialogTitle variant="h6" gutterBottom>Shipping Information</DialogTitle>
            <DialogContent>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
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
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
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
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                />
                </Grid>
            </Grid>
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
