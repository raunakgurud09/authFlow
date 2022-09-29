require("dotenv").config();

//  express
const express = require("express");
const app = express();

//  rest of the packages
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoSanitizer = require("express-mongo-sanitize");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

//  import configs
const dotenvConfig = require("./configs/dotenv.config");

//  database
const connectDB = require("./configs/DbConnect");

//  middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: "*" }));
app.use(mongoSanitizer());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(helmet());
app.use(xss());

app.use(express.static("./public"));

//  routersImport
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");

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
