const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  idUser: String,
  cart: [
    {
      idProduct: String,
      nameProduct: String,
      imgProduct: String,
      price: Number,
      size: Number,
    },
  ],
});
const cartModel = mongoose.model("carts", cartSchema);
module.exports = cartModel;
