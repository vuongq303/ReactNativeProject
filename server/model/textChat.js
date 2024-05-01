const mongoose = require("mongoose");
const textChatModelSchema = new mongoose.Schema({
  message: [],
});
const textChatModel = mongoose.model("textchats", textChatModelSchema);
module.exports = textChatModel;
