import logo from './logo.svg';
import './App.css';

import React from 'react';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Sponsors />
      <Gifts />
      <ShippingInfo />
    </div>
  );
}

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

const Sponsors = () => (
  <div className="sponsors">
    <h2>Our Sponsors</h2>
    <img src="/path_to_aws_logo.png" alt="AWS logo" />
    <img src="/path_to_google_logo.png" alt="Google logo" />
    <img src="/path_to_other_logo.png" alt="Other logo" />
    <img src="/path_to_facebook_logo.png" alt="Facebook logo" />
  </div>
);

const Gifts = () => (
  <div className="gifts">
    <h2>Your gifts from our amazing sponsors!</h2>
    <div className="gift">
      <img src="/path_to_prime_logo.png" alt="Amazon Prime logo" />
      <span>Amazon Prime for Students</span>
      <p>3 months of Amazon Prime for Students</p>
    </div>
    <div className="gift">
      <img src="/path_to_charger.png" alt="Belkin Wireless Charger" />
      <span>Belkin Wireless Charger</span>
      <p>FREE Anker PowerCore 10K Portable Charger</p>
    </div>
    <div className="gift">
      <img src="/path_to_backpack.png" alt="JanSport Backpack" />
      <span>JanSport Backpack</span>
      <p>50% OFF your JanSport Backpack</p>
    </div>
  </div>
);

const ShippingInfo = () => (
  <div className="shipping-info">
    <p>Enter your shipping info to receive your gifts delivered to your home!</p>
    <button>Shipping Information</button>
  </div>
);

export default App;
