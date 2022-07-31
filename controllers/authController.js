const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if ((!email, !password)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email and Password are required" });
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    res.status(StatusCodes.CONFLICT).json({ message: "Email already exist" });
  }

  const verificationToken = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
      verificationToken,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ success: `New user ${user} created!` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const login = async (req, res) => {
  res.send("login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  login,
  logout,
};
