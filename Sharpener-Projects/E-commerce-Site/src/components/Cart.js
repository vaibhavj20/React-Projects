import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import CartItem from "./CartItem";
import "./Cart.css";

const cartElements = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 2,
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 3,
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    quantity: 1,
  },
];

const Cart = ({ handleClose }) => {
  const [cartItems, setCartItems] = useState(cartElements);

  const handleRemove = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleQuantityChange = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  const totalAmount = cartItems.reduce(
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
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => handleRemove(index)}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(index, quantity)
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
