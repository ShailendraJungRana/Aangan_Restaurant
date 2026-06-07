const mongoose = require("mongoose");

/**
 * Banner Schema
 * Stores homepage carousel/slider banner images.
 */
const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Banner image is required"],
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
