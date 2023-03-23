import { auth } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Form } from "react-bootstrap";
import { VenuesBox } from "./venuesBox";
import { PlayersBox } from "./playersBox";
import { EquipmentsBox } from "./equipmentBox";
import axios from "axios";

export const HomePage = ({ location, setLocation }) => {
  const [zip, setZip] = useState("");
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
          sessionStorage.setItem("location", JSON.stringify(location));
          setZip("");
          setLocation(true);
        }
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
        <Row
          style={{
            height: "50vh",
          }}
        >
          <VenuesBox />
        </Row>
        <Row
          style={{
            height: "50vh",
          }}
        >
          <PlayersBox location={location} />
        </Row>
        {/* <EquipmentsBox /> */}
      </Container>
    </div>
  );
};
