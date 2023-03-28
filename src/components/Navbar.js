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
import { fetchOneUserAsync, selectUser } from "../reducers/userSlice";
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
  // if (!auth.currentUser) return "Loading"
  // if (!user) return "Loading";

  // return (
  //   <Navbar
  //     sticky="top"
  //     bg="dark"
  //     justify-content-between
  //     variant="dark"
  //     expand="lg"
  //   >
  //     {/* {isLoggedIn ? ( */}
  //     <Container className="d-flex align-items-center">
  //       <Link to="/" className="link nav-link">
  //         <h4 style={{ color: "white" }}>Sport Buddies</h4>
  //       </Link>
  //       <Nav className="ml-auto">
  //         <SearchBar />
  //       </Nav>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse>
  //         <Nav>
  //           <Nav.Item>
  //             <div style={{ display: "flex", flexDirection: "row" }}>
  //               <Link className="link nav-link" to="/me">
  //                 Hi, {user.firstName}
  //               </Link>
  //               <Logout />
  //             </div>
  //           </Nav.Item>

  //           <Link to="/venues" className="link nav-link">
  //             Venues
  //           </Link>
  //           <Link to="/players" className="link nav-link">
  //             Players
  //           </Link>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //     {/* ) : (
  //       <Container className="justify-content-around" fluid>
  //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //         <Nav>
  //           <Link to="/login" className="link nav-link">
  //             Login
  //           </Link>
  //           <Link to="/signup" className="link nav-link">
  //             Sign Up
  //           </Link>
  //           <Link to="/venues" className="link nav-link">
  //             Venues
  //           </Link>
  //           <Link to="/players" className="link nav-link">
  //             Players
  //           </Link>
  //         </Nav>
  //         <Link to="/" className="link">
  //           <h4 style={{ color: "white" }}>Sport Buddies</h4>
  //         </Link>
  //         <Nav.Item>
  //           <SearchBar />
  //         </Nav.Item>
  //       </Container>
  //     )} */}
  //   </Navbar>
  // );
  return (
    <Navbar bg="dark" expand="lg" variant="dark" style={{ width: "100vw" }}>
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
                  <NavDropdown.Item as={Link} to="/me">
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Logout />
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="login">
                    Login
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
              className="link nav-link d-flex"
            >
              <LocationChange location={location} setLocation={setLocation} />
            </Nav.Item>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
