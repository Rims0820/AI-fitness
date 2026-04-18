const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true
};

// Use the restrictive CORS setup if a specific FRONTEND_URL is provided,
// otherwise allow all (for easier initial development)
if (process.env.FRONTEND_URL) {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/diet", require("./routes/dietRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));

app.get("/", (req, res) => {
  res.send("AI Fitness Coach API is running");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
