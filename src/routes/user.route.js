const router = require("express").Router();
const {
  registerUserController,
  loginUserController,
} = require("../controllers/user.controller.js");

router.post("/register", registerUserController);
router.post("/login", loginUserController);

module.exports = { userRoute: router };
