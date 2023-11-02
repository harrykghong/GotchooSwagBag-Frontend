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
import MainConferenceBanner from './ConferenceBanner'
import ShippingInfoModal from './ShippingInfoModal';



const defaultTheme = createTheme();

const App = () => {
  const [sponsors, setSponsors] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [conference, setConferences] = useState([]);
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
    const fetchConferences = async () => {
      const response = await fetch('http://localhost:5001/host');
      const data = await response.json();
      setConferences(data[0]);
    }; 

    fetchConferences();
    fetchSponsors();
    fetchGifts();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <style>
        {`
          body {
            background-color: #0A2647;
          }
        `}
      </style>
      <Container maxWidth = "xl" >
        <MainConferenceBanner conference={conference}/>
        {/* <Header conference={conference}/> */}
        <Sponsors sponsors={sponsors} />
        <Gifts gifts={gifts} />
        <DigitalGifts gifts={gifts}/>
        <ShippingInfo />
        
      </Container>
    </ThemeProvider>
  );
};

// const Header = ({conference}) => (
//   <div className="header">
//     <h1>Welcome to {conference.conference_name || 'the conference'}</h1>
//     {conference.picture_link && <img src={conference.picture_link} alt="Conference" />}
//     <span>Powered by <img src="https://drive.google.com/uc?export=view&id=1cahLiYYIJydTUWQskXLjXL63W4pkW5be" alt="Gotchoo logo" /></span>
//   </div>
// );

const Sponsors = ({ sponsors }) => (
  <Grid Container className="sponsors" sx={{ borderRadius: '8px' }}>
    <Typography component="h2" variant='h2' color="#0A2647" sx= {{fontWeight: 'bold'}}>Our Sponsors</Typography>
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={4} className="sponsor-logos">
        {sponsors.map((sponsor) => (
          <Grid item key={sponsor.id} className="sponsor-logo-container" >
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="sponsor-logo"
              style={{
                width: '150px', // Adjust this value to control the maximum width
                height: 'auto', // Maintain aspect ratio
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Grid>
);

const Gifts = ({ gifts }) => (
  <Grid Container className="gifts" sx={{ borderRadius: '8px' }}>
    <Typography component="h3" variant='h3' color="#0A2647" sx= {{ fontWeight: 'bold'}}>Your gifts from our amazing sponsors!</Typography>
    <Typography component="subtitle1" variant='subtitle1' color="#0A2647">Select ONE physical gifts from the following</Typography>
    <div className='gifts-img'>
      <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
            {gifts.map((gift) => (
              <Grid item key={gift.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '100%',
                    }}
                    image={gift.logo}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h5" sx= {{ fontWeight: 'bold'}}>
                      {gift.gift_name}
                    </Typography>
                    <Typography variant="h6" component="h6"> 
                      {gift.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ShippingInfoModal />
                  </CardActions>
                </Card>
              </Grid>
        
          ))}
        </Grid>
      </Container>
    </div>
  </Grid>
);

const DigitalGifts = ({ gifts }) => (
  <Grid Container className="gifts" sx={{ borderRadius: '8px' }}>
    <Typography component="h3" variant='h3' color="#0A2647" sx= {{ fontWeight: 'bold'}}>Your gifts from our amazing sponsors!</Typography>
    <div className='gifts-img'>
      <Container sx={{ py: 8 }} maxWidth="xl">
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
                      pt: '75%',
                    }}
                    image={gift.logo}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx= {{ fontWeight: 'bold'}}>
                      {gift.gift_name}
                    </Typography>
                    <Typography variant="h6" component="h6">
                      {gift.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ShippingInfoModal />
                  </CardActions>
                </Card>
              </Grid>
        
          ))}
        </Grid>
      </Container>
    </div>
  </Grid>
);



    // <div className="gift" key={gift.id}>
        //   <img src={gift.logo} alt = {" "}  />
        //   <span>{gift.gift_name}</span>
        //   <p>{gift.description}</p>
        // </div>

const ShippingInfo = () => (
  <Grid container className="shipping-info" sx={{ borderRadius: '8px' , flexDirection: 'column', padding: '16px' }}>
    <Typography variant="h6" component="h6">Enter your shipping info to receive your gifts delivered to your home!</Typography>

    {/* <p>Enter your shipping info to receive your gifts delivered to your home!</p> */}
    <button size="large">Shipping Information</button>
  </Grid>
);

// ... Other components remain unchanged

export default App;
