const Router = require("express").Router();

const { getAllUsers, getUserById } = require("../controllers/adminController");
const { authorizePermissions, authUser } = require("../middlewares/authentication");

const { test } = require("../controllers/userController");



Router
    .route("/users")
    .get(authUser, authorizePermissions('admin'), getAllUsers)

Router
    .route("/user/:id")
    .get(authUser, authorizePermissions('admin'), getUserById)
    .patch()
    .delete()


Router.get("/test", authUser, authorizePermissions('admin', 'superadmin'), test)


module.exports = Router;
