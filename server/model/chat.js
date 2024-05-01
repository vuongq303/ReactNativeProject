const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  listUser: [],
});
const chatModel = mongoose.model("chats", chatSchema);
module.exports = chatModel;
