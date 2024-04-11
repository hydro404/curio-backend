const express = require("express");
const router = express.Router();

const { signIn, signUp } = require("../controllers/authController");

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
    //res.json with message
    res.json({ message: "User signed in successfully", user: user });
  });
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  signUp(user, (err, userId) => {
    if (err) {
      console.error("Error signing up:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ id: userId, message: "User signed up successfully" });
  });
});

module.exports = router;