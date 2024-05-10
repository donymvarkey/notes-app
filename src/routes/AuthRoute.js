const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const middlewares = require("../middlewares");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.put(
  "/update/profile",
  middlewares.isAuthorised,
  AuthController.updateProfile
);
router.put(
  "/update/password",
  middlewares.isAuthorised,
  AuthController.changePassword
);

module.exports = router;
