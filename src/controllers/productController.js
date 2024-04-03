const db = require('./db');
const Product = require('../models/productModel.js');

function getAllProducts(callback) {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      // Map results to Product objects
      const products = results.map(row => new Product(row.name, row.price, row.images, row.description, row.quantity, row.ratings));
      callback(null, products);
    });
  }
  
  // Example usage of getAllProducts function
//   getAllProducts((err, products) => {
//     if (err) {
//       console.error('Error fetching products:', err);
//       return;
//     }
//     console.log('Products:', products);
//   });
  
  // Function to insert a new product into the database
  function insertProduct(product, callback) {
    const { name, price, images, description, quantity, ratings } = product;
    const sql = 'INSERT INTO products (name, price, images, description, quantity, ratings) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, price, images, description, quantity, ratings], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  }

    module.exports = {
        getAllProducts,
        insertProduct
    };