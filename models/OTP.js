const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  expiresIn: {
    type: Number,
    default: "5m",
  },
  otp: {
    type: String,
  },
});

module.exports = mongoose.model("OTP", OTPSchema);
