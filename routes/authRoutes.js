const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const Blog = require("../model/Blog");
const {
  register,
  login,
  authenticate,
} = require("../controllers/authControllers");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", authenticate, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});
module.exports = router;
