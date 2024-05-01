const mongoose = require("mongoose");
const recentSchema = new mongoose.Schema({
  idUser: String,
  recently: [
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
const recentModel = mongoose.model("recents", recentSchema);
module.exports = recentModel;
