require("dotenv").config();

//  express
const express = require("express");
const app = express();

//  rest of the packages
const cors = require("cors");
const fileUpload = require("express-fileupload");

//  import configes
const connectDB = require("./configs/DbConnect");
const dotenvConfig = require("./configs/dotenv.config");
const { cloudinary } = require("./configs/cloudinary");
//  database

//  routersImport
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

//  middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));


//  routes config
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

//  port
const start = async () => {
  try {
    await connectDB(dotenvConfig.CLOUD_MONGO_URI);
    app.listen(dotenvConfig.PORT, dotenvConfig.HOST, () => {
      console.log(
        `APP LISTENING ON http://${dotenvConfig.HOST}:${dotenvConfig.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
