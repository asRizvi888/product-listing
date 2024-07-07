const mongoose = require("mongoose");

// Connect to MongoDB

const MONGODB_CONNECTION_STRING = `${process.env.MONGODB_URL}`;

const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
