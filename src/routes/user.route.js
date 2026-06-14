const router = require("express").Router();
const verifyJWT = require("../middlewares/verifyJWT.js");
const {
  registerUserController,
  loginUserController,
  forgetPasswordController,
  getUserProfileController,
  changePasswordController,
  logoutController,
} = require("../controllers/user.controller.js");

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forget_password", forgetPasswordController);
router.get("/profile", verifyJWT, getUserProfileController);
router.post("/change_password", verifyJWT, changePasswordController);
router.get("/logout", verifyJWT, logoutController);

module.exports = { userRoute: router };
