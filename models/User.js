const mongoose = require("mongoose");
const { User } = require("../configs/RoleList");

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
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    User: {
      type: String,
      default: "User",
    },
    SuperAdmin: SUPERADMIN,
    Admin: ADMIN,
  },
  refreshToken: [String],
});

module.exports = mongoose.model("User", UserSchema);
