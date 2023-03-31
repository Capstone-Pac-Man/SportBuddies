import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Logout } from "./UserAuth/LogOut";
import { SearchBar } from "../components/searchBarSports";
import {
  fetchOneUserAsync,
  selectUser,
  editUserAsync,
} from "../reducers/userSlice";
import { Link } from "react-router-dom";
import LocationChange from "./locationChange";

const NavBar = ({ location, setLocation }) => {
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
  const handleAvailable = (e) => {
    if (e.target.value === "remove") {
      dispatch(editUserAsync({ availableTo: 0 }));
    } else if (e.target.value === "add") {
      const twelveHoursFromNow = new Date(Date.now() + 12 * 60 * 60 * 1000);
      const obj = { availableTo: twelveHoursFromNow.getTime() };
      dispatch(editUserAsync(obj));
    }
  };
  let isAvailableToInFuture;

  if (user) {
    if (user.availableTo) {
      const currentTime = Date.now();
      const availableToTime = user.availableTo;
      isAvailableToInFuture = availableToTime > currentTime;
    }
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" style={{ width: "100%" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Sport Buddies
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ width: "100%", display: "flex" }}>
            <Nav.Link as={Link} className="link nav-link" to="/players">
              Players
            </Nav.Link>
            <Nav.Link as={Link} className="link nav-link" to="/venues">
              Venues
            </Nav.Link>

            <NavDropdown title="Profile" id="basic-nav-dropdown" variant="dark">
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item as={Link} to="/chatroom">
                    Messages
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/me">
                    View Profile
                  </NavDropdown.Item>
                  {isAvailableToInFuture ? (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      value="remove"
                      onClick={handleAvailable}>
                      Make Unavailable
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success btn-sm"
                      value="add"
                      onClick={handleAvailable}>
                      Make Available
                    </button>
                  )}
                  <NavDropdown.Item>
                    <Logout />
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="login">
                    Log in
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="signup">
                    Sign up
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <div className="d-flex" style={{ minWidth: "50%" }}>
            <SearchBar />
            <Nav.Item
              style={{ display: "flex", alignItems: "center", paddingLeft: 20 }}
              className="link nav-link d-flex">
              <LocationChange location={location} setLocation={setLocation} />
            </Nav.Item>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
