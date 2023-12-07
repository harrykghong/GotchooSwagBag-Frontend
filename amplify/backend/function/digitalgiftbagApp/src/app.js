var mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const db = mysql.createConnection({
  host: 'gcdm2.crhcg4x4v37c.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'WliH664osL9NdGPpNhFl',
  database: 'Sponsor_info'
});

db.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});
/**********************
 * Example get method *
 **********************/

app.get('/item', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});


// server.js

// fetch sponsor
app.get('/sponsors', (req, res) => {
  console.log("fetch sponsor");
  const query = 'SELECT * FROM sponsors';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Fetch physical gifts
app.get('/physicalgifts', (req, res) => {
  const query = `
   SELECT 
     gifts.id, 
     gifts.gift_name, 
     gifts.description, 
     gifts.logo, 
     gifts.redeem_link,
     gifts.gift_type,
     sponsors.name AS sponsor_name,
     sponsors.logo AS sponsor_logo
   FROM 
     gifts
   INNER JOIN 
     swag_bag ON gifts.id = swag_bag.gift_id
   INNER JOIN 
     events ON swag_bag.event_id = events.id
   LEFT JOIN 
     sponsors ON gifts.sponsor_id = sponsors.id
   WHERE 
     gifts.gift_type = 'physical' AND 
     events.id = 1 AND 
     swag_bag.id = 1;
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });

});


// Fetch digitalgifts
app.get('/digitalgifts', (req, res) => {
  const query = `
   SELECT 
     gifts.id, 
     gifts.gift_name, 
     gifts.description, 
     gifts.logo, 
     gifts.redeem_link,
     gifts.gift_type,
     sponsors.name AS sponsor_name,
     sponsors.logo AS sponsor_logo
   FROM 
     gifts
   INNER JOIN 
     swag_bag ON gifts.id = swag_bag.gift_id
   INNER JOIN 
     events ON swag_bag.event_id = events.id
   LEFT JOIN 
     sponsors ON gifts.sponsor_id = sponsors.id
   WHERE 
     gifts.gift_type = 'digital' AND 
     events.id = 1 AND 
     swag_bag.id = 1;
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });

});


// Fetch conference
app.get('/host', (req, res) => {
  const query = `
  SELECT events.Event_Name, events.picture_link
  From events  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });

});


// insert shipping info to database
app.post('/shipping-info', (req, res) => {
  const { first_name, last_name, address1, address2, city, state, zip, country } = req.body;
  const query = 'INSERT INTO shipping_information (first_name, last_name, address1, address2, city, which_state, zip, country) VALUES (?,?,?,?,?,?,?,?)';
  db.query(query, [first_name, last_name, address1, address2, city, state, zip, country], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error', error: err });
    }

    if (results.affectedRows === 1) {
      res.status(201).json({ message: 'Shipping information saved successfully' });
    } else {
      res.status(400).json({ message: 'Insert failed, no rows affected.' });
    }
  });
});

app.listen(3306, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app