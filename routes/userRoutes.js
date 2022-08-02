const Router = require("express").Router();

const { uploadImageUserAvatar } = require("../controllers/userController");

Router.post("/upload-avatar", uploadImageUserAvatar);

module.exports = Router;
