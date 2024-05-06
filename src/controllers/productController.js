const db = require("./db");
const Product = require("../models/productModel.js");

function getAllProducts(callback) {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    // Map results to Product objects
    const products = results.map(
      (row) =>
        new Product(
          row.id,
          row.name,
          row.category,
          row.description,
          row.stock,
          row.images,
          row.price,
          row.ratings,
          row.comments
        )
    );
    callback(null, products);
  });
}

function getProductById(productId, callback) {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [productId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    const row = results[0];
    const product = new Product(
      row.id,
      row.name,
      row.category,
      row.description,
      row.stock,
      row.images,
      row.price,
      row.ratings,
      row.comments
    );
    callback(null, product);
  });
}

// Function to insert a new product into the database
function insertProduct(product, callback) {
  const { name, category, description, stock, images, price } = product;
  const sql =
    "INSERT INTO products (name, category, description, stock, images, price) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, category, description, stock, images, price],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.insertId);
    }
  );
}

// delete product
function deleteProduct(productId, callback) {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [productId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
}

// edit product
function editProduct(productId, product, callback) {
  const { name, category, description, stock, images, price } = product;
  const sql =
    "UPDATE products SET name = ?, category = ?, description = ?, stock = ?, images = ?, price = ? WHERE id = ?";
  db.query(
    sql,
    [name, category, description, stock, images, price, productId],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.affectedRows);
    }
  );
}

module.exports = {
  getAllProducts,
  insertProduct,
  getProductById,
  deleteProduct,
  editProduct,
};
