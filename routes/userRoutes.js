const Router = require("express").Router();

const {
  checkVerificationEmail,
  resetPassword,
  sendOTP,
  verifyEmail,
} = require("../controllers/authController");

const {
  uploadImageUserAvatar,
  userProfile,
} = require("../controllers/userController");

const { authenticateUser } = require("../middlewares/authentication");

const { checkOTP } = require("../middlewares/checkOtp");

Router.post("/upload-avatar", authenticateUser, uploadImageUserAvatar);
Router.get("/profile", authenticateUser, userProfile);

Router.route("/verify-email").post(checkVerificationEmail);
Router.route("/send-otp").post(sendOTP);
Router.route("/reset-password").post(checkOTP, resetPassword);

module.exports = Router;
