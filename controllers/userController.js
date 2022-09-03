const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const {
  uploadUserAvatarImageLocal,
  uploadUserAvatarImage,
} = require("../utils/uploadsController");

const uploadImageUserAvatar = async (req, res) => {
  try {
    
    // const { imageString } = req.body
    // const imageString = await uploadUserAvatarImageLocal(req, res);
    const imageString = await uploadUserAvatarImage(req, res);


    if (!imageString) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "You need to send a string" });
    }

    //update the path of the image
    const { userId } = req.user

    const user = await User.findOne({ _id: userId })
    console.log(user)
    user.image = imageString || "123"
    await user.save();

    res.status(StatusCodes.OK).json({ user })

  } catch (error) {
    // res.send("uploadImageUserAvatar");
    console.log(error)
  }
};

const userProfile = async (req, res) => {
  res.json(req.user)
}
const test = async (req, res) => {
  // res.json({ req })
  // console.log()
  res.send("test")
}

module.exports = {
  uploadImageUserAvatar,
  test,
  userProfile,
};
