const User = require("../models/User");
const {
  uploadUserAvatarImageLocal,
  uploadUserAvatarImage,
} = require("../utils/uploadsController");

const uploadImageUserAvatar = async (req, res) => {
  try {
    // uploadUserAvatarImageLocal(req, res);
    // uploadUserAvatarImage(req, res);

    //update the path of the image
  } catch (error) {
    // res.send("uploadImageUserAvatar");
    console.log(error)
  }
};


const test = async (req, res) => {
  res.send("test")
}

module.exports = {
  uploadImageUserAvatar,
  test,
};
