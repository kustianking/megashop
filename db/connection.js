import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const dbURL = process.env.DBURL;

const connectDB = async () => {
  try {
    mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to database has been successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
