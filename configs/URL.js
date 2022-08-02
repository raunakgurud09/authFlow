require("dotenv").config();

module.export = {
  MONGO_URI: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.fl4iz.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
};

