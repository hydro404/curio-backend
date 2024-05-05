const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Preferably stored in an environment variable

const verifyToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).json({ error: "A token is required for authentication" });
  }

  try {
    const formattedToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(formattedToken, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
  next();
};

module.exports = { verifyToken };