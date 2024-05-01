const express = require("express"),
  router = express.Router(),
  controller = require("../controller/product");

router.get("/getProducts", controller.getProducts);
router.post("/getItemProduct", controller.getItemProduct);

module.exports = router;
