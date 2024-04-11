const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

//view engine
app.set('view engine', 'ejs');
//view is in the src/views folder
app.set('views', './src/views');


const productRoutes = require('./src/routes/productRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');

app.use(express.urlencoded({ extended: true }));

// Example route in server.js
app.get('/', (req, res) => {
  res.render('index');
});

// Use productRoutes.js as middleware
app.use(productRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on localhost:${process.env.PORT}`);
});
