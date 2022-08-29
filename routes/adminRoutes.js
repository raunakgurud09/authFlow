const Router = require("express").Router();

const { getAllUsers } = require("../controllers/authController");
const { authorizePermissions, authUser } = require("../middlewares/authentication");
// const { getAllUsers } = require("./authController");



Router.route("/users").get(authUser, authorizePermissions('admin'), getAllUsers)
// Router.route("/users").get(getAllUsers)

module.exports = Router;
