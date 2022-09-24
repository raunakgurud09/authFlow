const Router = require("express").Router();

const {
  register,
  login,
  logout,
  resetPassword,
  sendOTP,
} = require("../controllers/authController");

const {
  authorizePermissions,
  authUser,
  authenticateUser,
} = require("../middlewares/authentication");

const { checkOTP } = require("../middlewares/checkOtp");

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").delete(logout);
Router.route("/send-otp").post(sendOTP);
Router.route("/reset-password").post(/*setter for email*/ checkOTP, resetPassword);

module.exports = Router;
