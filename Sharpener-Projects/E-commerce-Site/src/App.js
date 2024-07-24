import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
import About from "./components/About";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./context/CartContext";
import productsArr from "./components/Products";
import "./App.css";
import AuthForm from "./components/AuthForm";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Router>
          <AppNavbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/store"
                element={
                  <PrivateRoute>
                    <ProductList products={productsArr} />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route
                path="/product/:id"
                element={
                  <PrivateRoute>
                    <ProductDetails products={productsArr} />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
