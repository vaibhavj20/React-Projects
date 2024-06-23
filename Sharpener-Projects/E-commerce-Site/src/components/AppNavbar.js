import React, { useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Cart from "./Cart";

const AppNavbar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

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
            Cart (0)
          </Button>
        </Container>
      </Navbar>
      {showCart && <Cart handleClose={handleCartClick} />}
    </>
  );
};

export default AppNavbar;
