const db = require('./db');
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');

const saltRounds = 10; // You can adjust the number of rounds based on security/performance needs

function signIn(email, password, callback) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
      if (err) {
          return callback(err, null);
      }
      if (results.length === 0) {
          return callback(null, null);
      }
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (err) {
              return callback(err, null);
          }
          if (!isMatch) {
              return callback(null, null);
          }
          const user = new User(
            results[0].id,
            results[0].first_name,
            results[0].last_name,
            results[0].email,
            results[0].password,  // This needs to be included.
            results[0].contact_number
        );
        
          callback(null, user);
      });
  });
}

function signUp(user, callback) {
    const { first_name, last_name, email, password } = user;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return callback(err, null);
        }
        const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [first_name, last_name, email, hash], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    });
}


module.exports = {
    signIn, signUp
};