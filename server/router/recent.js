const express = require("express");
const router = express.Router();
const recentController = require("../controller/recent");
router.post("/addRecent", recentController.addRecent);
router.get("/getRecent", recentController.getRecent);
router.post("/removeRecent", recentController.removeRecent);
module.exports = router;
