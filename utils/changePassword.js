const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const changePassword = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "No user found with this email" });
    }
    user.password = password;
    await user.save();
}

module.exports = changePassword