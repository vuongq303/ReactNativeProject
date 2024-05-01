const express = require("express");
const router = express.Router();
const controller = require("../controller/favorite");
router.post("/addToFavorite", controller.addToFavorite);
router.get("/getProductFavorite", controller.getProductFavorite);
router.post("/checkInFavorite", controller.checkInFavorite);
router.post("/removeFromFavorite", controller.removeFromFavorite);
module.exports = router;
