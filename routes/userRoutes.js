const Router = require("express").Router();

const { uploadImageUserAvatar } = require("../controllers/userController");

Router.route("/upload-avatar", uploadImageUserAvatar);

module.exports = Router;
