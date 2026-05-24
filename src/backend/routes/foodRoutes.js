const express = require("express");
const {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getCategories,
} = require("../controllers/foodController");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// GET /api/foods/categories/list — Get all unique categories
// (placed before /:id to avoid conflict)
router.get("/categories/list", getCategories);

// GET /api/foods — Get all food items (with optional query filters)
router.get("/", getFoods);

// GET /api/foods/:id — Get single food item
router.get("/:id", getFoodById);

// POST /api/foods — Create food item (admin only, with image upload)
router.post("/", protect, adminOnly, upload.single("image"), createFood);

// PUT /api/foods/:id — Update food item (admin only)
router.put("/:id", protect, adminOnly, upload.single("image"), updateFood);

// DELETE /api/foods/:id — Delete food item (admin only)
router.delete("/:id", protect, adminOnly, deleteFood);

module.exports = router;
