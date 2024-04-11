const db = require('./db');
const User = require('../models/userModel.js');

function signIn(email, password, callback) {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const user = new User(results[0].name, results[0].email, results[0].password);
      callback(null, user);
    });
}

function signUp(user, callback) {
    const { name, email, password } = user;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
}

module.exports = {
    signIn, signUp
};