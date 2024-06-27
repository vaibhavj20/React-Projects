import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
import About from "./components/About";
import productsArr from "./components/Products";
import "./App.css";

function App() {
  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-center mb-4">The Generics</h1>
                <ProductList products={productsArr} />
              </>
            }
          />
          <Route
            path="/store"
            element={<ProductList products={productsArr} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
