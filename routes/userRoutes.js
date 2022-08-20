const Router = require("express").Router();

const { uploadImageUserAvatar, test } = require("../controllers/userController");

const { authorizePermissions, authUser } = require("../middlewares/authentication")

Router.post("/upload-avatar", uploadImageUserAvatar);
// Router.get("/test", authorizePermissions('admin'), test)
// Router.get("/test", authUser, test)
Router.get("/test", test)

module.exports = Router;
