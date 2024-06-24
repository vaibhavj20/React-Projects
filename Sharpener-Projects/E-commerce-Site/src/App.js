import React from "react";
import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ProductList from "./components/ProductList";
import productsArr from "./components/Products";
import About from "./components/About";
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
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
