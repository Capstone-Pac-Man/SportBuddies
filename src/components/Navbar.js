import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Logout } from "./UserAuth/LogOut";
import { SearchBar } from "../components/searchBarSports";
import { fetchOneUserAsync, selectUser } from "../reducers/userSlice";
import { Link } from "react-router-dom";

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

  return (
    <Navbar className="navbar" sticky="top" bg="dark" variant="dark">
      {isLoggedIn ? (
        <Container className="justify-content-around" fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav style={{ width: "33%", whitespace: "nowrap" }}>
            <Link to="/me" className="link nav-link">
              Hi, {user.firstName}
            </Link>
            <Nav.Item>
              <Logout />
            </Nav.Item>
          </Nav>
          <Link to="/" className="link">
            <h4 style={{ color: "white" }}>Sport Buddies</h4>
          </Link>
          <Nav style={{ width: "33%" }}>
            <Link to="/venues" className="link nav-link">
              Venues
            </Link>
            <Link to="/players" className="link nav-link">
              Players
            </Link>
            <SearchBar />
          </Nav>
        </Container>
      ) : (
        <Container className="justify-content-around" fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <Link to="/login" className="link nav-link">
              Login
            </Link>
            <Link to="/signup" className="link nav-link">
              Sign Up
            </Link>
            <Link to="/venues" className="link nav-link">
              Venues
            </Link>
            <Link to="/players" className="link nav-link">
              Players
            </Link>
          </Nav>
          <Link to="/" className="link">
            <h4 style={{ color: "white" }}>Sport Buddies</h4>
          </Link>
          <Nav.Item>
            <SearchBar />
          </Nav.Item>
        </Container>
      )}
    </Navbar>
  );
};

export default NavBar;
