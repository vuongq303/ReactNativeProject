const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: String,
  productType: String,
  info: [
    {
      size: String,
      quantity: Number,
      price: Number,
    },
  ],
  imageUri: String,
  rating: Number,
  sold: Number,
});
const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
