import { auth } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Form } from "react-bootstrap";
import { VenuesBox } from "./venuesBox";
import { PlayersBox } from "./playersBox";
import { EquipmentsBox } from "./equipmentBox";
import axios from "axios";
import { fetchOneUserAsync } from "../../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";

export const HomePage = ({ location, setLocation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [zip, setZip] = useState("");
  useEffect(() => {
    dispatch(fetchOneUserAsync());
  }, []);
  useEffect(() => {
    if (location) {
      if (user.fullName) {
        console.log("auto set location of " + user.fullName);
        const location = JSON.parse(sessionStorage.getItem("location"));
        axios
          .put(
            "http://localhost:5000/api/users/me",
            {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    }
  }, [location]);
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!sessionStorage.getItem("location")) {
        if (!isNaN(parseInt(zip)) && zip.length === 5) {
          const base = `${process.env.REACT_APP_GEOCODING}/${zip}.json`;
          const params = {
            access_token: process.env.REACT_APP_TOKEN,
            types: "postcode",
            limit: 1,
          };
          const { data } = await axios.get(base, { params });
          const location = {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
          };
          console.log(location);
          if (user.fullName && data.features[0]) {
            axios
              .put(
                "http://localhost:5000/api/users/me",
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                { withCredentials: true }
              )
              .then((res) => {
                console.log(res.data);
                console.log(
                  `Set location of ${user.fullName} based on provided zip code`
                );
              });
          }
        }
        sessionStorage.setItem("location", JSON.stringify(location));
        setZip("");
        setLocation(true);
      }
    }
  };

  return (
    <div>
      <Container fluid>
        <Row
          className="home"
          style={{
            height: "50vh",
          }}
        >
          {location ? (
            <h2
              className="text-center"
              style={{ color: "white", fontWeight: 600 }}
            >
              Welcome
            </h2>
          ) : (
            <Form style={{ width: "auto" }}>
              <Form.Group>
                <Form.Control
                  active="true"
                  type="text"
                  placeholder="Enter Zip Code"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleKeyPress(e);
                  }}
                />
              </Form.Group>
            </Form>
          )}
        </Row>
        <Row>
          <VenuesBox location={location} />
        </Row>
        <Row>
          <PlayersBox location={location} />
        </Row>
        {/* <EquipmentsBox /> */}
      </Container>
    </div>
  );
};
