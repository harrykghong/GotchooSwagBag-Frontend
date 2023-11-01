// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const App = () => {
  const [sponsors, setSponsors] = useState([]);
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const response = await fetch('http://localhost:5001/sponsors');
      const data = await response.json();
      setSponsors(data);
    };
    const fetchGifts = async () => {
      const response = await fetch('http://localhost:5001/gifts');
      const data = await response.json();
      setGifts(data);
    };

    fetchSponsors();
    fetchGifts();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <Sponsors sponsors={sponsors} />
      <Gifts gifts={gifts} />
      <ShippingInfo />
    </div>
  );
};

const Header = () => (
  <div className="header">
    <h1>Welcome to XXX conference</h1>
    <span>Powered by <img src="/path_to_gotchoo_logo.png" alt="Gotchoo logo" /></span>
    <div className="conference-images">
      <img src="/path_to_image1.png" alt="Conference pic 1" />
      <img src="/path_to_image2.png" alt="Conference pic 2" />
      <img src="/path_to_image3.png" alt="Conference pic 3" />
    </div>
  </div>
);

const Sponsors = ({ sponsors }) => (
  <div className="sponsors">
    <h2>Our Sponsors</h2>
    <div className="sponsor-logos">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="sponsor-logo-container">
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="sponsor-logo" />
        </div>
      ))}
    </div>
  </div>
);

const Gifts = ({ gifts }) => (
  <div className="gifts">
    <h2>Your gifts from our amazing sponsors!</h2>
    <div className='gifts-img'>
      <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {gifts.map((gift) => (
              <Grid item key={gift.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={gift.logo}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {gift.gift_name}
                    </Typography>
                    <Typography>
                      {gift.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Select</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
        
          ))}
        </Grid>
      </Container>
    </div>
  </div>
);

const ShippingInfo = () => (
  <div className="shipping-info">
    <p>Enter your shipping info to receive your gifts delivered to your home!</p>
    <button>Shipping Information</button>
  </div>
);

// ... Other components remain unchanged

export default App;
