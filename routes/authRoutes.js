const Router = require("express").Router();
const passport = require('passport')

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

Router.get("/google/callback", (req, res) => {
  console.log(req.query.code)
  res.send("<p>redirect</p>");
});
Router.get("/bad", (req, res) => {
  res.send("<p>bad</p>");
});

Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email","profile"] })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {successRedirect:'/good', failureRedirect: "/bad" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);


module.exports = Router;
