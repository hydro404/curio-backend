
class CartItem {
    constructor(
        product_id,
        name,
        category,
        description,
        stock,
        images,
        price,
        quantity,
        user_id
    ) {
        this.product_id = product_id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.stock = stock;
        this.images = images;
        this.price = price;
        this.quantity = quantity;
        this.user_id = user_id;
    }
}

module.exports = CartItem;