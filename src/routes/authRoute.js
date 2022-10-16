const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authentication");
const {
  register,
  login,
  getLoggedUser,
} = require("../controllers/authController");
const upload = require("../utils/fileUpload");


router.post(
  "/register",
  body("username").isLength({ min: 5 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  upload.single("profile_picture"),
  register
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  login
);

router.get("/me", authenticate, getLoggedUser);

module.exports = router;
