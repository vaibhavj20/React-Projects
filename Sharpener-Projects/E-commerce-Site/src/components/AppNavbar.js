import React, { useContext, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Cart from "./Cart";

const AppNavbar = () => {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleStoreClick = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/store" } });
    } else {
      navigate("/store");
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            The Generics
          </Navbar.Brand>
          <Nav className="me-auto ms-3">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link as="span" onClick={handleStoreClick}>
              STORE
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              ABOUT
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              CONTACT US
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Button variant="outline-light" onClick={logout}>
                LOGOUT
              </Button>
            )}
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
