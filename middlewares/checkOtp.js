const OTP = require("../models/OTP");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const checkOTP = async (req, res, next) => {
  const { code, email } = req.body;
  if (!code && !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Code and Email is needed" });
  }

  const user = await User.findOne({email})
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No user with this email is found" });
  }
  await user.populate('code')
  user.save()
  const otpCheck = user.code[0]

  if (!otpCheck) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Code is invalid" });
  }

  const currentTime = new Date().getTime();

  if (otpCheck.expiresIn > currentTime) {
    next();
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: "This code has been expired.Please request for new code",
    });
  }
};

module.exports = { checkOTP };
