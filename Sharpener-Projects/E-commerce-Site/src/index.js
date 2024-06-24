import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";

ReactDOM.render(
  <CartProvider>
    <Router>
      <App />
    </Router>
  </CartProvider>,
  document.getElementById("root")
);
