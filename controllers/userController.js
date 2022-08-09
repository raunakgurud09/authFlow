const User = require("../models/User");
const {
  uploadUserAvatarImageLocal,
  uploadUserAvatarImage,
} = require("../utils/uploadsController");

const uploadImageUserAvatar = async (req, res) => {
  try {
    // uploadUserAvatarImageLocal(req, res);
    // uploadUserAvatarImage(req, res);
  } catch (error) {
    // res.send("uploadImageUserAvatar");
    console.log(error)
  }
};

module.exports = {
  uploadImageUserAvatar,
};
