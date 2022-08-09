const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const changePassword = async (email, password) => {
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "No user found with this email" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    foundUser.password = hashPassword;
    await foundUser.save();
}

module.exports = changePassword