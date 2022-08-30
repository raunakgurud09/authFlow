const Router = require("express").Router();

const { getAllUsers, getUserById } = require("../controllers/adminController");
const { authorizePermissions, authUser } = require("../middlewares/authentication");



Router.route("/users").get(authUser, authorizePermissions('admin'), getAllUsers)
Router.route("/user/:id").get(authUser, authorizePermissions('admin'), getUserById)

module.exports = Router;
