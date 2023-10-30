// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
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
        <div key={sponsor.id}>
          <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
        </div>
      ))}
    </div>
  </div>
);


const Gifts = ({ gifts }) => (
  <div className="gifts">
    <h2>Your gifts from our amazing sponsors!</h2>
    {gifts.map((gift) => (
      <div className="gift" key={gift.id}>
        <span>{gift.gift_name}</span>
        <p>{gift.description}</p>
      </div>
    ))}
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
