const db = require('./db');

const CartItem = require('../models/cartModel.js');

// `product_id`, `name`, `category`, `description`, `stock`, `images`, `price`, `quantity`, `user_id`

// // Get all products in the cart
function getAllCartItems(callback, user_id) {
    const sql = 'SELECT * FROM cart WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const cartItems = results.map(
            (row) =>
                new CartItem(
                    row.product_id,
                    row.name,
                    row.category,
                    row.description,
                    row.stock,
                    row.images,
                    row.price,
                    row.quantity,
                    row.user_id
                )
        );
        callback(null, cartItems);
    });

}

module.exports = {
    getAllCartItems,
};