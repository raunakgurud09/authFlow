const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, roles } = req.body;
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

  const hashPassword = await bcrypt.hash(password, 10);
  // const verificationToken = ;

  try {
    const user = await User.create({
      name,
      email,
      roles,
      password: hashPassword,
    });

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const login = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookies available at login: ${JSON.stringify(cookies)}`);

  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required." });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No user with this email is found" });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (isMatch) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      if (!foundToken) {
        console.log(`attempt refresh token reuse to login`);
        newRefreshTokenArray = [];
      }

      res.clearCookies("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    console.log(result);

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ roles, accessToken });
  } else {
    res.status(StatusCodes.UNAUTHORIZED);
  }
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
