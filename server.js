require("dotenv").config();

//  express
const express = require("express");
const app = express();

//  rest of the packages
const cors = require("cors");

//  imports
const connectDB = require("./configs/DbConnect");
const dotenvConfig = require("./configs/dotenv.config");
//  database

//  routersImport

//  middleware

//  routes config

//  port
const start = async () => {
  try {
    
    await connectDB(dotenvConfig.URI);
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
