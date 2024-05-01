const express = require("express");
const router = express.Router();
const passwordController = require("../controller/password");
router.post("/createOtp", passwordController.createOtp);
router.post("/findEmail", passwordController.findEmail);
router.post("/updatePassword", passwordController.updatePassword);
module.exports = router;
