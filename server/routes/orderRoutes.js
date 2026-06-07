const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderByNo,
  updateOrder,
  markOrderPaid,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/orders — Place a new order (public)
router.post("/", createOrder);

// GET /api/orders — Get all orders (admin only)
router.get("/", protect, adminOnly, getOrders);

// GET /api/orders/:orderNo — Get order by order number (admin)
router.get("/:orderNo", protect, adminOnly, getOrderByNo);

// PUT /api/orders/:id — Update order status (admin only)
router.put("/:id", protect, adminOnly, updateOrder);

// PUT /api/orders/:id/pay — Mark order as paid (public — called after QR payment)
router.put("/:id/pay", markOrderPaid);

module.exports = router;
