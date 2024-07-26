import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
const API_URL =
  "https://crudcrud.com/api/08cb2c52ce4d48189076299de7601a46/cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(API_URL);
        setCart(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const addItemToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item.title === product.title);
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        await axios.put(`${API_URL}/${existingItem._id}`, updatedItem);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === existingItem._id ? updatedItem : item
          )
        );
      } else {
        const response = await axios.post(API_URL, { ...product, quantity: 1 });
        setCart((prevCart) => [...prevCart, response.data]);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const updateItemQuantity = async (id, quantity) => {
    try {
      const updatedItem = cart.find((item) => item._id === id);
      if (updatedItem) {
        updatedItem.quantity = quantity;
        await axios.put(`${API_URL}/${id}`, updatedItem);
        setCart((prevCart) =>
          prevCart.map((item) => (item._id === id ? updatedItem : item))
        );
      }
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
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
