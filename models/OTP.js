const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
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
