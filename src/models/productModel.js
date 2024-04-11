// Define the Product class
class Product {
    constructor(name, price, images, description, quantity, ratings) {
      this.name = name;
      this.price = price;
      this.images = images;
      this.description = description;
      this.quantity = quantity;
      this.ratings = ratings;
    }
}

module.exports = Product;