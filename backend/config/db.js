const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || process.env.MONGODB_URL || process.env.DATABASE_URL || process.env.MONGO_URL;

    if (!connString) {
      console.error("DEBUG: MONGO_URI:", process.env.MONGO_URI ? "Defined" : "Undefined");
      console.error("DEBUG: MONGODB_URL:", process.env.MONGODB_URL ? "Defined" : "Undefined");
      console.error("DEBUG: MONGO_URL:", process.env.MONGO_URL ? "Defined" : "Undefined");
      console.error("DEBUG: DATABASE_URL:", process.env.DATABASE_URL ? "Defined" : "Undefined");
      throw new Error("CRITICAL: MongoDB connection string is missing! Please set MONGO_URI, MONGODB_URL, or MONGO_URL in your Railway Variables.");
    }

    console.log("System Check: Attempting to connect to MongoDB...");
    await mongoose.connect(connString);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;