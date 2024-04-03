const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes.js');

app.use(express.urlencoded({ extended: true }));

// Example route in server.js
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use productRoutes.js as middleware
app.use(productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on localhost:${process.env.PORT}`);
});
