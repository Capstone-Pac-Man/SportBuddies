import React, { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      // After successful login, send sign in request to backend api.
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: auth.currentUser.email,
        },
        { withCredentials: true }
      );
      if (data.name) {
        localStorage.setItem("auth", true);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("ERROR!!", err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      //**FOR NOW** console.log userCredential.user to see information offered
      console.log("SIGN IN SUCCESS");
      console.log(userCredential.user);
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          providerId: userCredential.user.providerData[0].providerId,
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        },
        { withCredentials: true }
      );
      if (data.name) {
        localStorage.setItem("auth", true);
      }
    } catch (err) {
      console.error("Error!!", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ width: "50%", marginTop:"20%" }}>
        <Card.Body>
          <Card.Title>Log in</Card.Title>
          <Form onSubmit={handleSignIn} name="login" className="form">
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
                className="formInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button
              type="submit"
              className="myBtn"
              disabled={email === "" || password.length === 0}
            >
              Log in
            </Button>
          </Form>
          <br></br>
          <Link to="/">
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
