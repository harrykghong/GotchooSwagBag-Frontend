/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// declare a new express app
const app = express()
app.use(bodyParser.json())

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
  console.log("made it to /host yay!")

  const query = `
  SELECT events.Event_Name, events.picture_link
  From events  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log("returning results", results)
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

// Create a server from your Express app
const server = awsServerlessExpress.createServer(app);

// Export your Lambda handler
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
