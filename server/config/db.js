const mongoose = require("mongoose");

const MAX_RETRIES = 10;
const RETRY_MS = 5000;

let isConnected = false;

const connectDB = async (attempt = 1) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB connection error: ${error.message}`);

    const isDev = process.env.NODE_ENV !== "production";
    if (isDev && attempt < MAX_RETRIES) {
      console.log(
        `↻ Retrying in ${RETRY_MS / 1000}s (${attempt}/${MAX_RETRIES}) — check MONGO_URI in server/.env`,
      );
      setTimeout(() => connectDB(attempt + 1), RETRY_MS);
      return;
    }

    if (isDev) {
      console.error(
        "⚠ API will return 503 until MongoDB connects. Fix MONGO_URI (Atlas password, IP allowlist, or use local mongodb://127.0.0.1:27017/aangan).",
      );
      return;
    }

    process.exit(1);
  }
};

const isDbReady = () =>
  isConnected && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isDbReady = isDbReady;
