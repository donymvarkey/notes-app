const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const middlewares = require("../middlewares");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
