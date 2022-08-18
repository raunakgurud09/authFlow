const Router = require("express").Router();

const { uploadImageUserAvatar, test } = require("../controllers/userController");

const { authorizePermissions } = require("../middlewares/authentication")

Router.post("/upload-avatar", uploadImageUserAvatar);
Router.get("/test", authorizePermissions, test);

module.exports = Router;
