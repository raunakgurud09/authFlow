const User = require("../models/User");
const OTP = require("../models/OTP");

const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const optGenerator = require("otp-generator");

const sendMail = require("../utils/sendMails");
const changePassword = require("../utils/changePassword");
const { createTokenUser, attachCookiesToResponse } = require("../utils/jwt");
const { use } = require("../routes/authRoutes");
const { create } = require("../models/OTP");
const sendVerificationMail = require("../utils/sendVerificationEmail");

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

  //pre userSchema to change password

  try {
    const user = await User.create({
      name,
      email,
      role: role || "user",
      password,
    });
    await user.save();

    const origin = "http://localhost:5000/api/v1";
    const verificationToken = crypto.randomBytes(40).toString("hex");

    user.verificationToken = verificationToken;
    await user.save();

    const result = await sendVerificationMail({
      name: user.name,
      email,
      verificationToken,
      origin,
    });
    console.log(result);
    res
      .status(StatusCodes.CREATED)
      .json({ user, message: "verification mail sent to your email" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const login = async (req, res) => {
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

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials..." });
  }
  const tokenUser = createTokenUser(user);

  let refreshToken = "";
  const existingToken = user.refreshToken;
  if (existingToken) {
    refreshToken = existingToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return res.status(StatusCodes.OK).json({ user: tokenUser });
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  user.refreshToken = refreshToken;
  await user.save();

  const { token } = attachCookiesToResponse({
    res,
    user: tokenUser,
    refreshToken,
  });
  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const logout = async (req, res) => {
  const cookie = res.cookie;
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email is required" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No user with this email is found" });
  }

  const optCode = optGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const expireTime = new Date().getTime() + 300 * 1000; // 5 MIN
  try {
    user.code = [
      await OTP.create({
        expiresIn: expireTime,
        code: optCode,
      }),
    ];

    await user.save();

    const result = await sendMail(email, optCode);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email is required" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No user with this email is found" });
  }
  const origin = "http://localhost:5000/api/v1";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  user.verificationToken = verificationToken;
  await user.save();

  try {
    const result = await sendVerificationMail({
      name: user.name,
      email,
      verificationToken,
      origin,
    });
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.log(error.message);
  }
};

const checkVerificationEmail = async (req, res) => {
  const { token, email } = req.query;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No user with this email is found" });
  }

  if (user.verificationToken !== token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "verification code did not match" });
  }

  user.isVerified = true;
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    changePassword(email, password);
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  sendOTP,
  verifyEmail,
  checkVerificationEmail,
  resetPassword,
};
