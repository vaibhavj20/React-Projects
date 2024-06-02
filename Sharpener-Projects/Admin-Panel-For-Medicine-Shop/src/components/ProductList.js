import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductList.css";

function ProductList() {
  const { products, addToCart, setProducts } = useContext(CartContext);

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(value);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map((product, index) => (
          <li key={index} className="product-item">
            <div>
              <h3>{product.name}</h3>
              <p>
                {product.description} | Price: ${product.price} | Quantity:
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </p>
            </div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
