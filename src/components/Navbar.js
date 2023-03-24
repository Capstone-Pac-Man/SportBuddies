import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Logout } from "./UserAuth/LogOut";
import { SearchBar } from "../components/searchBarSports";
import { fetchOneUserAsync, selectUser } from "../reducers/userSlice";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(fetchOneUserAsync(uid));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  // if (!auth.currentUser) return "Loading"
  // if (!user) return "Loading";
  console.log(user);
  return (
    <Navbar className="navbar" sticky="top" bg="dark" variant="dark">
      {isLoggedIn ? (
        <Container className="justify-content-around" fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <Nav.Link href="/me" className="link">
              Hi, {user.firstName}
            </Nav.Link>
            <Nav.Item>
              <Logout />
            </Nav.Item>
          </Nav>
          <Navbar.Brand href="/">Sport Buddies</Navbar.Brand>
          <Nav.Item>
            <SearchBar />
          </Nav.Item>
        </Container>
      ) : (
        <Container className="justify-content-around" fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
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
          <Navbar.Brand href="/">Sport Buddies</Navbar.Brand>
          <Nav.Item>
            <SearchBar />
          </Nav.Item>
        </Container>
      )}
    </Navbar>
  );
};

export default NavBar;
