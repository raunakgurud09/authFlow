const User = require("../models/User");
const { uploadUserAvatarImageLocal } = require("../utils/uploadsController");

const uploadImageUserAvatar = async (req, res) => {
  try {
    uploadUserAvatarImageLocal(req, res);
  } catch (error) {
    res.send("uploadImageUserAvatar");
  }
};

module.exports = {
  uploadImageUserAvatar,
};
