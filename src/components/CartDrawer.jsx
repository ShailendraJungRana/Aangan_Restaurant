import React from "react";
import { useCart } from "../context/CartContext";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Get unique cart items with quantities
  const uniqueCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // Handle checkout
  const handleCheckout = () => {
    onClose();
    navigate('/ordernow');
  };

  // Handle remove all of one item
  const handleRemoveAll = (itemId) => {
    const itemsToRemove = cartItems.filter(item => item.id === itemId);
    itemsToRemove.forEach(() => removeFromCart(itemId));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-stone-900">Your Cart</h2>
              {cartItems.length > 0 && (
                <span className="bg-emerald-600 text-white text-sm font-semibold px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {uniqueCartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-24 h-24 text-stone-300 mb-4" />
                <p className="text-xl font-semibold text-stone-700 mb-2">Your cart is empty</p>
                <p className="text-stone-500 mb-6">Add some delicious items to get started!</p>
                <button
                  onClick={handleCheckout}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {uniqueCartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-stone-50 rounded-lg p-4 border border-stone-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image_url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border border-stone-200"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop";
                          }}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-stone-900 text-lg mb-1">
                              {item.name}
                            </h3>
                            <p className="text-emerald-600 font-bold text-lg">
                              Rs {item.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveAll(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                            title="Remove all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1 border border-stone-200">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                            >
                              <Minus className="w-4 h-4 text-stone-600" />
                            </button>
                            <span className="font-semibold text-stone-900 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                            >
                              <Plus className="w-4 h-4 text-stone-600" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-stone-500">Subtotal</p>
                            <p className="font-bold text-stone-900">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {uniqueCartItems.length > 0 && (
            <div className="border-t border-stone-200 p-6 bg-white">
              {/* Summary */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-stone-900">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">Rs {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Proceed to Checkout
                </button>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-red-600 hover:text-red-700 px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;

