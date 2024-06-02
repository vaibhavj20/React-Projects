import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductForm.css";

function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const { addProduct } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, description, price: parseFloat(price), quantity: 1 });
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>Medicine Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
