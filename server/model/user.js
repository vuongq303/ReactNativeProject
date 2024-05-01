const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  fullname: String,
  avatar: String,
  phone: String,
  password: String,
  lastChat: [
    {
      text: String,
      date: Date,
    },
  ],
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
