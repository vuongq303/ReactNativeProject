const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  idProduct: String,
  comment: [
    {
      idUser: String,
      name: String,
      img: String,
      text: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
const model = mongoose.model("comments", schema);
module.exports = model;
