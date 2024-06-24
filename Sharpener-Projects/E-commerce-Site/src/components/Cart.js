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
          <h2 className="text-center">CART</h2>
          <Button variant="outline-secondary" onClick={handleClose}>
            X
          </Button>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => removeItemFromCart(item.title)}
                onQuantityChange={(quantity) =>
                  updateItemQuantity(item.title, quantity)
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
