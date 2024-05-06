// Define the Product class
class Product {
  constructor(
    id,
    name,
    category,
    description,
    stock,
    images,
    price,
    ratings,
    comments
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.stock = stock;
    this.images = images;
    this.price = price;
    this.ratings = ratings;
    this.comments = comments;
  }
}

module.exports = Product;
