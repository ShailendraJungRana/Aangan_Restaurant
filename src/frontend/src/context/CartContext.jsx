import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

/**
 * Custom hook to access cart state and actions.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

/**
 * CartProvider
 * Manages cart state with localStorage persistence.
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add item to cart. If it already exists, increment quantity.
   */
  const addToCart = (food) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === food._id);
      if (exists) {
        toast.success(`Added another ${food.name}`);
        return prev.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${food.name} added to cart!`);
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  /**
   * Remove item from cart entirely.
   */
  const removeFromCart = (foodId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== foodId));
    toast.success("Item removed from cart");
  };

  /**
   * Update quantity of a specific item.
   */
  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) {
      removeFromCart(foodId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clear all items from cart.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Total number of items in cart.
   */
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Total price of all items in cart.
   */
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
