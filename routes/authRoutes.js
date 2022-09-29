const Router = require("express").Router();

const {
  register,
  login,
  logout,
  resetPassword,
  sendOTP,
  verifyEmail,
} = require("../controllers/authController");

const { checkOTP } = require("../middlewares/checkOtp");

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").delete(logout);
Router.route("/send-otp").post(sendOTP);
Router.route("/send-verification-email").post(verifyEmail);
Router.route("/reset-password").post(
  /*setter for email*/ checkOTP,
  resetPassword
);

module.exports = Router;
