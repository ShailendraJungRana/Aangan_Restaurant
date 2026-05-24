const express = require("express");
const { loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/login — Admin login
router.post("/login", loginUser);

// GET /api/auth/me — Get logged-in user profile (protected)
router.get("/me", protect, getMe);

module.exports = router;
