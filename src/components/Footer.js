import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { FaSlack } from "react-icons/fa";
import { fetchOneVenueAsync } from "../reducers/venueAuthSlice";

function Footer() {
  const isVenueLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOneVenueAsync());
  }, [dispatch]);

  return (
    <Container expand="lg" className="bg-dark text-white" id="footer" fluid>
      <Row>
        <Col className="col-md-4 mx-auto">
          <div className="text-center">
            <h4>About Us</h4>
            <p>
              {" "}
              <Link to="/about" className="link">
                The Four Gentlemen
              </Link>
            </p>
          </div>
        </Col>
        <Col className="col-md-4 mx-auto">
          <div className="text-center">
            <h4>Become our business partner</h4>
            {isVenueLoggedIn ? (
              <Link to="/venue/dashboard" className="link">
                Visit your venue account
              </Link>
            ) : (
              <div>
                <Link to="/venue/signup" className="link">
                  Create venue account
                </Link>
                <br></br>
                <Link to="/venue/login" className="link">
                  Sign in to venue account
                </Link>
              </div>
            )}
          </div>
        </Col>
        <Col className="col-md-4 mx-auto">
          <div className="text-center">
            <h4>Connect With Us</h4>
            <Row>
              <Link
                to="https://github.com/Capstone-Pac-Man/Capstone.git"
                className="link">
                <AiFillGithub /> Github
              </Link>
            </Row>
            <Row>
              <Link
                to="https://fullstackacademy.slack.com/archives/C04TT9NMZ6G"
                className="link">
                <FaSlack /> Slack
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
      <br></br>
      <Row>
        <p className="text-center">
          © 2023 All Rights Reserved. By Karsten Fisk, Aliaksei Kalupaila, Jason
          Wang, Brian Wong.
        </p>
      </Row>
    </Container>
  );
}

export default Footer;
