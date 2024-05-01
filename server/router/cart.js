const express = require("express");
const router = express.Router();
const controller = require("../controller/cart");

router.post("/addProductToCart", controller.addToCart);
router.post("/getProductCart", controller.getProductCart);
router.post("/removeProductCart", controller.removeProductCart);
router.post("/getProductId", controller.getProductId);
router.post("/updateProductToCart", controller.updateProductToCart);

module.exports = router;
