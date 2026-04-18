const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || process.env.MONGODB_URL || process.env.DATABASE_URL || process.env.MONGO_URL;

    if (!connString) {
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || process.env.MONGODB_URL || process.env.DATABASE_URL || process.env.MONGO_URL;
    
    if (!connString) {
      throw new Error("MongoDB connection string is missing. Please set MONGO_URI or MONGODB_URL environment variable.");
    }

    await mongoose.connect(connString);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
    await mongoose.connect(connString);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;