const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
// const { User, SuperAdmin, Admin } = require("../configs/RoleList");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxLength: 50,
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
  code: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "OTP",
    },
  ],
});


UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
