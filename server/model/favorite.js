const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  idUser: String,
  favorite: [
    {
      idProduct: String,
      nameProduct: String,
      imgProduct: String,
      price: Number,
      sold: Number,
      rate: Number,
    },
  ],
});
const favoriteModel = mongoose.model("favorites", favoriteSchema);
module.exports = favoriteModel;
