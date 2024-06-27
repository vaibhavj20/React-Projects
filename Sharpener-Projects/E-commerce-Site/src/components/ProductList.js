// import React, { useContext } from "react";
// import { Row, Col, Card, Button } from "react-bootstrap";
// import CartContext from "../context/CartContext";
// import "./ProductList.css";

// const ProductList = ({ products }) => {
//   const { addItemToCart } = useContext(CartContext);

//   return (
//     <Row>
//       {products.map((product, index) => (
//         <Col key={index} xs={12} md={6} lg={4} className="mb-4">
//           <Card className="product-card">
//             <Card.Img
//               variant="top"
//               src={product.imageUrl}
//               className="product-image"
//             />
//             <Card.Body>
//               <Card.Title>{product.title}</Card.Title>
//               <Card.Text>${product.price.toFixed(2)}</Card.Text>
//               <Button
//                 className="add-to-cart-button"
//                 onClick={() => addItemToCart(product)}
//               >
//                 Add to Cart
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default ProductList;

import React, { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import styles from "./ProductList.module.css";

const ProductList = ({ products }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <Row>
      {products.map((product, index) => (
        <Col key={index} xs={12} md={6} lg={4} className="mb-4">
          <Link to={`/product/${index}`} className={styles.productLink}>
            <Card className={styles.productCard}>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                className={styles.productImage}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <Button
                  className={styles.addToCartButton}
                  onClick={(e) => {
                    e.preventDefault();
                    addItemToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
