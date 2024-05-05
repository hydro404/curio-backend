const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { signIn, signUp } = require("../controllers/authController");
require('dotenv').config();
const { verifyToken } = require('../middlewares/authMiddleware'); // Adjust the path based on your directory structure

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  signIn(email, password, (err, user) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    
    // Create token if user was found
    const token = jwt.sign(
      { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, contact_number: user.contact_number},
      SECRET_KEY,
      { expiresIn: '1h' } // expires in one hour
    );

    res.status(201).json({
      message: "User signed in successfully",
      token: token,
      user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, contact_number: user.contact_number}
    });
    
  });
});


router.post("/signup", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const user = { first_name, last_name, email, password };

  signUp(user, (err, userId) => {
    if (err) {
      console.error("Error signing up:", err);
      // It might be useful to return more specific error messages based on the error type
      // For instance, if it's a duplicate key error, you might return a conflict status:
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // On successful creation, return a more informative response suitable for client-side use
    res.status(201).json({
      success: true, 
      id: userId, 
      message: "User signed up successfully",
      user: {
        firstName: first_name,
        lastName: last_name,
        email: email
      }
    });
  });
});


// Protected route example
router.get('/profile', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "A token is required for authentication" });
  }

  try {
    const formattedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(formattedToken, SECRET_KEY);
    res.json({ success: true, user: decoded });  // Successfully respond with decoded user data.
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
});


module.exports = router;