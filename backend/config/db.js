const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI ||
                       process.env.MONGODB_URL ||
                       process.env.DATABASE_URL ||
                       process.env.MONGO_URL;

    if (!connString) {
      console.error("ERROR: MongoDB connection string is missing.");
      console.error("Please set MONGO_URI, MONGODB_URL, DATABASE_URL, or MONGO_URL in your environment variables.");
      process.exit(1);
    }

    await mongoose.connect(connString);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
