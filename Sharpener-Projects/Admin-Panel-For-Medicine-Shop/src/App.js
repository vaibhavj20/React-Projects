import React, { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="app-container">
        <ProductForm />
        <ProductList />
        <button className="cart-button" onClick={toggleCart}>
          Cart
        </button>
        {isCartOpen && <CartModal onClose={toggleCart} />}
      </div>
    </CartProvider>
  );
}

export default App;
