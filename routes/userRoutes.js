const Router = require("express").Router();

const { uploadImageUserAvatar, test } = require("../controllers/userController");

const { authorizePermissions, authUser } = require("../middlewares/authentication")

Router.post("/upload-avatar", uploadImageUserAvatar);

// Router.get("/my-profile", authUser,);


Router.get("/test", authUser, authorizePermissions('admin'), test)

module.exports = Router;
