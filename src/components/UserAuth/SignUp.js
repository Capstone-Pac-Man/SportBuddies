import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Card } from 'react-bootstrap';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //**FOR NOW** console.log userCredential.user to see information offered
      console.log("SIGN UP SUCCESS");
      console.log(userCredential.user);
      console.log(userCredential);
    } catch (err) {
      console.error("ERROR!!", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{width: "50%"}}>
        <Card.Body>
          <Card.Title className="title">Sign Up</Card.Title>
          <Form onSubmit={handleSignUp} name="signup" className="form">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="formInput"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
			      </Form.Group>
            <Form.Group controlId="password">
			        <Form.Label>Password</Form.Label>
				      <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
			      </Form.Group>
            <br></br>
			      <Button variant="primary" type="submit" className="btn">
        		  Sign Up
      		  </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
