const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    // required: [true, "Email is required"],
  },
  phoneNumber: {
    type: Number,
  },
  expiresIn: {
    type: Number,
    default: "5m",
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model("OTP", OTPSchema);
