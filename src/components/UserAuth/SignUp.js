import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { signUpThunk } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const name = firstName + " " + lastName;
      const uid = userCredential.user.uid;

      dispatch(signUpThunk({ name, email, state, zipcode, uid }));

      console.log("SIGN UP SUCCESS");
      console.log(userCredential.user);
      console.log(userCredential);
    } catch (err) {
      console.error("ERROR!!", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ width: "50%" }}>
        <Card.Body>
          <Card.Title className="title">Sign Up</Card.Title>
          <Form onSubmit={handleSignUp} name="signup" className="form">
            <Form.Group controlId="fullname">
              <Row>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="state-zipcode">
              <Row>
                <Col>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>Zip code</Form.Label>
                  <Form.Control
                    className="formInput"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

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
