const path = require("path");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
// require("../public/uploads")

const uploadUserAvatarImageLocal = async (req, res) => {
  if (!req.files) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "No file are uploaded" });
  }
  const userImage = req.files.files;
  if (!userImage.mimetype.startsWith("image")) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Upload Image" });
  }

  const maxSize = 5 * 1024 * 1024; //5MB
  if (userImage.size > maxSize) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Upload Image of less than 1MB" });
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads" + `${userImage.name}`
  );

  await userImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${userImage.name}` } });
};

module.exports = {
  uploadUserAvatarImageLocal,
};
