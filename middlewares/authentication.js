const { signedCookies } = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "You need to sign in first" });
  }

  try {
    const payload = isTokenValid(token);

    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    console.log(error);
  }
};

const authUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.cookies;
  if (!refreshToken && !accessToken) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "You need to sign in first" });
  }

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = User.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Authentication Invalid" });
    }
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.users;
    next();
  } catch (error) {
    console.log(error);
  }
  next();
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized to access this route" });
    }
    next();
  };
};

const validateUser = async (req, res, next) => {
  const user = req.user;
  const { userId } = user;

  try {
    const findUser = await User.findOne({ _id: userId });
    // if(!findUser){
    //     return res.status(StatusCodes.BAD_REQUEST).json({message:"No user found with this id"})
    // }
    if ((findUser._id === userId || user.role === "admin", "superadmin")) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authenticateUser,
  authorizePermissions,
  authUser,
  validateUser,
};
