import React from "react";
import { Button, FormControl } from "react-bootstrap";
import "./CartItem.css";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      onQuantityChange(quantity);
    }
  };

  return (
    <tr>
      <td>
        <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
        {item.title}
      </td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <FormControl
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          style={{ width: "60px", display: "inline-block" }}
        />
      </td>
      <td>
        <Button variant="danger" onClick={onRemove}>
          REMOVE
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
