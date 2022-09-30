const Router = require("express").Router();

const {
  register,
  login,
  logout,
  resetPassword,
  sendOTP,
  verifyEmail,
} = require("../controllers/authController");


Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").delete(logout);

Router.route("/send-verification-email").post(verifyEmail);


module.exports = Router;
