import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QRPaymentModal from "../components/QRPaymentModal";
import API from "../api/axios";
import toast from "react-hot-toast";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

/**
 * Checkout Page
 * Customer fills in delivery details and places an order.
 * On confirmation, a QR payment modal appears.
 */
const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const deliveryFee = 2.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + deliveryFee + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!form.customerName || !form.customerEmail || !form.customerPhone || !form.deliveryAddress) {
      toast.error("Please fill in all fields");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        ...form,
        items: cartItems.map((item) => ({
          food: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice: grandTotal,
      };

      const { data } = await API.post("/api/orders", orderData);
      setOrder(data);
      setShowQR(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    clearCart();
    setShowQR(false);
    navigate("/");
    toast.success("Thank you! Your order is being prepared 🎉");
  };

  if (cartItems.length === 0 && !showQR) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-white rounded-2xl shadow-sm border border-orange-50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Delivery Information
                </h3>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="customerEmail"
                      value={form.customerEmail}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <HiOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      name="customerPhone"
                      value={form.customerPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <HiOutlineLocationMarker className="absolute left-3.5 top-3.5 text-slate-400" />
                    <textarea
                      name="deliveryAddress"
                      value={form.deliveryAddress}
                      onChange={handleChange}
                      placeholder="123 Main St, Apt 4B, New York, NY 10001"
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit (mobile) */}
              <button
                type="submit"
                disabled={submitting}
                className="lg:hidden w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? "Placing Order..." : `Confirm Order — $${grandTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-orange-50 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Your Order
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-slate-600 truncate mr-2">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-medium text-slate-800 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-100 pt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="text-xl font-bold text-orange-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="hidden lg:block mt-6 w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Payment Modal */}
      {showQR && order && (
        <QRPaymentModal
          order={order}
          onClose={() => setShowQR(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default Checkout;
