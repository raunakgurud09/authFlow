const mongoose = require("mongoose");
const validator = require("validator");
// const { User, SuperAdmin, Admin } = require("../configs/RoleList");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide name"],
    // validate: {
    //   validator: validator.isEmail,
    //   message: "Please provide valid email",
    // },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    default: "user",
    enum: ["superadmin", "admin", "user"],
  },
  image: {
    type: String,
    default: "",
  },
  refreshToken: [String],
});

module.exports = mongoose.model("User", UserSchema);
