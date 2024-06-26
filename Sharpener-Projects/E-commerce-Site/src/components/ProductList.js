import React, { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import CartContext from "../context/CartContext";
import "./ProductList.css";

const ProductList = ({ products }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <Row>
      {products.map((product, index) => (
        <Col key={index} xs={12} md={6} lg={4} className="mb-4">
          <Card className="product-card">
            <Card.Img
              variant="top"
              src={product.imageUrl}
              className="product-image"
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price.toFixed(2)}</Card.Text>
              <Button
                className="add-to-cart-button"
                onClick={() => addItemToCart(product)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
