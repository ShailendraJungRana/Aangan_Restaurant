// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const CartContext = createContext();

// 2. Create Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // Remove from cart (removes one item at a time)
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index > -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Open cart drawer
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close cart drawer
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      isCartOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom Hook to use Cart
export const useCart = () => useContext(CartContext);
