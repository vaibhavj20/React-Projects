import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity = parseInt(product.quantity);
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const value = {
    products,
    cart,
    addProduct,
    addToCart,
    setProducts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
