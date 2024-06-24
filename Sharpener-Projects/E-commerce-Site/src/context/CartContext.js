import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.title === product.title
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeItemFromCart = (title) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  const updateItemQuantity = (title, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.title === title ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
