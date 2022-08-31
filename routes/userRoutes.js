const Router = require("express").Router();

const { uploadImageUserAvatar, test, userProfile } = require("../controllers/userController");

const { authorizePermissions, authUser, validUser } = require("../middlewares/authentication")

Router.post("/upload-avatar", uploadImageUserAvatar);
Router.get("/profile", authUser, validUser, userProfile);

// Router.get("/my-profile", authUser,);

Router.get("/test", authUser, authorizePermissions('admin'), test)

module.exports = Router;
