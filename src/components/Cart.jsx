// src/pages/Cart.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import qrImage from "../assets/QR.jpg"; // Add a QR image

const Cart = () => {
    const { cartItems, clearCart } = useCart();
    const [showQR, setShowQR] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
  
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  
    const handleOrder = () => {
      setShowQR(true);
      setOrderConfirmed(true);
    };
  
    const handleClose = () => {
      setShowQR(false);
      clearCart(); // optional: clears the cart after order is placed
    };
  
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
  
        {cartItems.length === 0 && !orderConfirmed ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cartItems.map((item, idx) => (
                <li key={idx} className="flex justify-between py-2 border-b">
                  <span>{item.title}</span>
                  <span>Rs {item.price}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold mb-4">Total: Rs {total}</p>
  
            {!orderConfirmed && (
              <button
                onClick={handleOrder}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Order
              </button>
            )}
          </>
        )}
  
        {/* QR Popup */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full relative shadow-lg text-center">
              <h3 className="text-xl font-bold mb-2 text-green-600">Order Placed!</h3>
              <p className="text-gray-700 mb-2">
                Scan the QR code to pay <br />
                <span className="font-semibold text-lg">Rs {total}</span>
              </p>
              <img src={qrImage} alt="QR Code" className="w-48 h-48 mx-auto mb-3" />
              <p className="text-xs text-gray-500">Use Khalti / eSewa / IMEpay or any scanner app.</p>
              <button
                onClick={handleClose}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;