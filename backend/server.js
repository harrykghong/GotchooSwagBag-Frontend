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

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
