import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { VenuesBox } from "./venuesBox";
import { PlayersBox } from "./playersBox";

import axios from "axios";
import { fetchOneUserAsync } from "../../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";

export const HomePage = ({ location, setLocation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchOneUserAsync());
    const data = JSON.parse(sessionStorage.getItem("location"));
    if (data) {
      setLocation(true);
    }
  }, [dispatch]);
  useEffect(() => {
    if (location) {
      if (user.fullName) {
        const locationParse = JSON.parse(sessionStorage.getItem("location"));
        axios
          .put(
            "http://localhost:5000/api/users/me",
            {
              latitude: locationParse.latitude,
              longitude: locationParse.longitude,
            },
            { withCredentials: true }
          )
          .then((res) => {
            return;
          });
      }
    }
  }, [location]);

  return (
    <div>
      <Container fluid>
        <Row
          className="home"
          style={{
            height: "50vh",
          }}>
          <h2 className="header text-center">Welcome</h2>
        </Row>
        <Row>
          <PlayersBox location={location} />
        </Row>
        <Row>
          <VenuesBox location={location} />
        </Row>
      </Container>
    </div>
  );
};
