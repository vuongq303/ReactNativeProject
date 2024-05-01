const express = require("express");
const router = express.Router();
const controller = require("../controller/comment");
router.post("/addComment", controller.addComment);
router.get("/getComment", controller.getComment);
module.exports = router;
