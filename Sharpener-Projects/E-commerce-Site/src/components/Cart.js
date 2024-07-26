import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import CartContext from "../context/CartContext";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = ({ handleClose }) => {
  const { cart, removeItemFromCart, updateItemQuantity } =
    useContext(CartContext);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <Container className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-center">Cart</h2>
          <Button variant="outline-secondary" onClick={handleClose}>
            X
          </Button>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={() => removeItemFromCart(item._id)}
                onQuantityChange={(quantity) =>
                  updateItemQuantity(item._id, quantity)
                }
              />
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          <h3>Total ${totalAmount.toFixed(2)}</h3>
          <Button variant="info">PURCHASE</Button>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
