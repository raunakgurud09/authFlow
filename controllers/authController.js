const User = require("../models/User");
const OTP = require("../models/OTP");

const crypto = require('crypto')

const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const optGenerater = require("otp-generator");

const sendMail = require("../utils/sendMails");
const changePassword = require("../utils/changePassword")
const { createTokenUser, attachCookiesToResponse } = require("../utils/jwt")

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if ((!email, !password)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and Password are required" });
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Email already exist" });
  }

  //pre userSchema

  try {
    const user = await User.create({
      name,
      email,
      role: role || "user",
      password,
    });


    await user.save();
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const login = async (req, res) => {
  // const cookies = req.cookies;
  // console.log(`cookies available at login: ${JSON.stringify(cookies)}`);

  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No user with this email is found" });
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invaild creadentials" });
  }

  const tokenUser = createTokenUser(user)

  let refreshToken = '';
  const existingToken = user.refreshToken;
  if (existingToken) {
    refreshToken = existingToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  user.refreshToken = refreshToken

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })
  res.status(StatusCodes.OK).json({ user: tokenUser })


};

const logout = async (req, res) => {
  const cookies = res.cookies;
  if (!cookies?.jwt) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
    return res.status(StatusCodes.NO_CONTENT).json("No cookies found");
  }
  const refreshToken = cookies.jwt;

  const foundUser = User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
    return res.status(StatusCodes.NO_CONTENT).json("No cookies found");
  }

  //delete form db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: true, secure: true });
  return res.status(StatusCodes.NO_CONTENT).json("No cookies found");
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email is required" });
    }

    const foundUser = await User.findOne({ email }).exec();

    const optCode = optGenerater.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const expireTime = new Date().getTime() + 300 * 1000; // 5 MIN

    const optSend = await OTP.create({
      email,
      expiresIn: expireTime,
      code: optCode,
    });
    // const result = optSend;
    const result = sendMail(email, optCode);
    res.status(StatusCodes.OK).json({ result });
    // const result = await sendMail();
  } catch (error) {
    console.log(error);
  }
};


const resetPassword = async (req, res) => {
  const { email, password } = req.body
  try {
    changePassword(email, password)
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
  register,
  login,
  logout,
  sendOTP,
  resetPassword,
};
