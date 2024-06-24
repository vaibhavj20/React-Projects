import React from "react";
import AppNavbar from "./components/AppNavbar";
import ProductList from "./components/ProductList";
import productsArr from "./components/Products";
import "./App.css";

function App() {
  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">The Generics</h1>
        <ProductList products={productsArr} />
      </div>
    </div>
  );
}

export default App;
