import { auth } from "../../config/firebase";
import React , { useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { VenuesBox } from "./venuesBox";
import { PlayersBox } from "./playersBox";
import { EquipmentsBox } from "./equipmentBox";

export const HomePage = () => {

  return (
    <div className="home">
      <Container fluid >
        <Row
          style={{
            height: "20vh",
          }}
        >
        </Row>
        <VenuesBox />
        <PlayersBox />
        {/* <EquipmentsBox /> */}
      </Container>
    </div>
  );
};
