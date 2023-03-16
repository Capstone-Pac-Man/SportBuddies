import React, { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState('')

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //**FOR NOW** console.log userCredential.user to see information offered
      if(userCredential.user.uid){
        setUser(userCredential.user.uid)
      } 
      console.log("SIGN IN SUCCESS");
      console.log(userCredential.user);
    } catch (err) {
      console.error("ERROR!!", err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      //**FOR NOW** console.log userCredential.user to see information offered
      console.log("SIGN IN SUCCESS");
      console.log(userCredential.user);
    } catch (err) {
      console.error("Error!!", err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{width: "50%"}}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
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
            <Link to="/"> 
              <Button variant="primary" type="submit" className="btn">
        		    Login
      		    </Button> 
            </Link>
          </Form>
          <br></br>
          <Link to="/">
            <Button onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;