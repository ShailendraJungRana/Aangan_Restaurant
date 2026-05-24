const express = require("express");
const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// GET /api/banners — Get banners (public: active only; admin: ?all=true for all)
router.get("/", getBanners);

// POST /api/banners — Upload a new banner (admin only)
router.post("/", protect, adminOnly, upload.single("image"), createBanner);

// PUT /api/banners/:id — Update a banner (admin only)
router.put("/:id", protect, adminOnly, upload.single("image"), updateBanner);

// DELETE /api/banners/:id — Delete a banner (admin only)
router.delete("/:id", protect, adminOnly, deleteBanner);

module.exports = router;
