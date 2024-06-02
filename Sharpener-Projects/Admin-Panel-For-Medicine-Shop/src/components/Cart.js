import React, { useContext } from "react";
import { MedicineContext } from "../context/CartContext";

const Cart = () => {
  const { cart } = useContext(MedicineContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span>
              {item.name} - Quantity: {item.quantity} - Total Price: $
              {item.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
};

export default Cart;
