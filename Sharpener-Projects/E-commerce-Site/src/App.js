// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AppNavbar from "./components/AppNavbar";
// import ProductList from "./components/ProductList";
// import ContactUs from "./components/ContactUs";
// import About from "./components/About";
// import productsArr from "./components/Products";
// import Home from "./components/Home";
// import "./App.css";

// function App() {
//   return (
//     <div>
//       <AppNavbar />
//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/store"
//             element={<ProductList products={productsArr} />}
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<ContactUs />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
import About from "./components/About";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails"; // New component
import { CartProvider } from "./context/CartContext";
import productsArr from "./components/Products"; // Your products array
import "./App.css";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <CartProvider>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/store"
            element={<ProductList products={productsArr} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/product/:id"
            element={<ProductDetails products={productsArr} />}
          />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
