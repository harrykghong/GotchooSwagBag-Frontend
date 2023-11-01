const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'mytestuser',
  password: 'My6$Password',
  database: 'Sponsor_info'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

// Fetch sponsors
app.get('/sponsors', (req, res) => {
  const query = 'SELECT * FROM sponsors';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Fetch gifts
app.get('/gifts', (req, res) => {
  const query = `
    SELECT gifts.logo, gifts.id, gifts.gift_name, gifts.description, sponsors.name as sponsor_name, sponsors.logo as sponsor_logo 
    FROM gifts 
    JOIN sponsors ON gifts.sponsor_id = sponsors.id
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// insert shipping info to database
// app.post('/shipping-info', (req, res) => {
//   const {firstName, lastName, phoneNumber, email, address1, address2, city, state, zip, country, giftId} = req.body;
//   // Adjust the query and parameters as needed to fit your database schema
//   const query = 'INSERT INTO shipping_info (firstName, lastName, phoneNumber, email, address1, address2, city, state, zip, country, giftId) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
//   db.query(query, [firstName, lastName, phoneNumber, email, address1, address2, city, state, zip, country, giftId], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.status(201).send('Shipping information saved successfully');
//   });
// });


const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
