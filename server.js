require("dotenv").config();

//  express
const express = require("express");
const app = express();

//  rest of the packages
const cors = require("cors");

//  imports
const connectDB = require('./configs/DbConnect')

//  database

//  routersImport

//  middleware

//  routes config

//  port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
