const Router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllers/adminController");
const {
  authorizePermissions,
  authUser,
  authenticateUser,
} = require("../middlewares/authentication");

const { test } = require("../controllers/userController");

Router.route("/users").get(
  authenticateUser,
  authorizePermissions("admin", "superadmin"),
  getAllUsers
);

Router.route("/user/:id")
  .get(
    authenticateUser,
    authorizePermissions("admin", "superadmin"),
    getUserById
  )
  .patch(
    authenticateUser,
    authorizePermissions("admin", "superadmin"),
    updateUserById
  )
  .delete(
    authenticateUser,
    authorizePermissions("admin", "superadmin"),
    deleteUserById
  );

Router.get(
  "/test",
  authUser,
  authorizePermissions("admin", "superadmin"),
  test
);

module.exports = Router;
