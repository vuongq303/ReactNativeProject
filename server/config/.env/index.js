require("dotenv").config();

module.exports = {
  database: process.env.DATABASE,
  urlDatabase: process.env.URL_DATABASE,
  port: process.env.PORT,
  keyJwt: process.env.KEY_JWT,
  collectionUser: process.env.COLLECTION_USER,
};
