const OTP = require("../models/OTP");
const { StatusCodes } = require("http-status-codes");

const checkOTP = async (req, res, next) => {
    const { code, email } = req.body;
    if (!code && !email) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Code and Email is needed" });
    }

    const otpCheck = await OTP.findOne({ email, code });

    if (!otpCheck) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Code is invalid" })
    }
    const currentTime = new Date().getTime()
    if (otpCheck.expiresIn > currentTime) {
        // reset password
    } else {
        // return res.status(StatusCodes.UNAUTHORIZED).json({ message: "This code is now invalid try new code" })
    }
    next();
};

module.exports = { checkOTP };