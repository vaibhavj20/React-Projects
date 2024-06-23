import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <Row>
      {products.map((product, index) => (
        <Col md={6} lg={3} className="text-center mb-4" key={index}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="album-cover mb-2"
          />
          <h5>{product.title}</h5>
          <p>${product.price}</p>
          <Button variant="info">ADD TO CART</Button>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
