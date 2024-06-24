import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
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
          <Navbar.Brand as={NavLink} to="/">
            The Generics
          </Navbar.Brand>
          <Nav className="me-auto ms-3">
            <Nav.Link as={NavLink} exact to="/">
              HOME
            </Nav.Link>
            <Nav.Link as={NavLink} to="#store">
              STORE
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              ABOUT
            </Nav.Link>
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
