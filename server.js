const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

//view engine
app.set('view engine', 'ejs');
//view is in the src/views folder
app.set('views', './src/views');
app.use(cors());

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



// const db = require('/src/controllers/db.js');

// const sql = `SELECT * FROM products`;

// db.query(sql, (err, results) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(results);
// });

app.listen(process.env.PORT, () => {
    console.log(`Server listening on localhost:${process.env.PORT}`);
});
