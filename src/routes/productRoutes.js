const express = require("express");
const router = express.Router();

// Import any necessary functions, including insertProduct function
const {
  insertProduct,
  getAllProducts,
} = require("../controllers/productController");

// Define routes
router.post("/products", (req, res) => {
  const { name, price, images, description, quantity, ratings } = req.body;
  const product = {
    name: name,
    price: price,
    images: images,
    description: description,
    quantity: quantity,
    ratings: ratings
  };
  insertProduct(product, (err, productId) => {
    if (err) {
      console.error("Error inserting product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ id: productId, message: "Product inserted successfully" });
  });
});

router.get("/products", (req, res) => {
  getAllProducts((err, products) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(products);
  });
});

module.exports = router;
