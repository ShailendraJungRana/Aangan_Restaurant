const Banner = require("../models/Banner");
const fs = require("fs");
const path = require("path");

/**
 * @desc    Get all active banners
 * @route   GET /api/banners
 * @access  Public
 */
const getBanners = async (req, res) => {
  try {
    // For admin, return all banners; for public, return only active
    const query = req.query.all === "true" ? {} : { isActive: true };
    const banners = await Banner.find(query).sort({ order: 1 });
    res.json(banners);
  } catch (error) {
    console.error("Get banners error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Create a new banner
 * @route   POST /api/banners
 * @access  Admin
 */
const createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const { title, subtitle, order: bannerOrder } = req.body;

    const banner = await Banner.create({
      image: `/uploads/${req.file.filename}`,
      title: title || "",
      subtitle: subtitle || "",
      order: bannerOrder ? Number(bannerOrder) : 0,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("Create banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Update a banner
 * @route   PUT /api/banners/:id
 * @access  Admin
 */
const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const { title, subtitle, isActive, order: bannerOrder } = req.body;

    if (title !== undefined) banner.title = title;
    if (subtitle !== undefined) banner.subtitle = subtitle;
    if (isActive !== undefined) banner.isActive = isActive === "true" || isActive === true;
    if (bannerOrder !== undefined) banner.order = Number(bannerOrder);

    // Update image if new file uploaded
    if (req.file) {
      if (banner.image) {
        const oldPath = path.join(__dirname, "..", banner.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      banner.image = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (error) {
    console.error("Update banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Delete a banner
 * @route   DELETE /api/banners/:id
 * @access  Admin
 */
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete image file
    if (banner.image) {
      const imagePath = path.join(__dirname, "..", banner.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBanners, createBanner, updateBanner, deleteBanner };
