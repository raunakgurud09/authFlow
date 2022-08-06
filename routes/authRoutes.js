const Router = require("express").Router();
// const Router = express

const {
  register,
  login,
  logout,
  resetPassword,
  sendOTP,
} = require("../controllers/authController");

Router.post("/register", register);
Router.post("/login", login);
Router.delete("/logout", logout);
Router.post("/send-otp", sendOTP);
Router.post("/reset-password", resetPassword);

module.exports = Router;
