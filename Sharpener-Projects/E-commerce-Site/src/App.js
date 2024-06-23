import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import AppNavbar from "./components/Navbar";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import productsArr from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Header />
      <Container className="music-section py-5">
        <h2 className="text-center mb-4">MUSIC</h2>
        <ProductList products={productsArr} />
      </Container>
    </div>
  );
}

export default App;
