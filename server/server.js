const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const { isDbReady } = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ---------------------
// Middleware
// ---------------------
const clientOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173,http://localhost:5174"
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: clientOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check (works even when DB is down)
app.get("/api/health", (req, res) => {
  res.json({
    status: isDbReady() ? "ok" : "degraded",
    db: isDbReady(),
    message: "Aangan Restaurant API is running",
  });
});

app.use("/api", (req, res, next) => {
  if (!isDbReady()) {
    return res.status(503).json({
      message:
        "Database not connected. Check MONGO_URI in server/.env (Atlas credentials or local MongoDB).",
    });
  }
  next();
});

// ---------------------
// API Routes
// ---------------------
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);

// ---------------------
// Error Handling
// ---------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// ---------------------
// Start Server
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
