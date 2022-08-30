const Router = require("express").Router();

const { getAllUsers } = require("../controllers/adminController");
const { authorizePermissions, authUser } = require("../middlewares/authentication");



Router.route("/users").get(authUser, authorizePermissions('admin'), getAllUsers)

module.exports = Router;
