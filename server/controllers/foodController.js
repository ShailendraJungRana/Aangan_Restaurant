const Food = require("../models/Food");
const fs = require("fs");
const path = require("path");

/**
 * @desc    Get all food items
 * @route   GET /api/foods
 * @access  Public
 */
const getFoods = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category if provided (case-insensitive)
    if (category && category !== "all" && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // Search by name if provided
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    console.error("Get foods error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get single food item by ID
 * @route   GET /api/foods/:id
 * @access  Public
 */
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json(food);
  } catch (error) {
    console.error("Get food error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Create a new food item
 * @route   POST /api/foods
 * @access  Admin
 */
const createFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Build image path if file was uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const food = await Food.create({
      name,
      description,
      price: Number(price),
      category,
      image,
    });

    res.status(201).json(food);
  } catch (error) {
    console.error("Create food error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update a food item
 * @route   PUT /api/foods/:id
 * @access  Admin
 */
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const { name, description, price, category, isAvailable } = req.body;

    // Update fields
    if (name) food.name = name;
    if (description) food.description = description;
    if (price) food.price = Number(price);
    if (category) food.category = category;
    if (isAvailable !== undefined) food.isAvailable = isAvailable === "true" || isAvailable === true;

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image file if it exists
      if (food.image) {
        const oldPath = path.join(__dirname, "..", food.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      food.image = `/uploads/${req.file.filename}`;
    }

    const updatedFood = await food.save();
    res.json(updatedFood);
  } catch (error) {
    console.error("Update food error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Delete a food item
 * @route   DELETE /api/foods/:id
 * @access  Admin
 */
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Delete image file if it exists
    if (food.image) {
      const imagePath = path.join(__dirname, "..", food.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    console.error("Delete food error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all unique categories
 * @route   GET /api/foods/categories/list
 * @access  Public
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Food.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getCategories,
};
