const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const {
  uploadUserAvatarImageLocal,
  uploadUserAvatarImage,
} = require("../utils/uploadsController");

const uploadImageUserAvatar = async (req, res) => {
  try {
    //uploads image in public/upload folder
    // if using local image  uncomment line 13,14 and comment line 16

    // const { imageString } = req.body
    // const imageString = await uploadUserAvatarImageLocal(req, res);

    const imageString = await uploadUserAvatarImage(req, res);

    if (!imageString) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You need to send a string" });
    }

    //update the path of the image
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId });
    console.log(user);
    user.image = imageString || "add default string";
    await user.save();

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const userProfile = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No user with this email is found" });
  }
  res.status(StatusCodes.OK).json(user);
};

module.exports = {
  uploadImageUserAvatar,
  userProfile,
};
