const express = require("express");
const router = express.Router();
const controller = require("../controller/chat");

router.get("/getAllUser", controller.getAllUser);
router.get("/getUser", controller.getUser);
router.post("/setUser", controller.setUser);
router.post("/getUserArr", controller.getUserArr);
router.post("/setSkeleton", controller.setSkeleton);
router.post("/sendMessage", controller.sendMessage);
router.get("/getMessage", controller.getMessage);
router.post("/lastMessage", controller.lastMessage);

module.exports = router;
