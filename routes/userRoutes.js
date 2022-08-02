const Router = require("express").Router();

const { uploadImageUserAvatar } = require("../controllers/userController");

Router.get("/upload-avatar", uploadImageUserAvatar);

module.exports = Router;
