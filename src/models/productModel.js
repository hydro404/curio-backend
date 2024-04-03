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
  
    // Method to calculate the average rating
    calculateAverageRating() {
      if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, rating) => acc + rating, 0);
        return total / this.ratings.length;
      } else {
        return 0;
      }
    }
  }

module.exports = Product;