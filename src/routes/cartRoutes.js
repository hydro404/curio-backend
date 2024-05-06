const express = require("express");
const router = express.Router();


const {
    getAllCartItems
} = require("../controllers/cartController");
router.get("/cart", (req, res) => {
    const user_id = req.user.id;
    getAllCartItems((err, cartItems) => {
        if (err) {
            console.error("Error fetching cart items:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(cartItems);
    }, user_id);
});