import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ShippingInfoModal from './ShippingInfoModal';
import SignInModal from './SignInModal';

const steps = ['Sign in', 'Sign up', 'Shipping Information'];

function getSteoContent(step) {
    switch (step) {
        case 0:
            return <SignInModal/>;
        case 1:
            return <SignUpModal/>;
        case 2:
            return <ShippingInfoModal/>;
        default:
            throw new Error('Unknown Step');
    }
}

export default function Redeem() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = ()=> {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return (
        <Grid container className="shippingModal">
        <Button fullWidth variant="outlined" onClick={handleOpen}>
            Redeem
        </Button>
        <Grid container className="RedeemModalDialog">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h6" gutterBottom>Redeem</DialogTitle>
                <DialogContent>
                <Grid container spacing={3}>
                    
               
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
};