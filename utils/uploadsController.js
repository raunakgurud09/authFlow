const path = require("path");
const fs = require("fs");

const uploadUserAvatarImageLocal = async (req, res) => {
  console.log("uploadUserAvatarImageLocal");
  res.send('hi from here')
};

module.exports = {
  uploadUserAvatarImageLocal,
};
