const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5000,
  CLOUD_MONGO_URI: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.fl4iz.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  LOCAL_MONGO_URI: `mongodb://localhost:27017/${process.env.DATABASE_NAME}`
};
