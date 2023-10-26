// import logo from './logo.svg';
// import './App.css';

// import React from 'react';

// const App = () => {
//   return (
//     <div className="app-container">
//       <Header />
//       <Sponsors />
//       <Gifts />
//       <ShippingInfo />
//     </div>
//   );
// }

// const Header = () => (
//   <div className="header">
//     <h1>Welcome to XXX conference</h1>
//     <span>Powered by <img src="/path_to_gotchoo_logo.png" alt="Gotchoo logo" /></span>
//     <div className="conference-images">
//       <img src="/path_to_image1.png" alt="Conference pic 1" />
//       <img src="/path_to_image2.png" alt="Conference pic 2" />
//       <img src="/path_to_image3.png" alt="Conference pic 3" />
//     </div>
//   </div>
// );

// const Sponsors = () => (
//   <div className="sponsors">
//     <h2>Our Sponsors</h2>
//     <img src="/path_to_aws_logo.png" alt="AWS logo" />
//     <img src="https://drive.google.com/file/d/10U2mJOoSpF0IbkxPTlZ9y_Mhox52I6t1/view?usp=sharing" alt="Google logo" />
//     <img src="https://drive.google.com/uc?export=view&id=10U2mJOoSpF0IbkxPTlZ9y_Mhox52I6t1" alt="Other logo" />
//     <img src="/path_to_facebook_logo.png" alt="Facebook logo" />
//   </div>
// );

// const Gifts = () => (
//   <div className="gifts">
//     <h2>Your gifts from our amazing sponsors!</h2>
//     <div className="gift">
//       <img src="/path_to_prime_logo.png" alt="Amazon Prime logo" />
//       <span>Amazon Prime for Students</span>
//       <p>3 months of Amazon Prime for Students</p>
//     </div>
//     <div className="gift">
//       <img src="/path_to_charger.png" alt="Belkin Wireless Charger" />
//       <span>Belkin Wireless Charger</span>
//       <p>FREE Anker PowerCore 10K Portable Charger</p>
//     </div>
//     <div className="gift">
//       <img src="/path_to_backpack.png" alt="JanSport Backpack" />
//       <span>JanSport Backpack</span>
//       <p>50% OFF your JanSport Backpack</p>
//     </div>
//   </div>
// );

// const ShippingInfo = () => (
//   <div className="shipping-info">
//     <p>Enter your shipping info to receive your gifts delivered to your home!</p>
//     <button>Shipping Information</button>
//   </div>
// );

// export default App;


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
    {sponsors.map((sponsor) => (
      <div key={sponsor.id}>
        <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
      </div>
    ))}
  </div>
);

const Gifts = ({ gifts }) => (
  <div className="gifts">
    <h2>Your gifts from our amazing sponsors!</h2>
    {gifts.map((gift) => (
      <div className="gift" key={gift.id}>
        <img src={gift.sponsor_logo} alt={`${gift.sponsor_name} logo`} />
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
