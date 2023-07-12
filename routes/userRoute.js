const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  CurrentUser,
} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

router.get("/current", validateToken, CurrentUser);

module.exports = router;
