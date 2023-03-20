import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Logout } from "./UserAuth/LogOut";
import { SearchBar } from "../components/searchBarSports";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <Navbar id="navbar" sticky="top" bg="dark" variant="dark">
      {isLoggedIn ? (
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="/" className="justify-content-center">
            Sport Buddies
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Logout />
              </Nav.Item>
              <Nav.Link href="/me" className="link">
                User Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="/" className="justify-content-center">
            Sport Buddies
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login" className="link">
                Login
              </Nav.Link>
              <Nav.Link href="/signup" className="link">
                Sign Up
              </Nav.Link>
              <Nav.Link href="/venues" className="link">
                Venues
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Item>
            <SearchBar />
          </Nav.Item>
        </Container>
      )}
    </Navbar>
  );
};

export default NavBar;
