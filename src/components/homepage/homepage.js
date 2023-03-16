import { auth } from "../../config/firebase";
import { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { VenuesBox } from "./venuesBox";
import { PlayersBox } from "./playersBox";
import { EquipmentsBox } from "./equipmentBox";

export const HomePage = () => {
  return (
    <Container>
      <Row
        style={{
          height: "250px",
        }}
      >
        <Card>
          <Card.Header>
            <h1>PLATFORM</h1>
          </Card.Header>
        </Card>
      </Row>
      <VenuesBox />
      <PlayersBox />
      <EquipmentsBox />
      <Row></Row>
    </Container>
  );
};
