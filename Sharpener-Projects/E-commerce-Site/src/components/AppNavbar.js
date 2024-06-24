import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import CartContext from "../context/CartContext";
import Cart from "./Cart";

const AppNavbar = () => {
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">The Generics</Navbar.Brand>
          <Nav className="me-auto ms-3">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#store">STORE</Nav.Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
          </Nav>
          <Button variant="outline-info" onClick={handleCartClick}>
            Cart ({totalItems})
          </Button>
        </Container>
      </Navbar>
      {showCart && <Cart handleClose={handleCartClick} />}
    </>
  );
};

export default AppNavbar;
