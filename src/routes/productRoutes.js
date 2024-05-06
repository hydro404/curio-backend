const express = require("express");
const router = express.Router();

// Import any necessary functions, including insertProduct function
const {
  insertProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  editProduct
} = require("../controllers/productController");

// Define routes
router.post("/products", (req, res) => {
  const { name, category, description, stock, images, price } = req.body;
  const product = {
    name,
    category,
    description,
    stock,
    images,
    price,
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

router.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  getProductById(productId, (err, product) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });
});

router.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  deleteProduct(productId, (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  });
});

// edit
router.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { name, category, description, stock, images, price } = req.body;
  const product = {
    name,
    category,
    description,
    stock,
    images,
    price,
  };

  editProduct(productId, product, (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product updated successfully" });
  });
});




module.exports = router;
