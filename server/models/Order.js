const mongoose = require("mongoose");

/**
 * Counter Schema
 * Used to generate sequential order numbers (ORD-YYYY-NNNN).
 * A single document per year tracks the last used sequence number.
 */
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g. "order_2026"
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

/**
 * Order Schema
 * Stores complete order information including items, customer details,
 * payment status, and order lifecycle status.
 */
const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      lowercase: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone is required"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Preparing", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook: Auto-generate unique order number (ORD-YYYY-NNNN)
 * Uses an atomic counter to prevent duplicates under concurrency.
 */
orderSchema.pre("save", async function (next) {
  if (this.orderNo) return next(); // Skip if already set

  const year = new Date().getFullYear();
  const counterId = `order_${year}`;

  const counter = await Counter.findByIdAndUpdate(
    counterId,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.orderNo = `ORD-${year}-${String(counter.seq).padStart(4, "0")}`;
  next();
});

module.exports = mongoose.model("Order", orderSchema);
