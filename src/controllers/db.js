const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');

  // Create products table if it does not exist
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      ratings INT NOT NULL
    )
  `;
  db.query(createProductsTable, (err) => {
    if (err) {
      throw err;
    }
    console.log('Products table created or already exists');

    // Seed initial data if products table is empty
    const checkProductsData = `SELECT COUNT(*) AS count FROM products`;
    db.query(checkProductsData, (err, result) => {
      if (err) {
        throw err;
      }
      const rowCount = result[0].count;
      if (rowCount === 0) {
        const seedProductsData = `
        INSERT INTO products (name, price, image, description, quantity, ratings) VALUES
        ('Test Product', 2000.00, 'hello.png', 'HAHAHA', 5, 3);
      `;
        db.query(seedProductsData, (err) => {
          if (err) {
            throw err;
          }
          console.log('Products data seeded');
        });
      }
    });
  });
});

module.exports = db;