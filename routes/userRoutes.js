const Router = require("express").Router();

const { verifyEmail } = require("../controllers/authController");
const { uploadImageUserAvatar, test, userProfile } = require("../controllers/userController");

const { authorizePermissions, authUser, validateUser } = require("../middlewares/authentication")

Router.post("/upload-avatar", authUser, uploadImageUserAvatar);
Router.get("/profile", authUser, userProfile);
Router.route("/verify-email").post(verifyEmail)

// Router.get("/profile", authUser, validateUser, userProfile);

module.exports = Router;
