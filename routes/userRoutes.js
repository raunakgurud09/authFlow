const Router = require("express").Router();

const { getUserById } = require("../controllers/adminController");
const { uploadImageUserAvatar, test } = require("../controllers/userController");

const { authorizePermissions, authUser } = require("../middlewares/authentication")

Router.post("/upload-avatar", uploadImageUserAvatar);
Router.get("/user", authUser, getUserById);



Router.get("/test", authUser, authorizePermissions('admin'), test)

module.exports = Router;
