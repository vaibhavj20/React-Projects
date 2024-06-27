import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import classes from "./ProductDetails.module.css";

const dummyReviews = [
  { user: "John Doe", rating: 5, comment: "Great product!" },
  { user: "Jane Smith", rating: 4, comment: "Very useful and well made." },
  // Add more dummy reviews here
];

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container className={classes.productDetails}>
      <Row>
        <Col md={6}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            fluid
            className={classes.productImage}
          />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <h4>Ratings and Reviews</h4>
          {dummyReviews.map((review, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{review.user}</Card.Title>
                <Card.Text>
                  <strong>Rating: </strong>
                  {review.rating} / 5
                </Card.Text>
                <Card.Text>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
