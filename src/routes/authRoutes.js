const express = require("express");
const router = express.Router();
const authentication = require("../middleware/middleaware");
const authController = require("../controller/authController");



router.post("/register",authController.register);
router.post("/login",authController.login);

router.get("/search",authController.search);

module.exports = router;
