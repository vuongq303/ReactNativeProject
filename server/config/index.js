const express = require("express");
const dotenv = require("./.env");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

try {
  let result = mongoose.connect(dotenv.urlDatabase + dotenv.database);
  if (result) {
    console.log(`Connected ${dotenv.database}...`);
  } else {
    console.log(`Error connected ${dotenv.database}`);
  }
} catch (error) {
  console.log(error);
}
module.exports = app;
