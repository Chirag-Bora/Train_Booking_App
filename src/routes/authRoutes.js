const express = require("express");
const router = express.Router();
const authentication = require("../middleware/middleaware");
const authController = require("../controller/authController");



router.post("/",authController.register);
router.post("/login",authController.login);
router.post("/search",authController.search)
router.get("/search",authentication);

module.exports = router;
