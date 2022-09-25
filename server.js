require("dotenv").config();
require('./utils/google.auth')
//  express
const express = require("express");
const app = express();

//  rest of the packages
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const passport = require('passport')

//  import configs
const connectDB = require("./configs/DbConnect");
const dotenvConfig = require("./configs/dotenv.config");
const { cloudinary } = require("./configs/cloudinary");
//  database

//  routersImport
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");

//  middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Google</a>');
});

app.get("/google/callback", (req, res) => {
  res.send("<p>redirect</p>");
});
app.get("/bad", (req, res) => {
  res.send("<p>bad</p>");
});
app.get("/good", (req, res) => {
  res.send("<p>good</p>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email","profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {successRedirect:'/good', failureRedirect: "/bad" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

//  routes config
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoute);

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
