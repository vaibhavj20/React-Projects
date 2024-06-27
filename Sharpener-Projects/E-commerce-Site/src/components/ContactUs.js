import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(
        "https://e-commerce-contact-e9588-default-rtdb.firebaseio.com//users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        alert("Data submitted successfully");
        setName("");
        setEmail("");
        setPhone("");
      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      alert("Error submitting data");
      console.error("There was an error submitting the data!", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
