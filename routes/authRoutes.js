const Router = require("express").Router();
// const Router = express

const {
  register,
  login,
  logout,
  resetPassword,
  sendOTP,
  checkOTP,
} = require("../controllers/authController");

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").delete(logout);
Router.route("/send-otp").post(sendOTP);
Router.route("/check-otp").post(checkOTP);
Router.route("/reset-password").post(resetPassword);

module.exports = Router;
