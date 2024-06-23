import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "./Navbar.css";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">The Generics</Navbar.Brand>
        <Nav className="me-auto ms-3">
          {" "}
          {/* Added ms-3 class for margin spacing */}
          <Nav.Link href="#home">HOME</Nav.Link>
          <Nav.Link href="#store">STORE</Nav.Link>
          <Nav.Link href="#about">ABOUT</Nav.Link>
        </Nav>
        <Button variant="outline-info">Cart (0)</Button>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
